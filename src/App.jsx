import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { SharedStateProvider } from "./context/SharedStateContext";
import LoginPage from "./pages/login/LoginPage";
import Chat from "./pages/chat/Chat";
import VerticalAppBar from "./components/navbar/VerticalAppBar";
import ChatList from "./pages/chat/ChatList";
import Question from "./pages/question/Question";
import QuestionAdd from "./pages/question/QuestionAdd";
import Mileage from "./pages/mypage/Mileage";
import RegisterPage from "./pages/login/RegisterPage";
import Adoption from "./pages/mypage/Adoption";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SharedStateProvider>
          <AppBarCondition />
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/chatlist" element={<ChatList />} />
              <Route path="/chat/:titleName" element={<Chat />} />
              <Route path="/question/newquestion" element={<QuestionAdd />} />
              <Route path="/question/:id" element={<Question />} />
              <Route path="/mypage/mileage" element={<Mileage />} />
              <Route path="/mypage/adoptedpoint" element={<Adoption />} />
            </Route>
          </Routes>
        </SharedStateProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// VerticalAppBar를 조건부로 렌더링하는 별도의 컴포넌트
function AppBarCondition() {
  const location = useLocation(); 
  const hideAppBar = ["/", "/register"].includes(location.pathname);
  return !hideAppBar && <VerticalAppBar />;
}

export default App;
