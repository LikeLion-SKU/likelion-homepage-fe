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
        COMING SOON
      </motion.p>
      <motion.p
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        14기 홈페이지
        <br />
        리뉴얼 중
      </motion.p>
      <motion.div
        className={styles.divider}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      />
    </section>
  );
}
