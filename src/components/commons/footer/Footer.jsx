import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import styles from './Footer.module.css';
import logo from '@svgs/logo_horizon.svg';
import instagram from '@svgs/instagram.svg';
import github from '@svgs/github.svg';

export default function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  function handleClick() {
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount + 1 === 3) {
      navigate("/admin");
    }
  };


  return (
    <div className={styles.wrapper}>
      <img
        src={logo}
        alt="logo"
        onClick={handleClick}
      />
      <li>
        <a
          href="https://www.instagram.com/likelion_skuniv"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={instagram} alt="instagram" />{' '}
        </a>
        <a
          href="https://github.com/LikeLion-SKU"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="github" />{' '}
        </a>
      </li>
      <p>© 2024 SKU LIKELION. All rights reserved.</p>
    </div>
  );
}
