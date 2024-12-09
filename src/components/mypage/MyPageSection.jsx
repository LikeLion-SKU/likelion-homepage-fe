import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPageSection.module.css";
import heartLion from "@images/heartLion.png";

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
      <p className={styles.title}>마이페이지</p>
      <img className={styles.lionImg} src={heartLion} alt="Heart Lion" />
      <p className={styles.text}>
        안녕하세요 <strong>{username}</strong>님
      </p>
      <button
        className={styles.button}
        onClick={() => navigate("/application")}
      >
        내 지원서 보러가기
      </button>
      <button className={styles.button} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
