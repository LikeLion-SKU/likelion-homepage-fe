import styles from './SignupContainer.module.css';

export default function SignupContainer({ children }) {
  return <div className={styles['container']}>{children}</div>;
}
