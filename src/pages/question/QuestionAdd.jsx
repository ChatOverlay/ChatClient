import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import TopBar from "../../components/topbar/TopBar";
import SelectLabels from "../../components/navbarlist/select/SelectLabels";
import { useNavigate } from "react-router-dom";
import { useSharedState } from "../../context/SharedStateContext";
import { AppContainer } from "../styles";
import useMobileNavigate from "../../hooks/useMobileNavigate";
import { useImageDrop } from "../../hooks/useImageDrop";
import { ContentContainer, DeleteButton, DropArea, DropMessage, Header, ImagePreview, ImageUploadContainer, ImageUploader, PreviewContainer, PreviewItem, QuestionContainer, SaveButton, TitleContainer } from "./QuestionStyle";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function QuestionAdd() {
  const [closeOption, setCloseOption] = useState(false);

  const [courses, setCourses] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ id: "", name: "" });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const { addNewData } = useSharedState();
  const navigate = useNavigate();
  useMobileNavigate(closeOption, "/question");
  const onDrop = useImageDrop(setPreviews, setImages);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp']
    },
    noClick: true
  });

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("질문을 추가하시겠습니까?")) {
      if (!title.trim() || !content.trim() || !selectedOption.id.trim()) {
        alert("제목, 수업, 내용을 모두 입력해주세요.");
        return;
      }

      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("courseId", selectedOption.id);
      formData.append("courseName", selectedOption.name);
      images.forEach((image) => {
        formData.append("images", image);
      });

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/questions`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        addNewData();
        navigate(`/question/${responseData._id}`);
      } catch (error) {
        console.error("Error adding question:", error);
        alert("질문 추가 중 문제가 발생했습니다.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses([
          { label: "수업을 선택해주세요", value: "" },
          ...data
            .filter((course) => course.id !== undefined)
            .map((course) => ({ label: course.name, value: course.id })),
        ]);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);
  return (
    <AppContainer show={closeOption}>
      <TopBar
        closeOption={closeOption}
        setCloseOption={setCloseOption}
        titleName="새로운 질문 만들기"
      />
      <QuestionContainer as="form" onSubmit={handleSubmit}>
        <Header>
          <TitleContainer
            placeholder="질문 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <SelectLabels
            options={courses}
            selectedOption={selectedOption.id} // Pass the id of the selected option
            setSelectedOption={(option) => setSelectedOption(option)}
            location="QuestionAdd"
          />
        </Header>
        <ContentContainer
          placeholder="질문 내용을 입력하세요"
          value={content}
          style={{ height: "20vh" }}
          onChange={(e) => setContent(e.target.value)}
        />
        <ImageUploadContainer>
          <ImageUploader {...getRootProps()}>
            <input {...getInputProps()} style={{ display: "none" }} />
            <DropArea isActive={isDragActive}>
              <AddPhotoAlternateIcon sx={{fontSize : "2rem", paddingTop:"1rem"}}/>
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
        <SaveButton type="submit" disabled={isSubmitting}>
          질문 게시하기
        </SaveButton>
      </QuestionContainer>
    </AppContainer>
  );
}
