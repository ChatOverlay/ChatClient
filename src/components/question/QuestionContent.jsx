import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatIcon from "@mui/icons-material/Chat";
import { Button, TextField } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageModal from "../modals/ImageModal";
import { useDropzone } from "react-dropzone";
import { useSharedState } from "../../context/SharedStateContext";
import { useImageDrop } from "../../hooks/useImageDrop";
import {
  ContentContainer,
  DeleteButton,
  DropArea,
  DropMessage,
  Header,
  ImagePreview,
  ImageUploadContainer,
  ImageUploader,
  PreviewContainer,
  PreviewItem,
  TitleContainer,
} from "../../pages/question/QuestionStyle";
export default function QuestionContent({
  questionData,
  theme,
  editMode,
  setEditMode,
  imgModalAble,
  onCommentClick,
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
  const { addNewData } = useSharedState();

  const onDrop = useImageDrop(setPreviews, setImages);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    noClick: true,
  });
  const handleImageClick = (url) => {
    setSelectedImage(url);
    setShowModal(true);
  };
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setLikesCount(questionData?.likes?.length || 0);
    setEditedTitle(questionData?.title);
    setEditedContent(questionData?.content);
    setImages(questionData?.imageUrls || []);
    setPreviews(questionData?.imageUrls || []);

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
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }
      const questionId = questionData?._id;
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", editedTitle);
      formData.append("content", editedContent);
      const existingImages = images.filter(
        (image) => typeof image === "string"
      );
      const newImages = images.filter((image) => typeof image !== "string");

      formData.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((image) => {
        formData.append("images", image);
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
          throw new Error("질문 업데이트 실패.");
        }

        const data = await response.json();
        console.log("질문이 업데이트되었습니다:", data);
        setEditMode(false);
      } catch (error) {
        console.error("질문 업데이트 중 오류 발생:", error);
      }
    }
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
        addNewData();
        setLiked(!liked);
        setLikesCount(data.likesCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <Box imgModalAble={imgModalAble}>
      {editMode ? (
        <EditContainer>
          <Header>
            <TitleContainer
              placeholder="질문 제목을 입력하세요"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </Header>
          <ContentContainer
            placeholder="질문 내용을 입력하세요"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{ height: "0%" }}
          />
          <ImageUploadContainer>
            <ImageUploader {...getRootProps()}>
              <input {...getInputProps()} style={{ display: "none" }} />
              <DropArea isActive={isDragActive}>
                <AddPhotoAlternateIcon
                  sx={{ fontSize: "2rem", paddingTop: "1rem" }}
                />

                {isDragActive ? (
                  <DropMessage>이미지를 여기에 드롭하세요!</DropMessage>
                ) : (
                  <DropMessage>
                    이미지 파일을 드래그 앤 드롭하거나 클릭해서 선택하세요.
                  </DropMessage>
                )}
              </DropArea>
            </ImageUploader>
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
              fontFamily: "Noto Sans KR",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            저장하기
          </Button>
        </EditContainer>
      ) : (
        <>
          <Title>{questionData?.title}</Title>
          <Content>{questionData?.content}</Content>
          <ImgContainer>
            {questionData?.imageUrls &&
              questionData?.imageUrls.map((url, index) => (
                <StyledImg
                  key={index}
                  src={url}
                  alt="Attached"
                  onClick={() => handleImageClick(url)}
                />
              ))}
          </ImgContainer>
          {imgModalAble ? (
            <>
              <LikeButton onClick={toggleLike} imgModalAble={imgModalAble}>
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
          ) : (
            <GridViewIconContainer>
              <LikeButton imgModalAble={imgModalAble} onClick={toggleLike}>
                {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon /> } {likesCount}
              </LikeButton>
              <LikeButton imgModalAble={imgModalAble} onClick={() => onCommentClick(questionData)}>
                <ChatIcon /> {commentsCount}
              </LikeButton>
            </GridViewIconContainer>
          )}
        </>
      )}
      {showModal && imgModalAble && (
        <ImageModal src={selectedImage} onClose={() => setShowModal(false)} />
      )}
    </Box>
  );
}

const Box = styled.div`
  padding: 0.5rem;
  padding-left: 2rem;
  padding-bottom: 2rem;
  color: var(--foreground-color);
  border-bottom: ${(props) =>
    props.imgModalAble ? "1px solid var(--foreground-color)" : "none"};
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

const GridViewIconContainer = styled.div`
    display : flex;
`;
const LikeButton = styled.div`
  display: flex;
  margin-top: 1.5rem;
  width: ${(props) =>
    props.imgModalAble ? "5rem" : "4rem"};
  height: 2rem;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--background-color);
  background-color: var(--foreground-color);
  margin-left: 0.3rem;
  transition: all 0.3s;
  gap : 0.3rem;
  &:hover {
    opacity: 0.8;
    transform: scale(1.03);
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-right: 0.5rem;
  gap: 1rem;
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

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;
