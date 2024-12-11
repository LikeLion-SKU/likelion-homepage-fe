import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDropdown";
import InputTeamRole from "./InputTeamRole";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./styles/EditProjectForm.module.css";
import uploadIcon from "../../assets/svgs/upload_icon.svg";

function EditProjectForm () {
  const location = useLocation();
  const navigate = useNavigate();

  // 전달받은 프로젝트 데이터 (ProjectDetail에서 state로 전달)
  const { project } = location.state || {};
  if (!project) {
    return <p>프로젝트 데이터를 불러올 수 없습니다.</p>;
  }

  // 프로젝트 데이터를 초기 값으로 설정
  const [formData, setFormData] = useState({
    category: project.tags[0] || "",
    title: project.name || "",
    detail: project.description || "",
    image: null,
    imagePreview: project.image || null, // 기존 이미지 미리보기
    teamMembers: project.teamMembers || {},
  });

  // 핸들러 함수들
  function handleCategorySelect(selectedCategory) {
    setFormData({ ...formData, category: selectedCategory });
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
      setFormData({ ...formData, imagePreview: URL.createObjectURL(file) });
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
    console.log("Edited Project Data:", formData);
    // 수정된 데이터 저장 로직 추가
    navigate("/project/admin");
  }

  return (
    <div className={styles.editFormContainer}>
      <h2 className={styles.title}>프로젝트 수정</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 이미지 업로드 */}
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
              <span className={styles.imageUploadText}>이미지 업로드</span>
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
            className={styles.titleInput}
            placeholder="제목을 입력해주세요"
            value={formData.title}
            onChange={handleTitleChange}
            rows={1} // 최소 줄 수 설정
          />

        {/* 카테고리 선택 */}
        <div className={styles.inputGroup}>
            <CustomDropdown
            options={["중앙해커톤", "아이디어톤", "자체프로젝트"]}
            defaultOption={formData.category}
            onSelect={handleCategorySelect}
            hideArrow={true}
            />
        </div>
        <div className={styles.separator}></div>

        <div className={styles.contentContainer}>
        {/* 상세 설명 */}
        <TextareaAutosize
        className={styles.detailInput}
        placeholder="프로젝트에 대해 설명해주세요"
        value={formData.detail}
        onChange={handleDetailChange}
        />
        {/* 팀 구성원 입력 */}
        <InputTeamRole
          teamMembers={formData.teamMembers}
          onMemberChange={handleMemberChange}
        />
        </div>

        {/* 버튼 컨테이너 */}
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;
