import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import styles from './ProjectPageLayout.module.css';
import CustomDropdown from './CustomDropdown.jsx';
import plusbtn from '@assets/projectPage/plusbtn.webp';
import Pagination from './Pagination.jsx';
import projectAPI from '@/api/projectAPI';

function ProjectPageLayout({ isAdmin }) {
  const [projects, setProjects] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [menuVisible, setMenuVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const menuRefs = useRef({});
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedType = (searchParams.get('type') ?? 'ALL').toUpperCase();
  const page1 = parseInt(searchParams.get('page') ?? '1', 10);
  const currentPage1 = Number.isFinite(page1) && page1 > 0 ? page1 : 1;

  // API용 0-based
  const currentPage0 = currentPage1 - 1;

  // 타입 매핑 (영문 -> 한글)
  const typeMap = {
    HACKATHON: '중앙해커톤',
    IDEATHON: '아이디어톤',
    SIDE: '자체프로젝트',
    ALL: '전체 프로젝트',
  };

  const typeLabelMap = {
    ALL: '전체 프로젝트',
    HACKATHON: '중앙해커톤',
    IDEATHON: '아이디어톤',
    SIDE: '자체프로젝트',
  };

  const updateQuery = useCallback(
    (updates, options = { replace: true }) => {
      const next = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });

      if (next.toString() !== searchParams.toString()) {
        setSearchParams(next, options);
      }
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const response = await projectAPI.fetchProjects(selectedType, currentPage0);

        const { content = [], totalElements: serverTotalElements = 0, pageSize: serverPageSize = 6 } = response || {};

        setProjects(content);
        setTotalElements(serverTotalElements);
        setPageSize(serverPageSize);
      } catch {
        alert('Failed to fetch projects');
        setProjects([]);
        setTotalElements(0);
        setPageSize(6);

        updateQuery({ page: 1 });
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [selectedType, currentPage0, updateQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      const currentRef = menuRefs.current[menuVisible];
      if (menuVisible && currentRef && !currentRef.contains(event.target)) {
        setMenuVisible(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuVisible]);

  function handleTypeSelect(type) {
    const map = {
      '전체 프로젝트': 'ALL',
      중앙해커톤: 'HACKATHON',
      아이디어톤: 'IDEATHON',
      자체프로젝트: 'SIDE',
    };

    updateQuery({ type: map[type] || 'ALL', page: 1 });
  }

  function handleAddProjectClick() {
    navigate('/admin/project/add');
  }

  function handleProjectCardClick(projectId) {
    navigate(`/project/${projectId}${location.search}`);
  }

  function handleEditProjectClick(project) {
    navigate('/admin/project/edit', { state: { project } });
  }

  function toggleMenu(projectId) {
    setMenuVisible((prev) => (prev === projectId ? null : projectId));
  }

  function handleDelete(projectId) {
    const confirmDelete = window.confirm('프로젝트가 삭제됩니다.');
    if (!confirmDelete) return;

    (async () => {
      try {
        await projectAPI.deleteProject(projectId);
        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        alert('프로젝트가 성공적으로 삭제되었습니다.');
      } catch {
        alert('프로젝트 삭제에 실패했습니다.');
      }
    })();
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
            onClick={handleAddProjectClick}
          />
        ) : null}

        <div className={styles.selectBoxContainer}>
          <CustomDropdown
            options={['전체 프로젝트', '중앙해커톤', '아이디어톤', '자체프로젝트']}
            value={typeLabelMap[selectedType] ?? '전체 프로젝트'}
            onSelect={handleTypeSelect}
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
                <div
                  onClick={function () {
                    handleProjectCardClick(project.id);
                  }}
                >
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title || 'No Project image'}
                    className={styles.image}
                  />

                  <p className={styles.name}>{project.title || 'Untitled Project'}</p>
                  <p className={styles.description}>
                    {project.content?.length > 55
                      ? `${project.content.slice(0, 55)}...`
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
                        onClick={function () {
                          toggleMenu(project.id);
                        }}
                      >
                        &#x22EE;
                      </button>
                      {menuVisible === project.id ? (
                        <div
                          ref={(ref) => (menuRefs.current[project.id] = ref)}
                          className={styles.menu}
                        >
                          <button
                            onClick={function () {
                              handleEditProjectClick(project);
                            }}
                          >
                            수정하기
                          </button>
                          <button
                            onClick={function () {
                              handleDelete(project.id);
                            }}
                          >
                            삭제하기
                          </button>
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
        currentPage0={currentPage0}
        totalElements={totalElements}
        pageSize={pageSize}
        onPageChange0={(page0) => updateQuery({ page: page0 + 1 })}
      />
    </div>
  );
}

export default ProjectPageLayout;
