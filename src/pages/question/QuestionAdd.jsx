import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import TopBar from "../../components/topbar/TopBar";
import styled from "styled-components";
import SelectLabels from "../../components/navbarlist/select/SelectLabels";
import { useNavigate } from "react-router-dom";
import { useSharedState } from "../../context/SharedStateContext";

export default function QuestionAdd() {
  const [closeOption, setCloseOption] = useState(false);
  const [options, setOptions] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const { addNewData } = useSharedState();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prev) => [...prev, ...acceptedFiles]);

    acceptedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews((prev) => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (window.confirm("질문을 추가하시겠습니까?")) {
      if (!title.trim() || !content.trim() || !options.trim()) {
        alert("제목, 내용, 옵션을 모두 입력해주세요.");
        return;
      }

      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("options", options);
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
            options={options}
            setOptions={setOptions}
            location="QuestionAdd"
          />
        </Header>
        <ContentContainer
          placeholder="질문 내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ImageUploadContainer>
          <ImageUploader {...getRootProps()}>
            <DropArea isActive={isDragActive}>
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

//App 컨테이너
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  margin-left: ${({ show }) => (show ? "5rem" : "25.05rem")};
  background-color: var(--background-color); // 테마 적용
  transition: all 0.3s;
  z-index: 1;
`;

//질문 컨테이너
const QuestionContainer = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: column;
  color: var(--foreground-color);
  padding: 2rem; // 패딩을 조금 더 늘려 내용이 여유롭게 보이도록 합니다.
  border: 2px solid var(--foreground-color);
  background-color: var(--background-color);
  border-radius: 0.5rem; // 모서리를 둥글게 처리합니다.
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem; // 여백을 조금 더 늘려주어 시각적으로 여유를 줍니다.
`;

const TitleContainer = styled.input`
  border : 2px solid var(--foreground-color);
  font-family : 'Noto Sans KR';
  padding: 1rem;
  color: var(--primary-color);
  background-color: var(--background-color);
  border-radius: 0.5rem; // 입력 필드의 모서리를 둥글게 처리합니다.
  width: 40%
  &:focus {
    outline: none;
  }
`;

const ContentContainer = styled.textarea`
  resize: none;
  font-family: "Noto Sans KR";
  color: var(--primary-color);
  padding: 10px;
  border-radius: 0.5rem;
  background-color: var(--background-color);
  border: 2px solid var(--foreground-color);
  margin-top: 1rem; // 타이틀 필드와의 여백을 추가합니다.
  height: 35vh;
`;

const SaveButton = styled.button`
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
const ImageUploadContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
`;

const ImageUploader = styled.label`
  font-size: 1rem;
  margin-right: 0.3rem;
  font-family: "Noto Sans KR";
  border-radius: 0.5rem;
  border: 2px solid var(--foreground-color);
  cursor: pointer;
  display: flex;
  justify-content: center;

  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out; // 부드러운 전환 효과
  &:hover {
    background-color: #b3b3b3; // 호버 시 테두리 색 변경
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1); // 부드러운 그림자 효과
  }

  &:focus {
    outline: none; // 기본 포커스 윤곽선 제거
    border-color: var(--primary-color); // 포커스 시 테두리 색 강조
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2); // 포커스 시 그림자 강조
  }
`;
const DropArea = styled.div`
  width : 100%;
  text-align: center;
  border-radius : 0.5rem;
  background-color: ${({ isActive }) =>
    isActive ? "#f4f4f4" : "transparent"}; // 활성화 시 배경색 변경
  transition: all 0.3s ease;
`;

const DropMessage = styled.p`
  font-size: 1.2rem;
  color: ${({ isActive }) =>
    isActive ? "#4CAF50" : "#aaa"}; // 활성화 상태에 따라 텍스트 색상 변경
  font-weight: bold;
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
