import styles from './PasswordChangeContainer.module.css';

export default function PasswordChangeContainer({ children }) {
  return <div className={styles['container']}>{children}</div>;
}
