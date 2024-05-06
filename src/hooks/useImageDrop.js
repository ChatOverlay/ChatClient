import { useCallback } from "react";

export function useImageDrop(setPreviews, setImages) {
  return useCallback(
    (acceptedFiles) => {
      const supportedExtensions = ["jpg", "jpeg", "png", "gif"]; // 지원하는 파일 확장자 정의
      const newImages = [];
      const newPreviews = [];

      acceptedFiles.forEach((file) => {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (
          file.type.startsWith("image/") &&
          supportedExtensions.includes(fileExtension)
        ) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push(reader.result);
            setPreviews((prev) => [...prev, ...newPreviews]);
          };
          reader.readAsDataURL(file);
          newImages.push(file);

          setImages((prev) => [...prev, ...newImages]);
        } else {
          alert(`${fileExtension}은 지원하지 않는 확장명입니다.`);
        }
      });
    },
    [setPreviews, setImages]
  );
}
