import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/ProjectPageLayout.module.css";
import CustomDropdown from "./CustomDropdown.jsx";
import projects from "./ProjectData.jsx";
import plusbtn from "../../assets/svgs/plusbtn.svg";

const ProjectPageLayout = ({ isAdmin }) => {
  const [selectedTag, setSelectedTag] = useState("전체 프로젝트");
  const navigate = useNavigate();

  const filteredProjects =
    selectedTag === "전체 프로젝트"
      ? projects
      : projects.filter((project) => project.tags.includes(selectedTag));

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption); // 선택된 값을 상태로 업데이트
  };

  const handleCardClick = (projectId) => {
    const projectTags = projects.find((project) => project.id === projectId)?.tags || [];
    navigate(`/project/${projectId}`, { state: { tags: projectTags } }); // tags 데이터를 함께 전달
  };
  

  return (
    <div className={styles.projectPage}>
      <p className={styles.title}>프로젝트</p>
      <div className={styles.controls}>
        {isAdmin && (
          <img
            src={plusbtn}
            alt="Add Project"
            className={styles.addButtonImage}
          />
        )}
        <div className={styles.selectBoxContainer}>
          <CustomDropdown
            options={["전체 프로젝트", "중앙해커톤", "아이디어톤", "자체 프로젝트"]}
            defaultOption="전체 프로젝트"
            onSelect={handleTagChange}
          />
        </div>
      </div>
      <div className={styles.grid}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className={styles.card}
              onClick={()=>handleCardClick(project.id)}
            >
              <img
                src={project.image}
                alt={project.title}
                className={styles.image}
              />
              <p className={styles.name}>{project.name}</p>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag, idx) => (
                  <span key={idx} className={`${styles.tag} ${styles[tag]}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noProjects}>프로젝트가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectPageLayout;
