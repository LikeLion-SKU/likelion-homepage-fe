import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderBar.module.css';
import logo from '@assets/commons/logo.webp';
import login from '@assets/header/login.webp';
import menuIcon from '@assets/header/menu_hamburger.webp';
import closeIcon from '@assets/header/menu_close.webp';

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
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { isMenuOpen, toggleMenu, closeMenu });
      })}
    </section>
  );
}

function Logo({ closeMenu }) {
  const navigate = useNavigate();

  return (
    <button
      className={styles.logoBtn}
      onClick={() => {
        navigate('/');
        closeMenu();
      }}
    >
      <div className={styles.logoBtn__imgbox}>
        <img
          src={logo}
          alt='Logo'
        />
      </div>
      <p>멋쟁이사자처럼</p>
    </button>
  );
}

function Navbar({ children, isMenuOpen, closeMenu }) {
  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles.active : ''}`}>
      <ul>
        {React.Children.map(children, (child) => {
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
      <button
        className={styles.navbarBtn}
        onClick={() => {
          navigate(path);
          closeMenu();
        }}
      >
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
          onClick={() => {
            navigate('mypage');
            closeMenu();
          }}
        >
          <div className={styles.loginBtn__imgbox}>
            <img
              src={login}
              alt='마이페이지'
            />
          </div>

          <p>마이페이지</p>
        </button>
      ) : (
        <button
          className={styles.loginBtn}
          onClick={() => {
            navigate('login');
            closeMenu();
          }}
        >
          <div className={styles.loginBtn__imgbox}>
            <img
              src={login}
              alt='로그인'
            />
          </div>
          <p>로그인</p>
        </button>
      )}
    </li>
  );
}

function MenuIcon({ isMenuOpen, toggleMenu }) {
  return (
    <button
      className={styles.menuIcon}
      onClick={toggleMenu}
    >
      <img
        src={isMenuOpen ? closeIcon : menuIcon}
        alt='Menu'
      />
    </button>
  );
}

HeaderBar.Logo = Logo;
HeaderBar.Navbar = Navbar;
HeaderBar.NavItem = NavItem;
HeaderBar.Login = Login;
HeaderBar.MenuIcon = MenuIcon;
