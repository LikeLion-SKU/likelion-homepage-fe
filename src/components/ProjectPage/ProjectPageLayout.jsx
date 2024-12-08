import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/ProjectPageLayout.module.css";
import CustomDropdown from "./CustomDropdown.jsx";
import projects from "./ProjectData.jsx";
import plusbtn from "../../assets/svgs/plusbtn.svg";
import Pagination from "./Pagination.jsx"; // 새로 만든 페이징 컴포넌트 가져오기

const ITEMS_PER_PAGE = 6; // 한 페이지에 표시할 프로젝트 수

function ProjectPageLayout({ isAdmin }) {
  const [selectedTag, setSelectedTag] = useState("전체 프로젝트");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const navigate = useNavigate();

  // 선택된 태그에 따라 필터링된 프로젝트 가져오기
  function getFilteredProjects() {
    if (selectedTag === "전체 프로젝트") {
      return projects;
    } else {
      return projects.filter(function (project) {
        return project.tags.includes(selectedTag);
      });
    }
  }

  // 페이지네이션에 맞게 표시할 프로젝트 계산
  function getPaginatedProjects() {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return getFilteredProjects().slice(startIndex, endIndex);
  }

  // 총 페이지 수 계산
  function getTotalPages() {
    return Math.ceil(getFilteredProjects().length / ITEMS_PER_PAGE);
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
              navigate("/project/admin/project");
            }}
          />
        )}
        <div className={styles.selectBoxContainer}>
          <CustomDropdown
            options={["전체 프로젝트", "중앙해커톤", "아이디어톤", "자체프로젝트"]}
            defaultOption="전체 프로젝트"
            onSelect={handleTagChange}
          />
        </div>
      </div>
      <div className={styles.grid}>
        {getPaginatedProjects().length > 0 ? (
          getPaginatedProjects().map(function (project) {
            return (
              <div
                key={project.id}
                className={styles.card}
                onClick={function () {
                  handleCardClick(project.id);
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                />
                <p className={styles.name}>{project.name}</p>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map(function (tag, idx) {
                    return (
                      <span
                        key={idx}
                        className={`${styles.tag} ${styles[tag]}`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })
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
