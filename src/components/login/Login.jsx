import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 사용자 이메일을 저장하는 상태
  const [password, setPassword] = useState(""); // 사용자 비밀번호를 저장하는 상태
  const [autoLogin, setAutoLogin] = useState(false);  // 자동 로그인 상태

  const {theme} = useTheme();
  console.log(theme);
  // 로그인 함수
  const handleLogin = async () => {
    if (!email || !password) {
      // 필수 입력 항목 확인
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, autoLogin}),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        navigate("../chatlist");
      } else {
        // 서버에서 오류 메시지를 보낼 경우
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    }
  };
  return (
    <LoginContainer theme={theme}>
      <EmailContainer>
        <WelcomeText>로그인</WelcomeText>
        <InputContainer>
          <TextField
            id="outlined-basic"
            label="학교이메일"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            sx={textFieldSx}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={buttonSx}
            startIcon={<SendIcon />}
          />
        </InputContainer>
        <InputContainer>
          <TextField
            id="outlined-basic"
            label="비밀번호"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            sx={{
              color: `${({ theme }) => theme.primaryColor}`,
              ".MuiInputLabel-root": {
                color: `${({ theme }) => theme.background}`,
              }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: `${({ theme }) => theme.background}`,
                }, // border color
                "&:hover fieldset": {
                  borderColor: `${({ theme }) => theme.background}`,
                }, // hover border color
                "&.Mui-focused fieldset": {
                  borderColor: `${({ theme }) => theme.background}`,
                }, // focus border color
              },
              ".MuiInputBase-input": {
                color: `${({ theme }) => theme.primaryColor}`,
              }, // 여기에서 입력 텍스트 색상을 지정합니다.
            }}
          />
        </InputContainer>
        <FormControlLabel
            control={
              <Checkbox
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
                name="autoLogin"
              />
            }
            label="자동 로그인"
          />
      </EmailContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index : 101;
  background-color: white;
  border-radius : 1rem;
  padding : 3rem;
  opacity : 0.8;
`;

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

//해당 입력칸
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const textFieldSx = (theme) => ({
  marginTop: "0.1rem",
  color: theme.primaryColor,
  ".MuiInputLabel-root": { color: theme.background },
  ".MuiOutlinedInput-root": {
    "& fieldset": { borderColor: theme.background },
    "&:hover fieldset": { borderColor: theme.background },
    "&.Mui-focused fieldset": { borderColor: theme.background },
  },
  ".MuiInputBase-input": { color: theme.primaryColor },
});

const buttonSx = {
  marginTop: "0.1rem",
  maxHeight: "3.5rem",
  marginLeft: "1rem",
  backgroundColor: `${({ theme }) => theme.background}`,
  color: `${({ theme }) => theme.foreground}`,
  borderRadius: "1rem",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: `${({ theme }) => theme.background}`,
    color: `${({ theme }) => theme.foreground}`,
    transform: "scale(1.05)",
  },
};
