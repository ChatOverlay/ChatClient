import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 사용자 이메일을 저장하는 상태
  const [password, setPassword] = useState(""); // 사용자 비밀번호를 저장하는 상태
  // 로그인 함수
  const handleLogin = async () => {
    if (!email || !password) {
      // 필수 입력 항목 확인
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        navigate("../chatlist")
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
    <div>
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
              color: "white",
              ".MuiInputLabel-root": { color: "#f2d492" }, // label color
              ".MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#f2d492" }, // border color
                "&:hover fieldset": { borderColor: "#f2d492" }, // hover border color
                "&.Mui-focused fieldset": { borderColor: "#f2d492" }, // focus border color
              },
              ".MuiInputBase-input": { color: "white" }, // 여기에서 입력 텍스트 색상을 지정합니다.
            }}
          />
        </InputContainer>
      </EmailContainer>
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


//해당 입력칸
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const textFieldSx = {
  marginTop: "0.1rem",
  color: "white",
  ".MuiInputLabel-root": { color: "#f2d492" },
  ".MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#f2d492" },
    "&:hover fieldset": { borderColor: "#f2d492" },
    "&.Mui-focused fieldset": { borderColor: "#f2d492" },
  },
  ".MuiInputBase-input": { color: "white" },
};

const buttonSx = {
  marginTop: "0.1rem",
  maxHeight: "3.5rem",
  marginLeft: "1rem",
  backgroundColor: "#f2d492",
  color: "#202c39",
  borderRadius: "1rem",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#f2d492",
    color: "#202c39",
    transform: "scale(1.05)",
  },
};
