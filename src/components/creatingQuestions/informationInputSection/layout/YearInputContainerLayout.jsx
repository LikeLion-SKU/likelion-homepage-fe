import styles from './YearInputContainerLayout.module.css';

export default function YearInputContainerLayout({ children }) {
  return <div className={styles['year-input-container']}>{children}</div>;
}
