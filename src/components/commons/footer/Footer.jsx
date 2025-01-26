import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Footer.module.css';
import logo from '@assets/footer/logo_horizon.webp';
import email from '@assets/footer/email.webp';
import instagram from '@assets/footer/instagram.webp';
import github from '@assets/footer/github.webp';

export default function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  function handleClick() {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === 3) {
        navigate('/admin');
        return 0;
      }

      return newCount;
    });
  }

  return (
    <div className={styles.wrapper}>
      <img
        src={logo}
        alt='logo'
        onClick={handleClick}
      />
      <li>
        <a
          href='mailto:skuofficial@likelion.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src={email}
            alt='email'
          />
        </a>
        <a
          href='https://www.instagram.com/likelion_skuniv'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src={instagram}
            alt='instagram'
          />
        </a>
        <a
          href='https://github.com/LikeLion-SKU'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src={github}
            alt='github'
          />
        </a>
      </li>
      <p>© 2024 SKU LIKELION. All rights reserved.</p>
    </div>
  );
}
