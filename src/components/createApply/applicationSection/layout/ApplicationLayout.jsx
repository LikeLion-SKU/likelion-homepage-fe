import styles from './ApplicationLayout.module.css';

export default function ApplicationLayout({ children }) {
  return <div className={styles['application-layout-container']}>{children}</div>;
}
