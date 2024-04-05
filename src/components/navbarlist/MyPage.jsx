import React, { useEffect, useRef, useState } from "react";
import "./ListBox.css";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LikedPage from "./mypage/LikedPage";
import CreateIcon from "@mui/icons-material/Create";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

import io from "socket.io-client";
const socket = io("http://localhost:4000"); // 여러분의 서버 주소로 변경하세요

export default function MyPage() {
  const [likedPages, setLikedPages] = useState(false);
  const [changeNameAble, setChangeNameAble] = useState(false);
  const [nickName, setNickName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [mileage, setMileage] = useState(0); // 마일리지 상태 추가
  const [totalMileage, setTotalMileage] = useState(0); // 총 마일리지 상태 추가

  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  //이미지 관련
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }
    handleFileUpload(file); // 파일 업로드 처리 함수 호출
  };
  const handleFileUpload = async (file) => {
    // 파일 객체를 매개변수로 받도록 수정
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await fetch(
        "http://localhost:4000/api/user/upload-profile-picture",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Content-Type을 설정하지 않습니다.
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Profile picture uploaded successfully.");
        setProfilePictureUrl(data.profilePictureUrl); // 서버 응답에서 올바른 필드명 사용
      } else {
        console.error("Failed to upload profile picture.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };
  const updateNickName = async (newNickName) => {
    const token = localStorage.getItem("token");
    if (token && newNickName !== nickName) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/user/update-nickname",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nickName: newNickName }),
          }
        );
        if (response.ok) {
          setChangeNameAble(false); // Exit edit mode
          setNickName(newNickName); // Update local state with new nickname
          console.log("Nickname updated successfully.");
        } else {
          console.error("Failed to update nickname.");
        }
      } catch (error) {
        console.error("Error updating nickname:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/user/info", {
            headers: {
              Authorization: `Bearer ${token}`, // 헤더에 토큰 포함
            },
          });
          if (response.ok) {
            const data = await response.json();
            setNickName(data.nickName); // 응답으로 받은 닉네임으로 상태 업데이트
            setProfilePictureUrl(profilePictureUrl);
          } else {
            console.error("Failed to fetch user info");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);
  useEffect(() => {
    // 마일리지 정보 갱신 리스너
    socket.on("mileageUpdated", (data) => {
      setMileage(data.newMileage);
      setTotalMileage(data.totalMileage);
    });

    return () => {
      socket.off("mileageUpdated");
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // 서버로부터 초기 마일리지 정보를 요청합니다.
    socket.emit("getInitialMileage", { token });

    // 필요한 경우 여기서 초기 마일리지 정보를 받는 리스너도 설정할 수 있습니다.
  }, []);
  return (
    <>
      {likedPages ? (
        <LikedPage setLikedPages={setLikedPages} />
      ) : (
        <div className="navbar__list">
          <MyContainer>
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <IconContainer onClick={triggerFileInput}>
              {profilePictureUrl ? (
                <img
                  src={profilePictureUrl}
                  alt="Profile"
                  style={{ width: "5rem", height: "5rem", borderRadius: "50%" }}
                />
              ) : (
                <AccountCircleIcon sx={{ fontSize: "5rem" }} />
              )}
            </IconContainer>

            {changeNameAble ? (
              <NickNameContainer>
                <NameInputContainer
                  onChange={(e) => setNickName(e.target.value)}
                  value={nickName}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // 추가
                      updateNickName(nickName);
                    }
                  }}
                />
                <IconContainer onClick={() => updateNickName(nickName)}>
                  <CheckIcon sx={{ fontSize: "1rem" }} />
                </IconContainer>
              </NickNameContainer>
            ) : (
              <NickNameContainer>
                {nickName}
                <IconContainer onClick={() => setChangeNameAble(true)}>
                  <CreateIcon sx={{ fontSize: "1rem" }} />
                </IconContainer>
              </NickNameContainer>
            )}
          </MyContainer>
          <ListContainer>
            <div
              className="navbar__list__item"
              onClick={() => setLikedPages(true)}
            >
              좋아요 누른 게시글
              <IconContainer>
                <ArrowForwardIcon />
              </IconContainer>
            </div>
            <div
              className="navbar__list__item"
              onClick={() =>
                navigate("/mypage/mileage", {
                  state: { mileage, totalMileage },
                })
              }
            >
              하루 마일리지: {mileage} / 100
              <IconContainer>
                <ArrowForwardIcon />
              </IconContainer>
            </div>
            <OtherContainer>하루 적정량 </OtherContainer>
          </ListContainer>
        </div>
      )}
    </>
  );
}

//해당 내 프로필 컨테이너
const MyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5vh 0;
  border-bottom: 1px solid #f2d492;
`;

//아이콘 컨테이너
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  color: #f2d492;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
`;

//이름 컨테이너
const NickNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1rem;
`;

const NameInputContainer = styled.input`
  width: 100%;
  border: none;
  background-color: #202c39;
  color: #f2d492;
  border-bottom: 1px solid #f2d492;
  &:focus {
    outline: none;
  }
`;

//해당 리스트 컨테이너
const ListContainer = styled.div`
  max-width: 100%;
`;

//다른거 컨테이너
const OtherContainer = styled.div`
  padding: 10px;
  height: 3rem;
  transition: all 0.3s;
  border-bottom: 1px solid #f2d492;

  animation: slideInFromLeft 0.3s ease-out forwards; /* 애니메이션 적용 */
`;
