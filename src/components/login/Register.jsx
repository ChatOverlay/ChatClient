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
  const [password, setPassword] = useState(""); // 사용자 비밀번호를 저장하는 상태
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 오류 상태

  // 버튼 클릭 핸들러에서는 isVerified 상태를 true로 설정하여 Vertify 컴포넌트를 렌더링하도록 합니다.
// 이메일 인증 코드 전송 요청
const handleSendVerificationCode = async () => {
  if (!email.endsWith("@gachon.ac.kr")) {
    setEmailError(true);
    alert("학교 이메일 형식이 올바르지 않습니다.");
    return;
  }

  // 중복 이메일 검사 요청
  try {
    const checkResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/checkEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const checkData = await checkResponse.json();
    if (checkData.exists) {
      alert("이미 사용 중인 이메일 주소입니다. 다른 이메일 주소를 사용해 주세요.");
      setEmailError(true);
      return;
    }
  } catch (checkError) {
    console.error('이메일 중복 검사 실패:', checkError);
    alert('이메일 중복 검사 중 오류가 발생했습니다.');
    return;
  }

  setIsEmailValid(true);
  setEmailError(false);
  // 인증 코드 전송 요청
  try {
    const response = await fetch('${process.env.REACT_APP_API_URL}/api/sendVerificationCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // 추가 처리 (예: 사용자에게 인증 코드 입력 요청)
  } catch (error) {
    console.error('인증 코드 전송 실패:', error);
    alert('인증 코드 전송 중 오류가 발생했습니다.');
  }
};


// 인증 코드 확인 및 검증
const handleVerify = async (e) => {
  const code = e.target.value;
  setInputCode(code);

  // 사용자가 입력한 인증 코드의 길이가 올바른 경우에만 검증 요청 실행
  if (code.length === 6) {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/api/verifyCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      if (data.verified) {
        setIsVerified(1); // 서버로부터 인증 확인 시 다음 단계로 넘어갑니다.
      } else {
        alert('인증 코드가 일치하지 않습니다.'); // 인증 실패 시 메시지를 표시합니다.
        setInputCode(""); // 인증 코드 입력 필드를 초기화합니다.
      }
    } catch (error) {
      console.error('인증 코드 검증 실패:', error);
      alert('인증 코드를 검증하는 중 오류가 발생했습니다.');
    }
  }
};


  // 비밀번호 설정 후 종료
  const handlePasswordFinishBtn = () => {
    const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

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
    const response = await fetch('${process.env.REACT_APP_API_URL}/api/register', {
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
                onChange={handleVerify}
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