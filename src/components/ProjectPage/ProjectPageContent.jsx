import React, { useState } from "react";
import styles from "./styles/ProjectPageContent.module.css";
import CustomDropdown from "./CustomDropdown.jsx";
import projectImage from "../../assets/project_image.jpg";
import plusbtn from "../../assets/svgs/plusbtn.svg";

const ProjectPageContent = ({ isAdmin }) => {
  const [selectedTag, setSelectedTag] = useState("전체 프로젝트");

  // 프로젝트 데이터 생성
  const projects = Array(9)
    .fill(null)
    .map((_, index) => ({
      id: index + 1, // 고유한 id 생성
      name: `2024 서경대학교 대동제 축제 안내 페이지 ${index + 1}`,
      description:
        "축제 안내 웹페이지입니다. 축제 안내 웹페이지입니다. 축제 안내 웹페이지입니다. 축제 안내 웹페이지입니다. 축제 안내 웹페이지입니다.",
      tags: ["자체 프로젝트"],
      image: projectImage,
    }));

  const filteredProjects =
    selectedTag === "전체 프로젝트"
      ? projects
      : projects.filter((project) => project.tags.includes(selectedTag));

  // 드롭다운에서 선택된 값을 처리
  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption); // 선택된 값을 상태로 업데이트
  };

  // 태그 스타일 결정 함수
  const getTagStyle = (tag) => {
    switch (tag) {
      case "자체 프로젝트":
        return { backgroundColor: "#F5E0E9", color: "#000" };
      case "아이디어톤":
        return { backgroundColor: "#FDECC8", color: "#000" };
       case "중앙해커톤":
        return { backgroundColor: "#DBEDDB", color: "#000" };
      default:
        return { backgroundColor: "#f0f0f0", color: "#000" };
    }
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
            <div key={project.id} className={styles.card}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.image}
              />
              <p className={styles.name}>{project.name}</p>
              <p className={styles.description}>{project.description}</p>
              <div className={styles.tags}>
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={styles.tag}
                    style={getTagStyle(tag)} 
                  >                    
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noProjects}>프로젝트가 없습니다.</p> /* 메시지 표시 */
        )}
      </div>
    </div>
  );
};

export default ProjectPageContent;
