import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Questioner from "../../components/question/Questioner";
import QuestionContent from "../../components/question/QuestionContent";
import Comment from "../../components/question/Comment";
import CommentAdd from "../../components/question/CommentAdd";
import TopBar from "../../components/topbar/TopBar";
import { useTheme } from "../../context/ThemeContext";
import { AppContainer } from "../styles";
import { PulseLoader } from "react-spinners";
import useMobileNavigate from "../../hooks/useMobileNavigate";
import useLoadingTimeout from "../../hooks/useLoadingTimeout";

export default function Question() {
  const [closeOption, setCloseOption] = useState(false);
  const [questionData, setQuestionData] = useState(null);
  const { id } = useParams();
  const [changeData, setChangeData] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

useLoadingTimeout(loading, 5000); //로딩 시간 넘을 시 Login 창으로 가게 처리
  useMobileNavigate(closeOption, "/question");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/questions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestionData(data);
        setLoading(false); // API 요청 완료 후 로딩 상태 해제
      })
      .catch((error) => {
        console.error("Error fetching question detail:", error);
      });
  }, [id, changeData, editMode]);

  useEffect(() => {
    setEditMode(false);
    setCloseOption(false);
  }, [id]);

  return (
    <>
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName={questionData?.className}
        />
        {loading ? (
          <LoadingContainer>
            <PulseLoader
              size={15}
              color={"var(--foreground-color)"}
              loading={loading}
            />
          </LoadingContainer>
        ) : (
          <>
            <QuestionContainer theme={theme}>
              <Questioner
                questionData={questionData}
                theme={theme}
                editMode={editMode}
                setEditMode={setEditMode}
                gridMode={false}
              />
              <QuestionContent
                questionData={questionData}
                theme={theme}
                editMode={editMode}
                setEditMode={setEditMode}
                gridMode={false}
              />
              {questionData?.comments?.length > 0 ? (
                questionData.comments.map((comment) => (
                  <Comment
                    key={comment._id}
                    questionData={questionData}
                    changeData={changeData}
                    setChangeData={setChangeData}
                    comment={comment}
                    theme={theme}
                  />
                ))
              ) : (
                <NoCommentsMessage>
                  아직 댓글이 없습니다.
                  <br /> 채택 포인트를 획득해보세요!
                </NoCommentsMessage>
              )}
            </QuestionContainer>
            <CommentAdd
              questionData={questionData}
              setChangeData={setChangeData}
              theme={theme}
            />
          </>
        )}
      </AppContainer>
    </>
  );
}

const QuestionContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  color: var(--foreground-color);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
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
  @media (max-width: 480px) {
    &::-webkit-scrollbar {
      display: none; /* Hide scrollbar on mobile devices */
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const NoCommentsMessage = styled.div`
  text-align: center;
  margin: 1rem;
  color: var(--primary-color);
`;
