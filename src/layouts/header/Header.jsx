import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Header.module.css';
import logo from "@svgs/logo.svg";
import login from "@svgs/login.svg";
import menuIcon from "@svgs/menu_hamburger.svg";
import closeIcon from "@svgs/menu_close.svg";
import AboutPage from '@pages/AboutPage';
import ProjectPage from '@pages/ProjectPage';
import RecruitPage from '@pages/RecruitPage';
import LoginPage from '@pages/LoginPage';

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 토글 상태

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigate = useNavigate();
    const currentPage = localStorage.getItem("currentPage");
    const [navPage, setNavPage] = useState(currentPage);
    
    const handleMoveToHome = () => {
        localStorage.setItem("currentPage", "home");
        navigate(`/home`);
        setNavPage("home");
    };
    const handleMoveToAbout = () => {
        localStorage.setItem("currentPage", "about");
        navigate(`/about`);
        setNavPage("about");
    };
    const handleMoveToProject = () => {
        localStorage.setItem("currentPage", "project");
        navigate(`/project`);
        setNavPage("project");
    };
    const handleMoveToRecruit = () => {
        localStorage.setItem("currentPage", "recruit");
        navigate(`/recruit`);
        setNavPage("recruit");
    };
    const handleMoveToLogin = () => {
        localStorage.setItem("currentPage", "login");
        navigate(`/login`);
        setNavPage("login");
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo} onClick={handleMoveToHome}>
                <button><img src={logo} alt="Logo"/>멋쟁이사자처럼</button>
            </div>
            <nav className={`${styles.navbar} ${isMenuOpen ? styles.active : "null"}`}>
                <ul>
                    <li><button onClick={handleMoveToAbout}>알아보기</button></li>
                    <li><button onClick={handleMoveToProject}>프로젝트</button></li>
                    <li><button onClick={handleMoveToRecruit}>지원하기</button></li>
                    <li><button onClick={handleMoveToLogin}>로그인</button></li>
                </ul>
            </nav>
            <button className={styles.menuIcon} onClick={toggleMenu}>
                <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu" />
            </button>
        </div>
    );
};

export default Header; 
