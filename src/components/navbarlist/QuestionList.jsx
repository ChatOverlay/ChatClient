import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListBox.css";
import SelectLabels from "./select/SelectLabels";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useSharedState } from "../../context/SharedStateContext";
import ViewToggle from "./toggle/ViewToggle";
import QuestionGrid from "./questiongrid/QuestionGrid";
import CommentModal from "../modals/CommentModal";
import { useTheme } from "../../context/ThemeContext";

export default function QuestionList() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState({
    id: "",
    name: "전체 보기",
  }); // Initialize as an object
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isGridView, setIsGridView] = useState(false); // State for view mode
  const [editMode, setEditMode] = useState(false); // State for edit mode
  const [changeData, setChangeData] = useState(true);
  const [commentToggle, setCommentToggle] = useState(false);

  const { newAdded } = useSharedState();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setCurrentUserId(data.id);
        } else {
          console.error("User ID not found");
        }
      })
      .catch((error) => console.error("Error fetching user ID:", error));

    fetch(`${import.meta.env.VITE_API_URL}/api/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses([
          { label: "전체 보기", value: "" },
          ...data
            .filter((course) => course.id !== undefined)
            .map((course) => ({ label: course.name, value: course.id })),
        ]);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);
  useEffect(() => {
    // Define a local variable to control effect cleanup
    let isSubscribed = true;
  
    const fetchData = async () => {
      if (selectedQuestion?._id && changeData) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/questions/${selectedQuestion._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.ok && isSubscribed) { // Check subscription before updating state
            const data = await response.json();
            setSelectedQuestion(data);
            setChangeData(false); // Reset flag after fetching data
          }
        } catch (error) {
          console.error("Error fetching updated question data:", error);
        }
      }
    };
  
    fetchData();
  
    // Cleanup function to prevent setting state on unmounted component
    return () => {
      isSubscribed = false;
    };
  }, [selectedQuestion?._id, changeData]); // Ensure the effect only runs on ID change or flag reset
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/questions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestionList(data.sort((a, b) => b._id.localeCompare(a._id)));
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [newAdded, editMode, changeData]);

  const handleQuestionClick = (id) => {
    setSelectedQuestion(id);
    navigate(`/question/${id}`);
  };

  const handleNewQuestion = () => {
    navigate("question/newquestion");
  };

  const handleCommentClick = (question) => {
    setSelectedQuestion(question);
    setCommentToggle(true);
  };

  return (
    <div className="navbar__list">
      <div className="sticky-container">
      <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      
        <SelectLabels
          options={courses}
          selectedOption={selectedOption.id}
          setSelectedOption={(option) => setSelectedOption(option)}
        />
      </div>
      <div className="scrollable-list-items">
        {!isGridView ? (
          <QuestionGrid
            questionList={questionList.filter(
              (question) =>
                selectedOption.id === "" ||
                question.className === selectedOption.name
            )}
            onCommentClick={handleCommentClick}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        ) : (
          questionList
            .filter(
              (question) =>
                selectedOption.id === "" ||
                question.className === selectedOption.name
            )
            .map((question) => {
              const isLikedByCurrentUser = question.likes.some(
                (like) => like.userId === currentUserId
              );
              const isCommentedByCurrentUser = question.comments.some(
                (comment) => comment.userId === currentUserId
              );
              return (
                <div
                  className={`navbar__list__item ${
                    question._id === selectedQuestion ? "selected" : ""
                  }`}
                  key={question._id}
                  onClick={() => handleQuestionClick(question._id)}
                >
                  <div className="question-container">
                    <div className="question-title-container">
                      <div>{question.title}</div>
                    </div>
                    <div className="question-details">
                      <span className="question-date">{question.date}</span>
                    </div>
                    <div className="sub-title-container">
                      <div>{question.className}</div>
                      {question.likes.length > 0 && (
                        <span
                          className={`likes-count ${
                            isLikedByCurrentUser ? "icon-liked" : ""
                          }`}
                        >
                          <ThumbUpAltIcon /> {question.likes.length}
                        </span>
                      )}
                      {question.comments.length > 0 && (
                        <span
                          className={`comments-count ${
                            isCommentedByCurrentUser ? "icon-liked" : ""
                          }`}
                        >
                          <ChatIcon /> {question.comments.length}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="icon__arrow__container">
                    <ArrowForwardIcon />
                  </div>
                </div>
              );
            })
        )}
      </div>
      {commentToggle && (
        <CommentModal
          question={selectedQuestion}
          theme={theme}
          setCommentToggle={setCommentToggle}
          commentToggle={commentToggle}
          changeData={changeData}
          setChangeData={setChangeData}
         />
      )}
      <div className="write-container">
        <div className="mobile-icon-container" onClick={handleNewQuestion}>
          질문 작성하기
        </div>
      </div>
    </div>
  );
}
