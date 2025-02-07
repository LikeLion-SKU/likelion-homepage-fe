import styles from './ApplicationStateHeading.module.css';

export default function ApplicationStateHeading({ title }) {
  return <h3 className={styles['heading']}>{title}</h3>;
}
