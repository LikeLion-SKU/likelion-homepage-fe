import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import projectAPI from '@/api/projectAPI';
import CustomDropdown from './CustomDropdown';
import EditImagePreview from './EditImagePreview';
import InputTeamRole from './InputTeamRole';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './ProjectForm.module.css';

function EditProjectForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { project } = location.state || {};
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!project?.id) {
        console.error('프로젝트 ID가 없습니다.');
        return;
      }
      try {
        const projectDetail = await projectAPI.fetchProjectDetail(project.id);

        setFormData({
          ...projectDetail,
          images: [],
          imagePreviews: projectDetail.imageUrls || [],
          category:
            {
              HACKATHON: '중앙해커톤',
              IDEATHON: '아이디어톤',
              SIDE: '자체프로젝트',
            }[projectDetail.type] || '',
          title: projectDetail.title || '',
          detail: projectDetail.content || '',
          teamMembers: {
            pm: projectDetail.pmName || '',
            design: projectDetail.designerName || '',
            'front-end': projectDetail.feName || '',
            'back-end': projectDetail.beName || '',
          },
        });
      } catch (error) {
        console.error('프로젝트 데이터를 가져오는 중 오류 발생:', error);
        alert('프로젝트 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchProjectData();
  }, [project]);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleDeleteImage = (index) => {
    setFormData((prevData) => {
      const updatedImagePreviews = prevData.imagePreviews.filter((_, i) => i !== index);
      const updatedImages = prevData.images.filter((_, i) => i !== index);

      if (updatedImagePreviews.length === 0) {
        alert('최소한 하나의 이미지를 유지해야 합니다.');
        return prevData;
      }

      return {
        ...prevData,
        imagePreviews: updatedImagePreviews,
        images: updatedImages,
      };
    });
  };

  const handleImageUpload = ({ file, previewUrl }) => {
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, file], // 파일만 추가
      imagePreviews: [...prevData.imagePreviews, previewUrl], // 미리보기 URL만 추가
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, category, detail, teamMembers, images } = formData;
      const categoryMap = {
        중앙해커톤: 'HACKATHON',
        아이디어톤: 'IDEATHON',
        자체프로젝트: 'SIDE',
      };
      const enumCategory = categoryMap[category] || category;

      const remainingUrls = formData.imagePreviews.filter((url) => {
        return typeof url === 'string' && !url.startsWith('blob:'); // blob URL 제외
      });

      // 새로 추가된 이미지 파일들을 FormData에 추가
      const newImages = images.filter((file) => file instanceof File);

      if (remainingUrls.length === 0 && images.length === 0) {
        alert('최소한 하나의 이미지를 포함해야 합니다.');
        return;
      }

      const formDataToSubmit = new FormData();
      formDataToSubmit.append(
        'project',
        new Blob(
          [
            JSON.stringify({
              title,
              type: enumCategory,
              content: detail,
              pmName: teamMembers.pm,
              designerName: teamMembers.design,
              feName: teamMembers['front-end'],
              beName: teamMembers['back-end'],
            }),
          ],
          { type: 'application/json' },
        ),
      );

      newImages.forEach((file) => formDataToSubmit.append('newImages', file));

      const urlParams = `?remainingImageUrls=${encodeURIComponent(remainingUrls.join(','))}`;
      const endpoint = `${import.meta.env.VITE_APP_PROJECT_UPDATE_API}/${project.id}${urlParams}`;

      const response = await projectAPI.updateProject(endpoint, formDataToSubmit);

      if (response?.updateSuccess) {
        alert(response.message || '프로젝트가 성공적으로 수정되었습니다!');
        navigate('/admin/project');
      } else {
        throw new Error('API 응답 데이터가 없습니다.');
      }
    } catch (error) {
      console.error('프로젝트 수정 실패:', error);
      alert('프로젝트 수정 중 오류가 발생했습니다.');
    }
  };

  if (!formData) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>프로젝트 수정</h2>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <EditImagePreview
          images={formData.imagePreviews}
          onDeleteClick={handleDeleteImage}
          onImageUpload={handleImageUpload}
        />

        <div className={styles.topRow}>
          <div className={styles.leftColumn}>
            <TextareaAutosize
              className={styles.titleInput}
              placeholder='제목을 입력해주세요'
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              spellCheck={false}
            />
            <CustomDropdown
              options={['중앙해커톤', '아이디어톤', '자체프로젝트']}
              defaultOption={formData.category || '카테고리'}
              onSelect={(selectedCategory) => {
                const categoryMap = {
                  중앙해커톤: 'HACKATHON',
                  아이디어톤: 'IDEATHON',
                  자체프로젝트: 'SIDE',
                };
                setFormData((prevData) => ({
                  ...prevData,
                  category: categoryMap[selectedCategory] || '',
                }));
              }}
            />
          </div>
        </div>

        <div className={styles.separator}></div>
        <div className={styles.contentContainer}>
          <TextareaAutosize
            className={styles.detailInput}
            placeholder='프로젝트를 설명해주세요'
            value={formData.detail}
            onChange={(e) => handleInputChange('detail', e.target.value)}
            spellCheck={false}
          />
          <InputTeamRole
            teamMembers={formData.teamMembers}
            onMemberChange={(role, value) =>
              setFormData((prevData) => ({
                ...prevData,
                teamMembers: { ...prevData.teamMembers, [role]: value },
              }))
            }
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            type='submit'
            className={styles.submitButton}
          >
            저장하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProjectForm;
