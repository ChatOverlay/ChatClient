import React from 'react';
import { IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatList from '../chatbox/ChatListBox';

export default function VerticalAppBar() {
  const navigate = useNavigate();

  return (
    <>
    <AppBar>
        <IconButton onClick={() => navigate("/chatlist")}>
          <ChatIcon sx={{color : " #f2d492"}} />
        </IconButton>
    </AppBar>
    <ChatList/>
    </>
  );
}

const AppBar = styled.div`
    display : flex;
    position : fixed;
    flex-direction : row;
    background-color :  #202c39;
    align-items : flex-start;
    height : 100vh;
    width : 5vw;
`