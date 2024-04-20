import React, { useEffect, useRef, useState } from "react";
import "./ListBox.css";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LikedPage from "./mypage/LikedPage";

import io from "socket.io-client";
import MyNavbarList from "./mypage/MyNavbarList";
import { useTheme } from "../../context/ThemeContext";
import { useSharedState } from "../../context/SharedStateContext";
const socket = io(`${process.env.REACT_APP_API_URL}`); // 여러분의 서버 주소로 변경하세요

export default function MyPage() {
  const [likedPages, setLikedPages] = useState(false);
  const [changeNameAble, setChangeNameAble] = useState(false);
  const [nickName, setNickName] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [mileage, setMileage] = useState(0); // 마일리지 상태 추가
  const [totalMileage, setTotalMileage] = useState(0); // 총 마일리지 상태 추가
  const { theme } = useTheme(); // 테마 컨텍스트에서 현재 테마 가져오기
  const { newAdded } = useSharedState();
  
  const fileInputRef = useRef(null);
  
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
        `${process.env.REACT_APP_API_URL}/api/user/upload-profile-picture`,
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
    if (newNickName.length > 8) {
      alert("닉네임은 최대 8글자까지 가능합니다.");
      return; // 여기서 함수 실행을 중단합니다.
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/update-nickname`,
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
        const data = await response.json();
        setNickName(data.nickName);
        setChangeNameAble(false);
      } else {
        console.error("Failed to update nickname.");
      }
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
      if (token) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/user/info`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // 헤더에 토큰 포함
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setNickName(data.nickName); // 응답으로 받은 닉네임으로 상태 업데이트
            setProfilePictureUrl(data.profilePictureUrl); // 여기서 profilePictureUrl 상태 업데이트
          } else {
            console.error("Failed to fetch user info");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, [profilePictureUrl]);
  
  useEffect(() => {
    // 마일리지 정보 갱신 리스너
    socket.on("mileageUpdated", (data) => {
      setMileage(data.newMileage);
      setTotalMileage(data.totalMileage);
    });

    return () => {
      socket.off("mileageUpdated");
    };
  }, [newAdded]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // 서버로부터 초기 마일리지 정보를 요청합니다.
    socket.emit("getInitialMileage", { token });

    // 필요한 경우 여기서 초기 마일리지 정보를 받는 리스너도 설정할 수 있습니다.
  }, [newAdded]);
  return (
    <>
      {likedPages ? (
        <LikedPage setLikedPages={setLikedPages} />
      ) : (
        <div className="navbar__list">
          <MyContainer theme={theme}>
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

            <NickNameContainer>
              {changeNameAble ? (
                <InputContainer>
                  <NameInputContainer
                    theme={theme}
                    onChange={(e) => setNickName(e.target.value)}
                    value={nickName}
                    placeholder="닉네임을 입력하세요.."
                  />
                  <SaveButton theme={theme} onClick={() => updateNickName(nickName)}>
                    저장
                  </SaveButton>
                </InputContainer>
              ) : (
                <InputContainer>
                  <div>{nickName}</div>
                  <SaveButton theme={theme} onClick={() =>setChangeNameAble(true)}>
                    수정
                  </SaveButton>
                </InputContainer>
              )}
            </NickNameContainer>
          </MyContainer>
          <MyNavbarList
            mileage={mileage}
            totalMileage={totalMileage}
            setLikedPages={setLikedPages}
          />
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
  border-bottom: 1px solid ${({ theme }) => theme.foreground};
  color: ${({ theme }) => theme.foreground};
`;

//아이콘 컨테이너
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    opacity: 0.6;
  }
`;

const SaveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.foreground};
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.foreground};
  transition: all 0.3s;
  &:hover {
    transform: scale(1.05);
    opacity: 0.8;
  }
`;

//이름 컨테이너
const NickNameContainer = styled.div`
  display: flex;
  font-size: 1.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const NameInputContainer = styled.input`
  text-align: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  max-width : 10rem;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 5px;
  border-radius: 0.3rem;
  border: 1px solid ${({ theme }) => theme.foreground};
  &:focus {
    outline: none;
  }
`;
