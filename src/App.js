import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import ChatList from "./components/chatbox/ChatList";
import VerticalAppBar from "./components/navbar/VerticalAppBar";

function App() {
  return (
    <BrowserRouter>
    <VerticalAppBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/chat/:roomId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
