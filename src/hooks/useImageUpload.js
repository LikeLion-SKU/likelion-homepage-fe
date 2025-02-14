import { useState, useEffect, useRef } from 'react';
import { APIService } from '@api/axios';

export default function useImageUpload(initialImage, semester, studentId) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const handleImageSelect = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleImageUpload = async () => {
    if (!file) {
      throw new Error('업로드할 이미지를 선택하세요.');
    }

    const baseUrl = import.meta.env.VITE_APP_PUT_IMAGE;
    const params = new URLSearchParams({ semester, studentId });
    const urlWithParams = `${baseUrl}?${params}`;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await APIService.private.put(urlWithParams, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.success) {
        throw new Error('이미지 업로드에 실패했습니다.');
      }

      return response;
    } catch (error) {
      throw new Error(error.message || '이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  return {
    file,
    previewUrl,
    imageRef,
    handleImageSelect,
    handleImageUpload,
  };
}
