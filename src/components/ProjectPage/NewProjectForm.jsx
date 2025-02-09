import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from './CustomDropdown';
import ImagePreview from './ImagePreview';
import InputTeamRole from './InputTeamRole';
import DotsNavigation from './DotNavigation';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './ProjectForm.module.css';
import imageUpload from '@assets/projectPage/imageUpload.webp';
import projectAPI from '@/api/projectAPI';

function NewProjectForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    detail: '',
    images: [], // 여러 이미지를 저장
    imagePreviews: [], // 여러 이미지 미리보기 URL
    teamMembers: {
      pm: '',
      design: '',
      'front-end': '',
      'back-end': '',
    },
  });

  const [currentImage, setCurrentImage] = useState(0); // 현재 표시 중인 이미지의 인덱스

  async function handleSubmit(event) {
    event.preventDefault();

    const { title, category, detail, images, teamMembers } = formData;

    if (!title.trim() || !category || !detail.trim() || images.length === 0) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    const formDataToSubmit = new FormData();

    // JSON 데이터를 Blob으로 변환하여 'project'라는 키로 추가
    const projectData = {
      title,
      type: category.toUpperCase(),
      content: detail,
      pmName: teamMembers.pm,
      designerName: teamMembers.design,
      feName: teamMembers['front-end'],
      beName: teamMembers['back-end'],
    };
    formDataToSubmit.append(
      'project',
      new File([JSON.stringify(projectData)], 'project.json', { type: 'application/json' }),
    );

    images.forEach((image) => formDataToSubmit.append('images', image));

    // 서버로 요청 전송
    try {
      const response = await projectAPI.createProject(formDataToSubmit);
      if (response.success) {
        alert('프로젝트가 성공적으로 등록되었습니다!');
        navigate('/admin/project');
        resetForm();
      } else {
        alert('프로젝트 등록에 실패했습니다.');
      }
    } catch {
      alert('서버 오류가 발생했습니다.');
    }
  }

  function resetForm() {
    setFormData({
      category: '',
      title: '',
      detail: '',
      images: [],
      imagePreviews: [],
      teamMembers: {
        pm: '',
        design: '',
        'front-end': '',
        'back-end': '',
      },
    });
    setCurrentImage(0);
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>새로운 프로젝트 등록</h2>
      <form
        className={styles.form}
        onSubmit={(e) => handleSubmit(e)}
      >
        <ImagePreview
          images={formData.imagePreviews}
          currentImage={currentImage}
          onPrevClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : formData.imagePreviews.length - 1))}
          onNextClick={() => setCurrentImage((prev) => (prev < formData.imagePreviews.length - 1 ? prev + 1 : 0))}
          isAdmin={true}
          onDeleteClick={function (index) {
            const updatedImages = formData.images.filter(function (_, i) {
              return i !== index;
            });
            const updatedPreviews = formData.imagePreviews.filter(function (_, i) {
              return i !== index;
            });
            setFormData(function (prevData) {
              return {
                ...prevData,
                images: updatedImages,
                imagePreviews: updatedPreviews,
              };
            });
            setCurrentImage(function (prev) {
              return Math.max(prev - 1, 0);
            });
          }}
        />

        <DotsNavigation
          totalDots={formData.imagePreviews.length}
          activeIndex={currentImage}
          onDotClick={(index) => setCurrentImage(index)}
        />

        <div className={styles.topRow}>
          <div className={styles.leftColumn}>
            <TextareaAutosize
              className={styles.titleInput}
              placeholder='제목을 입력해주세요'
              value={formData.title}
              onChange={(e) => setFormData((prevData) => ({ ...prevData, title: e.target.value }))}
              required={false} // 기본 유효성 검사 비활성화
              spellCheck={false} // 맞춤법 검사를 비활성화하여 빨간 줄 제거
            />
            <CustomDropdown
              options={['중앙해커톤', '아이디어톤', '자체프로젝트']}
              defaultOption='카테고리'
              onSelect={(selectedCategory) => {
                const categoryMap = {
                  중앙해커톤: 'HACKATHON',
                  아이디어톤: 'IDEATHON',
                  자체프로젝트: 'SIDE',
                };
                setFormData((prevData) => ({ ...prevData, category: categoryMap[selectedCategory] || '' }));
              }}
            />
          </div>
          <label
            htmlFor='imageUpload'
            className={styles.imageUploadButton}
          >
            <span className={styles.uploadText}>이미지 첨부</span>
            <img
              src={imageUpload}
              alt='Upload Icon'
              className={styles.uploadIcon}
            />
            <input
              type='file'
              id='imageUpload'
              accept='image/*'
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (!files || files.length === 0) return;

                const filePreviews = files.map((file) => URL.createObjectURL(file));

                setFormData((prevData) => ({
                  ...prevData,
                  images: [...prevData.images, ...files],
                  imagePreviews: [...prevData.imagePreviews, ...filePreviews],
                }));
              }}
            />
          </label>
        </div>

        <div className={styles.separator}></div>
        <div className={styles.contentContainer}>
          <TextareaAutosize
            className={styles.detailInput}
            placeholder='프로젝트를 설명해주세요'
            value={formData.detail}
            onChange={(e) => setFormData((prevData) => ({ ...prevData, detail: e.target.value }))}
            required={false} // 기본 유효성 검사 비활성화
            spellCheck={false} // 맞춤법 검사를 비활성화하여 빨간 줄 제거
          />
          <InputTeamRole
            teamMembers={formData.teamMembers}
            onMemberChange={(role, value) => {
              setFormData((prevData) => ({
                ...prevData,
                teamMembers: { ...prevData.teamMembers, [role]: value },
              }));
            }}
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            type='submit'
            className={styles.submitButton}
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewProjectForm;
