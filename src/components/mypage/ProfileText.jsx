import styles from './MyPage.module.css';

export default function ProfileText({ username, useremail }) {
  return (
    <div className={styles.textContainer}>
      <p className={styles.title}>
        {username}님 <br />
        안녕하세요
      </p>
      <p className={styles.text}>{useremail}</p>
    </div>
  );
}
