import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPageSection.module.css";

export default function MyPageSection() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className={styles.section}>
      <p className={styles.title}>
      {username}ㅇㅇㅇ님 <br/>
      안녕하세요 </p>
      <p className={styles.text}>test1234@skuniv.ac.kr</p>
      <div className={styles.btndiv}>
        <button
          className={styles.button}
          onClick={() => navigate("/application")}>
          내 지원서 보러가기
        </button>
        <button 
          className={styles.button} 
          onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
