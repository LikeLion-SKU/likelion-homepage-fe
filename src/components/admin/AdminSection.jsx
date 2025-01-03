import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminSection.module.css";

export default function AdminSection() {
  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <p className={styles.title}>
      관리자님 <br/>
      안녕하세요 </p>
      <p className={styles.text}>admin1234@skuniv.ac.kr</p>
      <div className={styles.btndiv}>
        <button
          className={styles.button}
          onClick={() => navigate("/admin/create")}>
          지원서 생성하기
        </button>
        <button 
          className={styles.button} 
          onClick={() => navigate("/admin/apply")}>
          지원서 모아보기
        </button>
        <button
          className={styles.button}
          onClick={() => navigate("/")}>
          프로젝트 편집하기
        </button>        
        <button
          className={styles.button}
          onClick={() => navigate("/")}>
          멋사인 편집하기
        </button>
      </div>
    </div>
  );
}
