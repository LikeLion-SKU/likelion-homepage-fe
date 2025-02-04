import styles from './PasswordFindContainer.module.css';

export default function PasswordFindContainer({ children }) {
  return <div className={styles['container']}>{children}</div>;
}
