import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Welcome from "./Welcome";

export default function Register() {
  // 상태 변수로 컴포넌트의 렌더링 상태를 관리합니다.
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isVerified, setIsVerified] = useState(0);
  const [email, setEmail] = useState(""); // 사용자 이메일을 저장하는 상태
  const [nickName, setNickName] = useState(""); // 사용자 이름을 저장하는 상태
  const [inputCode, setInputCode] = useState(""); // 사용자 입력 인증 코드를 저장하는 상태
  const correctCode = "123456"; // 올바른 인증 코드

  // 버튼 클릭 핸들러에서는 isVerified 상태를 true로 설정하여 Vertify 컴포넌트를 렌더링하도록 합니다.
  const handleNextBtn = () => {
    setIsEmailValid(true);
  };
  const handleCodeChange = (e) => {
    const code = e.target.value;
    setInputCode(code);
    if (code === correctCode) {
      setIsVerified(1);
    }
  };
  const handleFinishBtn = () => {
    setIsVerified(2);
  };
  return (
    <div>
      {isVerified === 0 ? (
        <EmailContainer>
          <WelcomeText>처음이신가요? 이메일을 입력해주세요!</WelcomeText>
          <InputContainer>
            <StyledInput
              placeholder="학교 이메일"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleNextBtn();
                }
              }}
            />
            <SendButton onClick={handleNextBtn}></SendButton>
          </InputContainer>
          {isEmailValid && (
            <InputContainer>
              <StyledInput
                placeholder="인증 코드"
                value={inputCode}
                onChange={handleCodeChange}
              />
            </InputContainer>
          )}
        </EmailContainer>
      ) : isVerified === 1 ? (
        <NickNameContainer>
          <WelcomeText>닉네임을 입력해주세요! (ex. 총장님손주)</WelcomeText>
          <InputContainer>
            <StyledInput
              placeholder="닉네임"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleFinishBtn();
                }
              }}
            ></StyledInput>

            <SendButton onClick={handleFinishBtn}></SendButton>
          </InputContainer>
        </NickNameContainer>
      ) : (<Welcome nickName={nickName}/>)}
    </div>
  );
}

const WelcomeText = styled.div`
  font-weight: bold;
`;

//에니메이션 인
const fadeIn = keyframes`
  from {
    background-color: #202c39;
    color : white;
  }
  to {
    background-color: white;
    color : #202c39;
  }
`;
//에니메이션 아웃
const fadeOut = keyframes`
  from {
    background-color: white;
    color : #202c39;
  }
  to {
    background-color: #202c39;
    color : white;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0%);
    opacity: 1;
  }
`;

//이메일 컨테이너
const EmailContainer = styled.div`
  will-change: transform, opacity;
  animation: ${slideInRight} 0.5s forwards;
`;
//닉네임 컨테이너
const NickNameContainer = styled.div`
  will-change: transform, opacity;
  animation: ${slideInRight} 0.5s forwards;
`;

//이메일 입력칸
const StyledInput = styled.input`
  width: 20rem;
  height: 3rem;
  border-radius: 1rem;
  border: 1px solid white;
  margin-top: 20px;
  background-color: #202c39;
  padding-left: 20px;
  font-size: 1rem;
  color: white; // 글자색을 지정합니다.
  transition: background-color 0.5s ease, color 0.5s ease; // 배경색과 글자색 변화에 대한 전환 효과를 추가합니다.

  &:focus {
    animation: ${fadeIn} 0.5s forwards; // 포커스시 fadeIn 애니메이션을 적용합니다.
    color: black; // 포커스 시 글자색을 변경합니다.
    outline: none;
  }

  &:not(:focus) {
    animation: ${fadeOut} 0.5s forwards; // 포커스가 해제되면 fadeOut 애니메이션을 적용합니다.
  }

  &::placeholder {
    color: white;
    opacity: 0.8;
  }
`;

//해당 입력칸
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SendButton = styled.div`
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
  background-color: #f2d492;
  color: #202c39;
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;

  align-items: center;
  font-size: 1.5rem;
  margin-top: 20px;
  transition: 0.2s;
  &:hover {
    background-color: #f2d492;
    color: #202c39;
    transform: scale(1.1);
  }
`;
