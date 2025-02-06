import styles from './DeadLineEditingContainerLayout.module.css';

export default function DeadLineEditingContainerLayout({ children }) {
  return <div className={styles['dead-line-editing-container']}>{children}</div>;
}
