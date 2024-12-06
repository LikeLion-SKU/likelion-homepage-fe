import styles from "../../styles/aboutPage/card.module.css";
import profileImage from "../../assets/svgs/ex.svg";

export default function Card() {
    return(
        <>
            <div className={styles.cardContainer}>
                <img src={profileImage} alt="프로필 이미지" className={styles.img} />
                <div className={styles.infoContainer}>
                    <p className={styles.subInfo}>컴퓨터 공학과 22학번</p>
                    <p className={styles.name}>김땡땡</p>
                </div>
            </div>
        </>
    )
}