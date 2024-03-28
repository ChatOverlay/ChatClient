import React, { useState } from "react";
import "./ListBox.css";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LikedPage from "./mypage/LikedPage";
import CreateIcon from "@mui/icons-material/Create";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";

export default function MyPage() {
  const [likedPages, setLikedPages] = useState(false);
  const [changeNameAble, setChangeNameAble] = useState(false);
  const [nickName, setNickName] = useState("닉네임");
  return (
    <>
      {likedPages ? (
        <LikedPage setLikedPages={setLikedPages} />
      ) : (
        <div className="navbar__list">
          <MyContainer>
            <IconContainer>
              <AccountCircleIcon sx={{ fontSize: "5rem" }} />
            </IconContainer>
            {changeNameAble ? (
              <NickNameContainer>
                <NameInputContainer
                  onChange={(e) => setNickName(e.target.value)}
                  value={nickName}
                />
                <IconContainer onClick={() => setChangeNameAble(false)}>
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
            <OtherContainer>마일리지 </OtherContainer>
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
