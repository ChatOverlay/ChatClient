import React, { createContext, useContext, useState } from 'react';

// 테마 스타일 정의
const themes = {
  light: {
    foreground: "#F0EDCC",
    background: "#02343F",
    primaryColor: "#FFFFFF",
  },
  dark: {
    foreground: "#f2d492",
    background: "#202c39"
  },
  gachon: {
    foreground: "#004e96",
    background: "white",
    primaryColor : "black",
  }
};

// Context 객체 생성
const ThemeContext = createContext();

// Provider 컴포넌트
export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('light');  // 초기 테마 설정
  const theme = themes[themeName];

  // Provider에 제공할 값
  const value = {
    theme,
    setThemeName
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 테마를 사용하기 위한 커스텀 훅
export const useTheme = () => useContext(ThemeContext);
