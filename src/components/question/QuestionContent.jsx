import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatIcon from "@mui/icons-material/Chat";
import { Button, TextField } from "@mui/material";
import ImageModal from "../modals/ImageModal";
import { useSharedState } from "../../context/SharedStateContext";
export default function QuestionContent({
  questionData,
  theme,
  editMode,
  setEditMode,
}) {
  const commentsCount = questionData?.comments?.length || 0;
  const [likesCount, setLikesCount] = useState(
    questionData?.likes?.length || 0
  );
  const [liked, setLiked] = useState(false);
  const [editedTitle, setEditedTitle] = useState(questionData?.title || "");
  const [editedContent, setEditedContent] = useState(
    questionData?.content || ""
  );
  const [images, setImages] = useState(questionData?.imageUrls || []);
  const [previews, setPreviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const {addNewData} = useSharedState();
  
  const handleImageClick = (url) => {
    setSelectedImage(url);
    setShowModal(true);
  };

  useEffect(() => {
    setLikesCount(questionData?.likes?.length || 0);
    setLiked(false); // Reset liked state on question change
    setEditedTitle(questionData?.title);
    setEditedContent(questionData?.content);
    setImages(questionData?.imageUrls || []);

    const questionId = questionData?._id;
    const token = localStorage.getItem("token");
    if (token && questionId) {
      const fetchLikeStatus = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/questions/${questionId}/like`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Server response was not ok.");
          }

          const data = await response.json();
          setLiked(data.isLiked);
        } catch (error) {
          console.error("Error checking like status:", error);
        }
      };

      fetchLikeStatus();
    }
  }, [questionData]);

  const saveChanges = async () => {
    if (window.confirm("이 질문을 수정하시겠습니까?")) {
      if (!editedTitle.trim() || !editedContent.trim()) {
        alert("제목, 내용을 모두 입력해주세요.");
        return;
      }
      const questionId = questionData?._id;
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", editedTitle);
      formData.append("content", editedContent);
      images.forEach((image) => {
        if (typeof image === "string") {
          formData.append("existingImages", image);
        } else {
          formData.append("images", image);
        }
      });
  
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/questions/${questionId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to update the question.");
        }
  
        const data = await response.json();
        console.log("Question updated:", data);
        setEditMode(false);
      } catch (error) {
        console.error("Error updating question:", error);
      }
    }
  };
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      setImages((prev) => [...prev, file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };


  

  const toggleLike = async () => {
    const questionId = questionData?._id;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/${questionId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Server response was not ok.");
      }

      const data = await response.json();
      if (data.success) {
        console.log(data);
        addNewData();
        setLiked(!liked);
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Box >
      {editMode ? (
        <>
          <TextField
            label="제목"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="내용"
            fullWidth
            multiline
            rows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <ImageUploadContainer>
            <ImageInputLabel htmlFor="image-upload">
              이미지 첨부:
            </ImageInputLabel>
            <ImageInput
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <PreviewContainer>
              {previews.map((preview, index) => (
                <PreviewItem key={index}>
                  <ImagePreview
                    src={preview}
                    alt={`미리보기 이미지 ${index + 1}`}
                  />
                  <DeleteButton onClick={() => handleRemoveImage(index)}>
                    X
                  </DeleteButton>
                </PreviewItem>
              ))}
            </PreviewContainer>
          </ImageUploadContainer>
          <Button
            onClick={saveChanges}
            variant="contained"
            sx={{
              backgroundColor: theme.foreground,
              borderRadius: "0.5rem",
            }}
          >
            저장
          </Button>
        </>
      ) : (
        <>
          <Title >{questionData?.title}</Title>
          <Content >{questionData?.content}</Content>
          {questionData?.imageUrls &&
            questionData?.imageUrls.map((url, index) => (
              <StyledImg
                key={index}
                src={url}
                alt="Attached"
                onClick={() => handleImageClick(url)}
              />
            ))}
          <LikeButton  onClick={toggleLike}>
            {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
          </LikeButton>
          <IconContainer>
            <div>
              <ThumbUpAltIcon /> {likesCount}
            </div>
            <div>
              <ChatIcon /> {commentsCount}
            </div>
          </IconContainer>
        </>
      )}
      {showModal && (
        <ImageModal src={selectedImage} onClose={() => setShowModal(false)} />
      )}
    </Box>
  );
}

const Box = styled.div`
  padding: 0.5rem;
  padding-left: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};
  color: var(--foreground-color);
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: var(--primary-color);
`;

const Content = styled.div`
  font-size: 1rem;
  margin-top: 0.8rem;
  padding: 0.2rem;
  color: var(--primary-color);
`;

const IconContainer = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  padding: 0.2rem;
  gap: 1rem;
`;

const LikeButton = styled.div`
  display: flex;
  margin-top: 1.5rem;
  width: 5rem;
  height: 2rem;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--background-color);
  background-color: var(--foreground-color);
  margin-left: 0.3rem;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

const StyledImg = styled.img`
  max-width: 100%; // Ensure it does not overflow its container
  max-height: 10rem; // Maximum height adjusted
  cursor: pointer; // Indicate it is clickable
  margin: 10px 0; // Add some vertical spacing around images
  border-radius: 4px; // Optional: adds rounded corners
  transition: opacity 0.2s; // Smooth transform effect on hover
  border: 1px solid black;
  &:hover {
    opacity: 0.6;
  }
`;

const ImageUploadContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const ImageInputLabel = styled.label`
  font-size: 1rem;
  margin-right: 0.3rem;
  font-family: "Noto Sans KR";
`;

const ImageInput = styled.input`
  font-size: 1rem;
  font-family: "Noto Sans KR";
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const PreviewItem = styled.div`
  position: relative;
  margin-right: 0.8rem;
`;

const ImagePreview = styled.img`
  width: 5rem;
  height: auto;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
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
