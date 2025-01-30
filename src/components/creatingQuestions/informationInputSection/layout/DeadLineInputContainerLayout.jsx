import styles from './DeadLineInputContainerLayout.module.css';

export default function DeadLineInputContainerLayout({ children }) {
  return <div className={styles['dead-line-input-container']}>{children}</div>;
}
