import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './MyPage.module.css';

export default function MyPage({ children }) {
  return <section className={styles.section}>{children}</section>;
}

function MyPageTitle() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  return (
    <p className={styles.title}>
      {username}ㅇㅇㅇ님 <br/>
      안녕하세요 </p>
  )
}

function MyPageText() {
  return (
    <p className={styles.text}>test1234@skuniv.ac.kr</p>
  )
}

function MyPageItemBox({ children }) {
  return <div className={styles.itembox}>{children}</div>;
}

function MyPageApply() {
  const navigate = useNavigate();

  return (
    <button
      className={styles.button}
      onClick={() => navigate("/application")}>
      내 지원서 보러가기
    </button>
  )
}

function MyPageLogout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <button
      className={styles.button}
      onClick={handleLogout}>
      로그아웃
    </button>
  )
}

MyPage.Title = MyPageTitle;
MyPage.Text = MyPageText;
MyPage.ItemBox = MyPageItemBox;
MyPage.Apply = MyPageApply;
MyPage.Logout = MyPageLogout;
