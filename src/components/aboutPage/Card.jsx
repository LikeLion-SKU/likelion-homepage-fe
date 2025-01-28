import styles from './card.module.css';

export default function Card({ profileImage, department, studentId, name }) {
  const formattedStudentId =
    studentId && studentId.toString().length === 10 ? studentId.toString().slice(2, 4) + '학번' : '';
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  return (
    <div className={styles.cardContainer}>
      <img
        src={`${apiUrl}${profileImage}`}
        alt={`${name} 프로필`}
        className={styles.img}
      />
      <div className={styles.infoContainer}>
        <p className={styles.subInfo}>
          {department} {formattedStudentId}
        </p>
        <p className={styles.name}>{name}</p>
      </div>
    </div>
  );
}
