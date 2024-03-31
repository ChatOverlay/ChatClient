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
  const [password, setPassword] = useState(""); // 사용자 비밀번호를 저장하는 상태
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 오류 상태

  // 버튼 클릭 핸들러에서는 isVerified 상태를 true로 설정하여 Vertify 컴포넌트를 렌더링하도록 합니다.
// 이메일 인증 코드 전송 요청
const handleSendVerificationCode = async () => {
  if (!email.endsWith("@gachon.ac.kr")) {
    setEmailError(true);
    return;
  }
  setEmailError(false);

  try {
    const response = await fetch('http://localhost:4000/api/sendVerificationCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    alert(data.message); // 성공 메시지 표시
    // 추가 처리 (예: 사용자에게 인증 코드 입력 요청)
  } catch (error) {
    console.error('Error sending verification code:', error);
    alert('Failed to send verification code.');
  }
};


  //인증 확인 절차
  const handleVertify = (e) => {
    const code = e.target.value;
    setInputCode(code);
    if (code === correctCode) {
      setIsVerified(1);
    }
  };

  // 비밀번호 설정 후 종료
  const handlePasswordFinishBtn = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(true); // 비밀번호가 정규식 조건을 만족하지 않으면 오류 상태를 true로 설정
      return;
    }

    setPasswordError(false); // 비밀번호가 조건을 만족하면 오류 상태를 false로 설정
    setIsVerified(2); // 비밀번호 유효성 검사 후 다음 단계로 진행
  };

// 회원가입 정보를 서버로 전송하는 함수 (fetch 사용)
const handleSubmit = async () => {
  // 입력 검증 로직 추가 가능
  if (isVerified !== 2) {
    alert('모든 단계를 완료해주세요.');
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/api/register', {
      method: 'POST', // 요청 메소드 지정
      headers: {
        'Content-Type': 'application/json', // 요청 본문의 타입 지정
      },
      body: JSON.stringify({
        email,
        nickName,
        password,
      }), // 요청 본문에 전송할 데이터
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // 응답 데이터를 JSON 형태로 파싱
    console.log(data); // 성공 시 응답 데이터 로그
    alert('회원가입이 완료되었습니다!');
    setIsVerified(3);
    // 회원가입 성공 후 로직 추가 가능 (예: 로그인 페이지로 리다이렉트)
  } catch (error) {
    console.error('회원가입 실패:', error);
    alert('회원가입에 실패했습니다.');
  }
};

  return (
    <div>
      {isVerified === 0 ? (
        <EmailContainer>
          <WelcomeText>처음이신가요? 이메일을 입력해주세요!</WelcomeText>
          <InputContainer>
            <TextField
              error={emailError} // TextField에 error prop 추가
              helperText={emailError && "이메일 형식이 올바르지 않습니다."} // 조건부 헬퍼 텍스트
              id="outlined-basic"
              label="학교이메일"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendVerificationCode();
                }
              }}
              sx={textFieldSx}
            />
            <Button
              variant="contained"
              onClick={handleSendVerificationCode}
              sx={buttonSx}
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
                  ".MuiInputBase-input": { color: "white" }, // 여기에서 입력 텍스트 색상을 지정합니다.
                }}
              />
            </InputContainer>
          )}
        </EmailContainer>
      ) : isVerified === 1 ? (
        <PasswordContainer>
          <WelcomeText>
            <div>비밀번호를 입력해주세요!</div>
            <div style={{ opacity: "0.8" }}></div>
          </WelcomeText>
          <InputContainer>
            <TextField
              error={passwordError}
              helperText={passwordError && "비밀번호가 조건을 만족해야 합니다."}
              id="outlined-basic"
              label="비밀번호"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handlePasswordFinishBtn();
                }
              }}
              sx={textFieldSx}
            />
            <Button
              variant="contained"
              onClick={handlePasswordFinishBtn}
              sx={buttonSx}
              startIcon={<SendIcon />}
            />
          </InputContainer>
        </PasswordContainer>
      ) : isVerified === 2 ? (
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
                  handleSubmit();
                }
              }}
              sx={textFieldSx}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={buttonSx}
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

// 비밀번호 컨테이너
const PasswordContainer = styled.div`
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