import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '@svgs/logo.svg';
import login from "@svgs/login.svg";
import menuIcon from '@svgs/menu_hamburger.svg';
import closeIcon from '@svgs/menu_close.svg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // 토큰 확인
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo} onClick={() => { navigate('/'); closeMenu(); }}>
        <button>
          <img src={logo} alt="Logo" />
          멋쟁이사자처럼
        </button>
      </div>
      <nav
        className={`${styles.navbar} ${isMenuOpen ? styles.active : ''}`}
      >
        <ul>
          <li>
            <button className={styles.navbarBtn} 
            onClick={() => { navigate('about'); closeMenu(); }}>알아보기</button>
          </li>
          <li>
            <button className={styles.navbarBtn} 
            onClick={() => { navigate('project'); closeMenu(); }}>프로젝트</button>
          </li>
          <li>
            <button className={styles.navbarBtn} 
            onClick={() => { navigate('recruit'); closeMenu(); }}>지원하기</button>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                className={styles.loginBtn}
                onClick={() => { navigate('mypage'); closeMenu(); }}
              >
                <img className={styles.loginImg} src={login} alt="마이페이지" />
                마이페이지
              </button>
            ) : (
              <button
                className={styles.loginBtn}
                onClick={() => { navigate('login'); closeMenu(); }}
              >
                <img className={styles.loginImg} src={login} alt="로그인" />
                로그인
              </button>
            )}
          </li>
        </ul>
      </nav>
      <button className={styles.menuIcon} onClick={toggleMenu}>
        <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu" />
      </button>
    </div>
  );
}
