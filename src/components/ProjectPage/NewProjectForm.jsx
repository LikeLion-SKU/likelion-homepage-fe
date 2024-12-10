import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import InputTeamRole from "./InputTeamRole";
import TextareaAutosize from 'react-textarea-autosize';
import styles from "./styles/NewProjectForm.module.css";
import uploadIcon from "../../assets/svgs/upload_icon.svg";

const NewProjectForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    detail: "",
    image: null,
    imagePreview: null, // 이미지 미리보기 URL
    teamMembers: {
      pm: "",
      design: "",
      "front-end": "",
      "back-end": "",
    },
  });

  function handleCategorySelect(selectedCategory) {
    setFormData({ ...formData, category: selectedCategory }); // 선택된 카테고리 저장
  }

  function handleTitleChange(event) {
    setFormData({ ...formData, title: event.target.value });
  }

  function handleDetailChange(event) {
    setFormData({ ...formData, detail: event.target.value });
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file), // 미리보기 URL 생성
      });
      console.log("Uploaded Image:", file);
    }
  }

  function handleMemberChange(role, value) {
    setFormData((prevData) => ({
      ...prevData,
      teamMembers: {
        ...prevData.teamMembers,
        [role]: value,
      },
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted:", formData);
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>새로운 프로젝트 등록</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          <TextareaAutosize
            type="text"
            className={styles.titleInput}
            placeholder="제목을 입력해주세요"
            value={formData.title}
            onChange={handleTitleChange}
          />

        {/* Dropdown Section */}
        <div className={styles.inputGroup}>
          <CustomDropdown
            options={["중앙해커톤", "아이디어톤", "자체프로젝트"]}
            defaultOption="카테고리"
            onSelect={handleCategorySelect}
            hideArrow={true}
          />
        </div>
        <div className={styles.separator}></div>

        {/* 설명 입력과 팀 역할 */}
        <div className={styles.contentContainer}>
          <TextareaAutosize
            className={styles.detailInput}
            placeholder="프로젝트를 설명해주세요"
            value={formData.detail}
            onChange={handleDetailChange}
          />
          <InputTeamRole
            teamMembers={formData.teamMembers}
            onMemberChange={handleMemberChange}
          />
        </div>

        {/* 등록하기 버튼 */}
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProjectForm;