import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import styles from './ProjectPageLayout.module.css';
import CustomDropdown from './CustomDropdown.jsx';
import plusbtn from '@assets/projectPage/plusbtn.webp';
import Pagination from './Pagination.jsx';
import projectAPI from '@/api/projectAPI';

function ProjectPageLayout({ isAdmin }) {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0);
  const [menuVisible, setMenuVisible] = useState(null); // 메뉴 표시 상태 관리
  const [selectedType, setSelectedType] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const menuRefs = useRef({}); // 각 프로젝트 메뉴별 참조 객체
  const navigate = useNavigate();

  // 타입 매핑 (영문 -> 한글)
  const typeMap = {
    HACKATHON: '중앙해커톤',
    IDEATHON: '아이디어톤',
    SIDE: '자체프로젝트',
    ALL: '전체 프로젝트',
  };

  useEffect(() => {
    // API 호출: 프로젝트 목록 조회
    async function fetchProjects() {
      setLoading(true); // API 호출 전 로딩 상태 활성화
      try {
        const response = await projectAPI.fetchProjects(selectedType.toUpperCase(), currentPage - 1);
        const { content = [], totalPages = 0 } = response || {}; // content와 totalPages 추출
        setProjects(content);
        setTotalPages(totalPages);
      } catch {
        alert('Failed to fetch projects');
        setProjects([]); // 오류 발생 시 빈 목록으로 초기화
        setTotalPages(0); // 페이지 수 초기화
      } finally {
        setLoading(false); // API 호출 후 로딩 상태 비활성화
      }
    }

    fetchProjects();
  }, [currentPage, selectedType]);

  useEffect(() => {
    function handleClickOutside(event) {
      const currentRef = menuRefs.current[menuVisible];
      if (menuVisible && currentRef && !currentRef.contains(event.target)) {
        setMenuVisible(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  function handleDelete(projectId) {
    const confirmDelete = window.confirm('프로젝트가 삭제됩니다.');
    if (confirmDelete) {
      (async () => {
        try {
          await projectAPI.deleteProject(projectId); // 삭제 API 호출

          // 삭제 후 프로젝트 목록 다시 로드
          setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));

          // 삭제 성공 알림
          alert('프로젝트가 성공적으로 삭제되었습니다.');
        } catch {
          alert('프로젝트 삭제에 실패했습니다.');
        }
      })();
    }
  }

  function handleTypeSelect(type) {
    const typeMap = {
      '전체 프로젝트': 'ALL',
      중앙해커톤: 'HACKATHON',
      아이디어톤: 'IDEATHON',
      자체프로젝트: 'SIDE',
    };
    setSelectedType(typeMap[type] || 'ALL'); // 매핑된 값 설정
    setCurrentPage(1);
  }

  return (
    <div className={styles.projectPage}>
      <p className={styles.title}>프로젝트</p>
      <div className={styles.controls}>
        {isAdmin ? (
          <img
            src={plusbtn}
            alt='Add Project'
            className={styles.addButtonImage}
            onClick={() => navigate('/admin/project/add')}
          />
        ) : null}

        <div className={styles.selectBoxContainer}>
          <CustomDropdown
            options={['전체 프로젝트', '중앙해커톤', '아이디어톤', '자체프로젝트']}
            defaultOption='전체 프로젝트'
            onSelect={(type) => handleTypeSelect(type)}
          />
        </div>
      </div>

      {loading ? (
        <div className={styles.loaderContainer}>
          <TailSpin
            height='60'
            color='#4fa94d'
            ariaLabel='tail-spin-loading'
            radius='1'
            visible={true}
          />
        </div>
      ) : (
        <div className={styles.grid}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className={styles.card}
              >
                <div onClick={() => navigate(`/project/${project.id}`)}>
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title || 'No Project image'}
                    className={styles.image}
                  />

                  <p className={styles.name}>{project.title || 'Untitled Project'}</p>
                  <p className={styles.description}>
                    {project.content?.length > 50
                      ? `${project.content.slice(0, 50)}...`
                      : project.content || 'No description'}
                  </p>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.tags}>
                    <span className={`${styles.tag} ${styles[typeMap[project.type] || 'default']}`}>
                      {typeMap[project.type] || 'Uncategorized'}
                    </span>
                  </div>
                  {isAdmin ? (
                    <div className={styles.menuContainer}>
                      <button
                        className={styles.menuButton}
                        onClick={() => setMenuVisible((prev) => (prev === project.id ? null : project.id))}
                      >
                        &#x22EE;
                      </button>
                      {menuVisible === project.id ? (
                        <div
                          ref={(ref) => (menuRefs.current[project.id] = ref)}
                          className={styles.menu}
                        >
                          <button onClick={() => navigate('/admin/project/edit', { state: { project } })}>
                            수정하기
                          </button>
                          <button onClick={() => handleDelete(project.id)}>삭제하기</button>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noProjects}>프로젝트가 없습니다.</p>
          )}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default ProjectPageLayout;
