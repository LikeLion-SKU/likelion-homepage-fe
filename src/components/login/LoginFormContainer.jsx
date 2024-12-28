import styles from './LoginFormContainer.module.css';

export default function LoginFormContainer({ children }) {
  return <div className={styles['container']}>{children}</div>;
}
