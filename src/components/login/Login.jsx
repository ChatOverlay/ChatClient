import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import Logo from "../../assets/backgroundImg/clasome.png";

import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../modals/LoadingModal";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 사용자 이메일을 저장하는 상태
  const [password, setPassword] = useState(""); // 사용자 비밀번호를 저장하는 상태
  const [autoLogin, setAutoLogin] = useState(false); // 자동 로그인 상태
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  // 로그인 함수
  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setLoading(true); // Show loading spinner
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, autoLogin }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        navigate("../chatlist");
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다.");
    }
    setLoading(false); // Hide loading spinner
  };

  return (
    <LoginContainer>
      {loading && <LoadingModal />}
      <Container>
        <StyledImgContainer>
          <StyledImg src={Logo} alt="CLASOME Logo" />
        </StyledImgContainer>
        <WelcomeText>로그인</WelcomeText>
        <InputContainer>
          <TextField
            id="outlined-basic"
            label="학교 아이디"
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
              width: "100%",
              color: `${({ theme }) => theme.primaryColor}`,
              ".MuiInputLabel-root": {
                color: `${({ theme }) => theme.background}`,
                fontFamily: "Noto Sans KR",
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
        <FormContainer>
          <FormControlLabel
            control={
              <Checkbox
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
                name="autoLogin"
              />
            }
            label="자동 로그인"
            sx={{
              ".MuiTypography-root": {
                fontFamily: "Noto Sans KR",
                marginTop: "-0.1rem",
              },
              marginRight: "0",
            }}
          />
        </FormContainer>
        <ButtonContainer>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={buttonSx}
            startIcon={<SendIcon />}
          />
        </ButtonContainer>
      </Container>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background-color: #fff;
  color: #0064d8;
  border-radius: 1rem;
  width: 50rem;
  height: 30rem;
  padding: 3rem;
  opacity: 0.9;
  @media (max-width: 768px) {
    width: 15rem;
    height: 20rem;
  }
`;
const StyledImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledImg = styled.img`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    width: 10rem;
  }
`;
const WelcomeText = styled.div`
  display: flex;
  justify-content: center;
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
const Container = styled.div`
  will-change: transform, opacity;
  animation: ${slideInRight} 0.5s forwards;
  display: flex;
  flex-direction: column;

  justify-content: flex-end; /* FormContainer를 우측으로 정렬 */
`;

//해당 입력칸
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const textFieldSx = (theme) => ({
  marginTop: "0.1rem",
  width: "100%",
  color: theme.primaryColor,
  ".MuiInputLabel-root": {
    color: theme.background,
    fontFamily: "Noto Sans KR",
  },
  ".MuiOutlinedInput-root": {
    "& fieldset": { borderColor: theme.background },
    "&:hover fieldset": { borderColor: theme.background },
    "&.Mui-focused fieldset": { borderColor: theme.background },
  },
  ".MuiInputBase-input": { color: theme.primaryColor },
});

const FormContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const buttonSx = {
  display: "flex",
  justifyContent: "center",
  marginTop: "0.1rem",
  paddingRight: "0.1rem",
  height: "4rem",
  backgroundColor: "var(--foreground-color)",
  color: "var(--background-color)",
  borderRadius: "10rem",
  transition: "all 0.3s ease",
  "&:hover": {
    opacity: "0.8",
    transform: "scale(1.05)",
  },
};

// const RegisterLink = styled.div`
//  color: var(--background-color);
//   cursor: pointer;
//   text-decoration: underline;
//   transition: all 0.5s;
//   &:hover {
//     color: var(--primary-color);
//     font-weight: bold;
//   }
// `;
// <RegisterLink onClick={() => navigate("/register")}>
// 아이디가 없으시다구요?
// </RegisterLink>
