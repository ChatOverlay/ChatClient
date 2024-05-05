import styled, { keyframes } from "styled-components";

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUpFromBottom = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDownToBottom = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  margin-left: ${({ show }) => (show ? "5rem" : "25.05rem")};
  background-color: var(--background-color); // Theme applied
  transition: all 0.3s ease-in; // Apply transition only to opacity
  z-index: 100;
  animation: ${slideInFromLeft} 0.2s ease-out forwards;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; // iOS에서 부드러운 스크롤 제공

  &::-webkit-scrollbar {
    width: 10px;
    background-color: var(--background-color);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--foreground-color);
    border-radius: 5px;
    border: 2px solid var(--background-color);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #b3b3b3;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100vw;
    
    height: 100vh; // Ensure consistent height management
    animation: ${({ show }) => (!show ? slideUpFromBottom : slideDownToBottom)} 0.4s ease-in-out forwards; // Use 'forwards' to persist the end state
  }
`;
