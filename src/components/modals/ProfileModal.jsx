// ProfileModal.js
import React from 'react';
import styled from 'styled-components';
import { ModalBackdrop } from './ImageModal';

const ModalContainer = styled.div`
  background: white;
  width : 50%;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #ccc;
  }
`;

function ProfileModal({ onClose, onResetDefault, onChangePicture }) {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Button onClick={onResetDefault}>기본 프로필로 변경</Button>
        <Button onClick={onChangePicture}>다른 사진으로 변경</Button>
      </ModalContainer>
    </ModalBackdrop>
  );
}

export default ProfileModal;
