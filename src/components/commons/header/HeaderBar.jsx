import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderBar.module.css';
import logo from '@assets/commons/logo.webp';
import login from '@assets/header/login.webp';
import menuIcon from '@assets/header/menu_hamburger.webp';
import closeIcon from '@assets/header/menu_close.webp';

const HeaderBarContext = createContext();

export default function HeaderBar({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // 새로고침 없이 로그인 <-> 마이페이지
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key) {
      originalSetItem.apply(this, arguments);
      if (key === 'token') {
        checkLoginStatus();
      }
    };

    const originalRemoveItem = localStorage.removeItem;
    localStorage.removeItem = function (key) {
      originalRemoveItem.apply(this, arguments);
      if (key === 'token') {
        checkLoginStatus();
      }
    };

    return () => {
      localStorage.setItem = originalSetItem;
      localStorage.removeItem = originalRemoveItem;
    };
  }, []);

  return (
    <div className={styles.section}>
      <HeaderBarContext.Provider value={{ isMenuOpen, toggleMenu, closeMenu, isLoggedIn, setIsLoggedIn }}>
        {children}
      </HeaderBarContext.Provider>
    </div>
  );
}

function Logo() {
  const navigate = useNavigate();
  const { closeMenu } = useContext(HeaderBarContext);

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

function Navbar({ children }) {
  const { isMenuOpen } = useContext(HeaderBarContext);

  return (
    <nav className={`${styles.navbar} ${isMenuOpen ? styles.active : ''}`}>
      <ul>{children}</ul>
    </nav>
  );
}

function NavItem({ label, path }) {
  const navigate = useNavigate();
  const { closeMenu } = useContext(HeaderBarContext);

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

function Login() {
  const navigate = useNavigate();
  const { closeMenu, isLoggedIn } = useContext(HeaderBarContext);

  return (
    <li>
      <button
        className={styles.loginBtn}
        onClick={() => {
          navigate(isLoggedIn ? '/mypage' : '/login');
          closeMenu();
        }}
      >
        <div className={styles.loginBtn__imgbox}>
          <img
            src={login}
            alt={isLoggedIn ? '마이페이지' : '로그인'}
          />
        </div>
        <p>{isLoggedIn ? '마이페이지' : '로그인'}</p>
      </button>
    </li>
  );
}

function MenuIcon() {
  const { isMenuOpen, toggleMenu } = useContext(HeaderBarContext);
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
