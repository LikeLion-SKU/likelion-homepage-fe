import { motion } from 'framer-motion';
import styles from './RenewalBanner.module.css';

export default function RenewalBanner() {
  return (
    <section className={styles.section}>
      <motion.p
        className={styles.badge}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        NOTICE
      </motion.p>

      <motion.p
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        현재 사용하지 않는 사이트입니다.
        <br />
        아래 링크를 통해 새로운 홈페이지로 이동해주세요.
      </motion.p>

      <motion.div
        className={styles.divider}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />

      <motion.p
        className={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        LIKELION SKUNIV. New Website
      </motion.p>

      <motion.a
        href='https://skulikelion.site'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.link}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        skulikelion.site
      </motion.a>
    </section>
  );
}
