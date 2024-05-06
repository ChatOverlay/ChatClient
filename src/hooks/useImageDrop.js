import { useCallback } from "react";

export function useImageDrop(setPreviews, setImages) {
  return useCallback(
    (acceptedFiles) => {
      const supportedExtensions = ["jpg", "jpeg", "png", "gif"];
      acceptedFiles.forEach((file) => {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (supportedExtensions.includes(fileExtension)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviews(prev => [...prev, reader.result]);
            setImages(prev => [...prev, file]);
          };
          reader.readAsDataURL(file);
        } else {
          alert(`${fileExtension} 파일 확장자는 지원하지 않습니다.`);
        }
      });
    },
    [setPreviews, setImages]
  );
}

