import React from 'react';
import styles from './Footer.module.css';
import HomePage from '../../pages/HomePage';
import logo from '@svgs/logo_horizon.svg';
import instagram from '@svgs/instagram.svg';
import github from '@svgs/github.svg';

export default function Footer() {
  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="logo" onClick={HomePage} />
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
