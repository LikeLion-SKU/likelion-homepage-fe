import styles from './YearEditingContainerLayout.module.css';

export default function YearEditingContainerLayout({ children }) {
  return <div className={styles['year-editing-container']}>{children}</div>;
}
