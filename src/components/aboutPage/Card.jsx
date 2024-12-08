import styles from "../../styles/aboutPage/card.module.css";
import DefaultImage from "../../assets/aboutPage/ghost.svg";

export default function Card({ profileImage, department, name }) {

    return (
        <div className={styles.cardContainer}>
            <img 
                src={profileImage || DefaultImage} 
                alt={`${name} 프로필`} 
                className={styles.img} 
            />
            <div className={styles.infoContainer}>
                <p className={styles.subInfo}>{department}</p>
                <p className={styles.name}>{name}</p>
            </div>
        </div>
    );
}
