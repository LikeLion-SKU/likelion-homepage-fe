import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Footer.module.css';
import logo from '@assets/footer/logo_horizon.webp';
import email from '@assets/footer/email.webp';
import instagram from '@assets/footer/instagram.webp';
import github from '@assets/footer/github.webp';

export default function Footer() {
  const clickCount = useRef(0);
  const navigate = useNavigate();

  function handleClick() {
    clickCount.current += 1;

    if (clickCount.current === 3) {
      window.gtag('event', 'admin_access', {
        event_category: 'hidden_feature',
        event_label: 'logo_triple_click',
      });
      navigate('/admin');
      clickCount.current = 0;
    }
  }

  function handleSocialClick(platform) {
    window.gtag('event', 'social_click', {
      event_category: 'social',
      event_label: platform,
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
          onClick={() => handleSocialClick('email')}
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
          onClick={() => handleSocialClick('instagram')}
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
          onClick={() => handleSocialClick('github')}
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
