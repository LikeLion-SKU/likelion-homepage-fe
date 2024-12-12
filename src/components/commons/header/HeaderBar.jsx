import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./HeaderBar.module.css";
import logo from '@svgs/logo.svg';
import login from "@svgs/login.svg";
import menuIcon from '@svgs/menu_hamburger.svg';
import closeIcon from '@svgs/menu_close.svg';

export default function HeaderBar({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <section className={styles.section}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { isMenuOpen, toggleMenu, closeMenu });
      })}
    </section>
  );
}

function Logo({ closeMenu }) {
  const navigate = useNavigate();
  
  return (
    <button className={styles.logo} onClick={() => { navigate('/'); closeMenu(); }}>
      <img src={logo} alt="Logo" />
      멋쟁이사자처럼
    </button>
  );
}

function Navbar({ children, isMenuOpen, closeMenu }) {
  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles.active : ''}`}>
      <ul>
        {React.Children.map(children, child => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child, { closeMenu });
        })}
      </ul>
    </nav>
  );
}

function NavItem({ label, path, closeMenu }) {
  const navigate = useNavigate();

  return (
    <li>
      <button className={styles.navbarBtn} onClick={() => { navigate(path); closeMenu(); }}>
        {label}
      </button>
    </li>
  );
}

function Login({ closeMenu }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
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
  );
}

function MenuIcon({ isMenuOpen, toggleMenu }) {
  return (
    <button className={styles.menuIcon} onClick={toggleMenu}>
      <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu" />
    </button>
  );
}

HeaderBar.Logo = Logo;
HeaderBar.Navbar = Navbar;
HeaderBar.NavItem = NavItem;
HeaderBar.Login = Login;
HeaderBar.MenuIcon = MenuIcon;