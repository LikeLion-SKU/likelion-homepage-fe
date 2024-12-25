import React from "react";
import { useParams, useLocation } from "react-router-dom";
import projects from "./ProjectData.jsx";
import styles from "./styles/ProjectDetail.module.css";

function ProjectDetail() {
  const { projectId } = useParams(); // URL 파라미터로부터 projectId 가져오기
  const location = useLocation(); // 전달받은 state 데이터 접근
  const { tags } = location.state || {}; // tags를 전달받음
  const project = projects.find(function (p) {
    return p.id.toString() === projectId;
  });

  return (
    <div className={styles.projectDetail}>
      <img src={project.image} alt={project.name} className={styles.image} />
      <h1 className={styles.title}>{project.name}</h1>

      <div className={styles.tags}>
        {project.tags.map(function (tag, idx) {
          return (
            <span key={idx} className={styles.tag} data-type={tag}>
              {tag}
            </span>
          );
        })}
      </div>
      <div className={styles.separator}></div>

      <div className={styles.contentContainer}>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.teamBox}>
        {Object.entries(project.teamMembers).map(([role, members]) => (
          <div key={role} className={styles.teamRole}>
            <span className={styles.role}>{role}</span>
            <div className={styles.memberRow}>
              {members.split(" ").map((member, idx) => ( // 문자열을 배열로 변환
                <span key={idx} className={styles.member}>
                  {member}
                </span>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
