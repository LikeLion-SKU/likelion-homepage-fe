import { useState } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/ProjectPageLayout.module.css";
import CustomDropdown from "./CustomDropdown.jsx";
import projects from "./ProjectData.jsx";
import plusbtn from "../../assets/svgs/plusbtn.svg";
import Pagination from "./Pagination.jsx"; // 새로 만든 페이징 컴포넌트 가져오기

const ITEMS_PER_PAGE = 6; // 한 페이지에 표시할 프로젝트 수

function ProjectPageLayout({ isAdmin }) {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [menuVisible, setMenuVisible] = useState(null); // 메뉴 표시 상태 관리
  const menuRefs = useRef({}); // 각 프로젝트 메뉴별 참조 객체
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      const currentRef = menuRefs.current[menuVisible];
      if (menuVisible && currentRef && !currentRef.contains(event.target)) {
        setMenuVisible(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  // 페이지네이션에 맞게 표시할 프로젝트 계산
  function getPaginatedProjects() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return projects.slice(startIndex, endIndex);
  }

  // 총 페이지 수 계산
  function getTotalPages() {
    return Math.ceil(projects.length / ITEMS_PER_PAGE);
  }

  // 태그 선택 변경 핸들러
  function handleTagChange(selectedOption) {
    setSelectedTag(selectedOption);
    setCurrentPage(1); // 태그 변경 시 첫 페이지로 이동
  }

  // 카드 클릭 핸들러
  function handleCardClick(projectId) {
    const projectTags =
      projects.find(function (project) {
        return project.id === projectId;
      })?.tags || [];
    navigate(`/project/${projectId}`, { state: { tags: projectTags } });
  }

  function toggleMenu(projectId) {
    setMenuVisible((prev) => (prev === projectId ? null : projectId));
  }

  function handleEdit(projectId) {
    const project = projects.find((p) => p.id === projectId); // 수정할 프로젝트 데이터 찾기
    if (project) {
      navigate("/project/admin/edit", { state: { project } }); // 데이터와 함께 경로 이동
    }
  }  

  function handleDelete(projectId) {
    console.log("Deleting project with ID:", projectId); // 확인용 로그
    const confirmDelete = window.confirm("프로젝트가 삭제됩니다.");
    if (confirmDelete) {
      // 삭제 로직 추가
      console.log(`Project with ID: ${projectId} deleted.`);
    }
  }

  return (
    <div className={styles.projectPage}>
      <p className={styles.title}>프로젝트</p>
      <div className={styles.controls}>
        {isAdmin && (
          <img
            src={plusbtn}
            alt="Add Project"
            className={styles.addButtonImage}
            onClick={function () {
              navigate("/project/admin/add");
            }}
          />
        )}
        <div className={styles.selectBoxContainer}>
          <CustomDropdown
            options={["전체 프로젝트", "중앙해커톤", "아이디어톤", "자체프로젝트"]}
            defaultOption="전체 프로젝트"
            onSelect={() => {}} // 선택 이벤트는 동작하지 않음
          />
        </div>
      </div>
      <div className={styles.grid}>
        {getPaginatedProjects().length > 0 ? (
          getPaginatedProjects().map((project) => (
            <div key={project.id} className={styles.card}>
              <div onClick={() => handleCardClick(project.id)}>
                <img src={project.image} alt={project.title} className={styles.image} />
                <p className={styles.name}>{project.name}</p>
                <p className={styles.description}>
                  {project.description.length > 50
                    ? `${project.description.slice(0, 50)}...`
                    : project.description}
                </p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.tags}>
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className={`${styles.tag} ${styles[tag]}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                {isAdmin && (
                  <div className={styles.menuContainer}>
                    <button
                      className={styles.menuButton}
                      onClick={() => toggleMenu(project.id)}
                    >
                      &#x22EE;
                    </button>
                    {menuVisible === project.id && (
                      <div 
                      ref={(ref) => (menuRefs.current[project.id] = ref)}
                      className={styles.menu}
                      >
                        <button onClick={() => handleEdit(project.id)}>수정하기</button>
                        <button onClick={() => handleDelete(project.id)}>삭제하기</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noProjects}>프로젝트가 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 컴포넌트 사용 */}
      <Pagination
        currentPage={currentPage}
        totalPages={getTotalPages()}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ProjectPageLayout;
