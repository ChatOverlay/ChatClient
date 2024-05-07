import styled from "styled-components";

export const QuestionContainer = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: column;
  color: var(--foreground-color);
  padding: 2rem; // 패딩을 조금 더 늘려 내용이 여유롭게 보이도록 합니다.
  border: 2px solid var(--foreground-color);
  background-color: var(--background-color);
  border-radius: 0.5rem; // 모서리를 둥글게 처리합니다.
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem; // 여백을 조금 더 늘려주어 시각적으로 여유를 줍니다.
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    margin-bottom: 1rem;
  }
`;

export const TitleContainer = styled.input`
  font-family: "Noto Sans KR";
  padding: 0.5rem 0.2rem;
  font-size: 1rem;
  color: var(--primary-color);
  background-color: var(--background-color);

  border: none;
  border-bottom: 2px solid var(--foreground-color);
  width: auto;
  &:focus {
    outline: none;
  }
`;

export const ContentContainer = styled.textarea`
  resize: none;
  font-family: "Noto Sans KR";
  color: var(--primary-color);
  font-size: 1rem;
  padding: 0.8rem;
  border-radius: 0.5rem;
  background-color: var(--background-color);
  border: 2px solid var(--foreground-color);
  height: 35vh;
  &:focus {
    outline: none;
  }
`;

export const SaveButton = styled.button`
  background-color: var(--foreground-color);
  color: var(--background-color);
  padding: 10px 20px;
  font-size: 1.3rem;
  font-family: "Noto Sans KR";
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;
export const ImageUploadContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

export const ImageUploader = styled.label`
  font-size: 1rem;
  font-family: "Noto Sans KR";
  border-radius: 0.5rem;
  border: 2px solid var(--foreground-color);
  cursor: pointer;
  display: flex;
  justify-content: center;

  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out; // 부드러운 전환 효과
  &:hover {
    background-color: #f4f4f4; // 호버 시 테두리 색 변경
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1); // 부드러운 그림자 효과
  }

  &:focus {
    outline: none; // 기본 포커스 윤곽선 제거
    border-color: var(--primary-color); // 포커스 시 테두리 색 강조
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); // 포커스 시 그림자 강조
  }
`;
export const DropArea = styled.div`
  width: 100%;
  text-align: center;
  border-radius: 0.5rem;
  background-color: ${({ isActive }) =>
    isActive ? "#f4f4f4" : "transparent"}; // 활성화 시 배경색 변경
  transition: all 0.3s ease;
`;

export const DropMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ isActive }) =>
    isActive ? "#4CAF50" : "#aaa"}; // 활성화 상태에 따라 텍스트 색상 변경
  font-weight: bold;
  padding : 0 2.5rem;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

export const PreviewItem = styled.div`
  position: relative;
  margin-right: 0.8rem;
`;

export const ImagePreview = styled.img`
  width: 5rem;
  height: auto;
  border-radius: 4px;
`;
export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  z-index: 1;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.7;
  }
`;

