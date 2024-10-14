import React, { useState } from 'react';
import styles from './Header.module.css';
import logo from "@svgs/logo.svg";
import login from "@svgs/login.svg";
import menuIcon from "@svgs/menu_hamburger.svg";
import closeIcon from "@svgs/menu_close.svg";

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 토글 상태

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <button><img src={logo} alt="Logo" />멋쟁이사자처럼</button>
            </div>
            <nav className={`${styles.navbar} ${isMenuOpen ? styles.active : ""}`}>
                <ul>
                    <li><button>알아보기</button></li>
                    <li><button>프로젝트</button></li>
                    <li><button>지원하기</button></li>
                    <li><button>로그인</button></li>
                </ul>
            </nav>
            <button className={styles.menuIcon} onClick={toggleMenu}>
                <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu" />
            </button>
        </div>
    );
};

export default Header; 
