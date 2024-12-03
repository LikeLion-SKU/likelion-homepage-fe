import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '@svgs/logo.svg';
import menuIcon from '@svgs/menu_hamburger.svg';
import closeIcon from '@svgs/menu_close.svg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 토글 상태

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <button>
          <img src={logo} alt="Logo" />
          멋쟁이사자처럼
        </button>
      </div>
      <nav
        className={`${styles.navbar} ${isMenuOpen ? styles.active : 'null'}`}
      >
        <ul>
          <li>
            <button onClick={() => navigate('about')}>알아보기</button>
          </li>
          <li>
            <button onClick={() => navigate('project')}>프로젝트</button>
          </li>
          <li>
            <button onClick={() => navigate('recruit')}>지원하기</button>
          </li>
          <li>
            <button onClick={() => navigate('login')}>로그인</button>
          </li>
        </ul>
      </nav>
      <button className={styles.menuIcon} onClick={toggleMenu}>
        <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu" />
      </button>
    </div>
  );
}
