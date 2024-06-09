import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid var(--foreground-color);
  border-radius: 0.5rem;
  padding: 1rem;
  width: 30rem;
  display: flex;
  height: 50rem;
  background-color: var(--secondary-color);
  color: var(--primary-color);
`;

export const Sidebar = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--foreground-color);
  padding-right: 0.5rem;
`;

export const MainContent = styled.div`
  width: 80%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  padding-left: 1rem; /* 좌측 여백 추가 */
`;

export const SectionButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const SelectedSections = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--foreground-color);
  border-radius: 0.25rem;
  background-color: var(--background-color);
  cursor: pointer;
  margin-bottom: 0.5rem;
  color: var(--primary-color);

  transition: all 0.3s;
  &:hover {
    background-color: var(--foreground-color);
    color: var(--background-color);
  }

  &:focus {
    outline: none;
  }
`;

export const SectionButton = styled(Button)`
  margin-bottom: 0.5rem;
`;

export const SelectedSectionBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.3rem 0.25rem 0.5rem;
  border: 1px solid var(--foreground-color);
  border-radius: 0.25rem;
  background-color: var(--background-color, var(--secondary-color));
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: var(--foreground-color);
  }
`;

export const CloseButton = styled.button`
  margin-left: 0.1rem;
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 1.2rem;
`;

export const ClubList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ClubItem = styled.div`
  border: 1px solid var(--foreground-color);
  border-radius: 0.25rem;
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 0.5rem;
  text-align: center;
  background-color: ${({ selected }) =>
    selected ? "var(--foreground-color)" : "var(--background-color)"};
  color: ${({ selected }) =>
    selected ? "var(--background-color)" : "var(--primary-color)"};
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
  transition: all 0.3s;
  &:hover {
    background-color: var(--foreground-color);
    color: var(--background-color);
  }
`;

export const ResetButton = styled(Button)`
  margin-left: auto; /* 오른쪽 끝으로 정렬 */
  margin-right: -0.5rem;
  font-family: "Noto Sans KR";
  color: var(--primary-color);
  font-size: 0.8rem;
  &:hover {
    opacity : 0.6;  
  color: var(--primary-color);
  }
`;

export const SelectedSectionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Reset 버튼과 선택한 섹션들 사이 공간 확보 */
  margin-bottom: 1rem;
  width: 100%;
`;

export const SectionText = styled.div`
  cursor: pointer;
  color: var(--primary-color);

  margin-bottom: 0.5rem;
`;

export const SubSectionText = styled(SectionText)`
  margin-bottom: 0.5rem;
  transition: all 0.2s;
  &:hover {
    color: var(--foreground-color);
  }
  opacity: ${({ expanded }) => (expanded ? 1 : 0.5)};
`;
