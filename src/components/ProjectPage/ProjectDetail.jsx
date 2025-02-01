import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import projectAPI from '@/api/projectAPI';
import ImagePreview from './ImagePreview';
import DotNavigation from './DotNavigation';
import styles from './ProjectDetail.module.css';

function ProjectDetail() {
  const { projectId } = useParams(); // URL 파라미터로부터 projectId 가져오기
  const [project, setProject] = useState(null); // 프로젝트 데이터 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 현재 이미지 인덱스

  const baseUrl = import.meta.env.VITE_APP_API_URL; // API base URL 가져오기

  useEffect(() => {
    async function fetchProject() {
      try {
        const projectData = await projectAPI.fetchProjectDetail(projectId);

        const projectWithImages = {
          ...projectData,
          imageUrls: projectData.imageUrls.map((url) => (url.startsWith('http') ? url : `${baseUrl}${url}`)),
        };
        setProject(projectWithImages);
      } catch {
        setError('프로젝트 데이터를 불러오지 못했습니다.');
      }
    }

    fetchProject();
  }, [projectId, baseUrl]);

  if (error) {
    return <p className={styles.error}>{error}</p>; // 에러 메시지 표시
  }

  if (!project) {
    return <p className={styles.loading}>로딩 중...</p>; // 로딩 상태 표시
  }

  // 한글로 변환된 타입
  const typeMap = {
    HACKATHON: '중앙해커톤',
    IDEATHON: '아이디어톤',
    SIDE: '자체프로젝트',
    ALL: '전체 프로젝트',
  };
  const projectType = typeMap[project.type] || '미분류';

  return (
    <div className={styles.projectDetail}>
      <ImagePreview
        images={project.imageUrls}
        currentImage={currentImageIndex}
        onPrevClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : project.imageUrls.length - 1))}
        onNextClick={() => setCurrentImageIndex((prev) => (prev < project.imageUrls.length - 1 ? prev + 1 : 0))}
      />

      <DotNavigation
        totalDots={project.imageUrls.length}
        activeIndex={currentImageIndex}
        onDotClick={(index) => setCurrentImageIndex(index)}
      />

      {/* 프로젝트 제목 */}
      <h1 className={styles.title}>{project.title || 'Untitled Project'}</h1>

      {/* 프로젝트 태그 */}
      <div className={styles.tags}>
        <span
          className={styles.tag}
          data-type={projectType} // 한글로 변환된 타입 값을 data-type에 설정
        >
          {projectType}
        </span>
      </div>

      <div className={styles.separator}></div>

      {/* 프로젝트 상세 내용 */}
      <div className={styles.contentContainer}>
        <p className={styles.description}>{project.content || 'No Description Available'}</p>
        <div className={styles.teamBox}>
          {[
            { role: 'PM', name: project.pmName },
            { role: 'Designer', name: project.designerName },
            { role: 'Front-End', name: project.feName },
            { role: 'Back-End', name: project.beName },
          ].map(({ role, name }) => (
            <div
              key={role}
              className={styles.teamRole}
            >
              <span className={styles.role}>{role}</span>
              <span className={styles.member}>{name || 'N/A'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
