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
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={styles.section}>
      <HeaderBarContext.Provider value={{ isMenuOpen, toggleMenu, closeMenu }}>{children}</HeaderBarContext.Provider>
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { closeMenu } = useContext(HeaderBarContext);

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
