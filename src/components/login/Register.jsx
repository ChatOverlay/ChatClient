import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Welcome from "./Welcome";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";

export default function Register() {
  // 상태 변수로 컴포넌트의 렌더링 상태를 관리합니다.
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isVerified, setIsVerified] = useState(0);
  const [email, setEmail] = useState(""); // 사용자 이메일을 저장하는 상태
  const [nickName, setNickName] = useState(""); // 사용자 이름을 저장하는 상태
  const [inputCode, setInputCode] = useState(""); // 사용자 입력 인증 코드를 저장하는 상태
  const [emailError, setEmailError] = useState(false); // 이메일 오류 상태 추가
  const correctCode = "123456"; // 올바른 인증 코드

  // 버튼 클릭 핸들러에서는 isVerified 상태를 true로 설정하여 Vertify 컴포넌트를 렌더링하도록 합니다.
  const handleSignUpBtn = () => {
    if (!email.endsWith("@gachon.ac.kr")) {
      setEmailError(true); // 이메일이 @gachon.ac.kr로 끝나지 않으면 오류 상태를 true로 설정
      return;
    }
    setEmailError(false); // 이메일이 유효하면 오류 상태를 false로 설정
    setIsEmailValid(true);
  };

  const handleVertify = (e) => {
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
            <TextField
              error={emailError} // TextField에 error prop 추가
              helperText={
                emailError
                  && "이메일 형식이 올바르지 않습니다."
              } // 조건부 헬퍼 텍스트
              id="outlined-basic"
              label="학교이메일"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSignUpBtn();
                }
              }}
              sx={{
                color: "white",
                ".MuiInputLabel-root": { color: "#f2d492" },
                ".MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#f2d492" },
                  "&:hover fieldset": { borderColor: "#f2d492" },
                  "&.Mui-focused fieldset": { borderColor: "#f2d492" },
                },
                ".MuiInputBase-input": { color: "white" },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSignUpBtn}
              sx={{
                maxHeight: "3.5rem",
                marginLeft: "1rem",
                backgroundColor: "#f2d492",
                color: "#202c39",
                borderRadius: "1rem",
                "&:hover": {
                  backgroundColor: "#f2d492",
                  color: "#202c39",
                  transform: "scale(1.05)",
                },
              }}
              startIcon={<SendIcon />}
            />
          </InputContainer>
          {isEmailValid && (
            <InputContainer>
              <TextField
                id="outlined-basic"
                label="인증 코드"
                margin="normal"
                value={inputCode}
                onChange={handleVertify}
                sx={{
                  color: "white",
                  ".MuiInputLabel-root": { color: "#f2d492" }, // label color
                  ".MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#f2d492" }, // border color
                    "&:hover fieldset": { borderColor: "#f2d492" }, // hover border color
                    "&.Mui-focused fieldset": { borderColor: "#f2d492" }, // focus border color
                  },
                  ".MuiInputBase-input": { color: "#f2d492" }, // 여기에서 입력 텍스트 색상을 지정합니다.
                }}
              />
            </InputContainer>
          )}
        </EmailContainer>
      ) : isVerified === 1 ? (
        <NickNameContainer>
          <WelcomeText>닉네임을 입력해주세요! (ex. 총장님손주)</WelcomeText>
          <InputContainer>
            <TextField
              id="outlined-basic"
              label="닉네임"
              variant="outlined"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleFinishBtn();
                }
              }}
              sx={{
                color: "white",
                ".MuiInputLabel-root": { color: "#f2d492" }, // label color
                ".MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#f2d492" }, // border color
                  "&:hover fieldset": { borderColor: "#f2d492" }, // hover border color
                  "&.Mui-focused fieldset": { borderColor: "#f2d492" }, // focus border color
                },
                ".MuiInputBase-input": { color: "#f2d492" }, // 여기에서 입력 텍스트 색상을 지정합니다.
              }}
            />
            <Button
              variant="contained"
              onClick={handleFinishBtn}
              sx={{
                marginLeft: "1rem",
                backgroundColor: "#f2d492",
                color: "#202c39",
                borderRadius: "1rem",
                "&:hover": {
                  backgroundColor: "#f2d492",
                  color: "#202c39",
                  transform: "scale(1.1)",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              startIcon={<SendIcon />}
            />
          </InputContainer>
        </NickNameContainer>
      ) : (
        <Welcome nickName={nickName} />
      )}
    </div>
  );
}

const WelcomeText = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
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

//해당 입력칸
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
