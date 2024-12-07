import React, { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import styles from "./styles/NewProjectForm.module.css";
import uploadIcon from "../../assets/svgs/upload_icon.svg"; 

const NewProjectForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "", 
    image: null,
    imagePreview: null, // 이미지 미리보기 URL
  });

  const handleCategorySelect = (selectedCategory) => {
    setFormData({ ...formData, category: selectedCategory }); // 선택된 카테고리 저장
  };

  const handleTitleChange = (event) => {
    setFormData({ ...formData, title: event.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file), // 미리보기 URL 생성
      });
      console.log("Uploaded Image:", file);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>새로운 프로젝트 등록</h2>
      <form className={styles.form}>

        {/* Image Upload Section */}
        <label htmlFor="imageUpload" className={styles.imageUploadContainer}>
          {formData.imagePreview ? (
            <img
              src={formData.imagePreview}
              alt="Preview"
              className={styles.imagePreview}
            />
          ) : (
            <>
              <img
                src={uploadIcon}
                alt="Upload"
                className={styles.imageUploadIcon}
              />
              <span className={styles.imageUploadText}>이미지 첨부</span>
            </>
          )}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </label>
        
        
        {/* 제목 입력 */}
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.titleInput}
            placeholder="제목을 입력해주세요"
            value={formData.title}
            onChange={handleTitleChange}
          />
        </div>

        {/* Dropdown Section */}
        <div className={styles.inputGroup}>
          <CustomDropdown
            options={["중앙해커톤", "아이디어톤", "자체프로젝트"]}
            defaultOption="카테고리"
            onSelect={handleCategorySelect}
            hideArrow={true} // 화살표 숨기기
          />
        </div>
        <div className={styles.separator}></div>

      </form>
    </div>
  );
};

export default NewProjectForm;