import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Chat from "./pages/chat/Chat";
import VerticalAppBar from "./components/navbar/VerticalAppBar";
import ChatList from "./pages/chat/ChatList";
import Question from "./pages/question/Question";
import QuestionAdd from "./pages/question/QuestionAdd";
import Mileage from "./pages/mileage/Mileage";
import RegisterPage from "./pages/login/RegisterPage";

function App() {
  return (
    <BrowserRouter>
    <VerticalAppBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chat/:titleName" element={<Chat />} />
        <Route path="/question/newquestion" element={<QuestionAdd />} />
        <Route path="/question/:id" element={<Question />} />
        <Route path="/mypage/mileage" element={<Mileage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
