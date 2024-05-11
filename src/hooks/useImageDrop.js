import { useCallback } from "react";

export function useImageDrop(setPreviews, setImages) {
  return useCallback(
    (acceptedFiles) => {
      const supportedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "heic"];
      acceptedFiles.forEach((file) => {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (supportedExtensions.includes(fileExtension)) {
          if (file.size > 10 * 1024 * 1024) { // 크기 제한
            alert("File size is too large. Maximum allowed is 5MB.");
            return;
          }

          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviews((prev) => [...prev, reader.result]);
            setImages((prev) => [...prev, file]);
          };
          reader.onerror = () => {
            alert(`Failed to read file: ${file.name}`);
          };
          reader.readAsDataURL(file);
        } else {
          alert(`${fileExtension} files are not supported.`);
        }
      });
    },
    [setPreviews, setImages]
  );
}
