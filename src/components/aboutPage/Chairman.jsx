import styles from "../../styles/aboutPage/aboutPage.module.css";
import Card from "./Card";

export default function Chairman() {
    return (
        <div className={styles.allContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>멋사인</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.btn}>LIKELION 12TH</button>
                    <button className={styles.btn}>LIKELION 13TH</button>
                    <button className={styles.btn}>LIKELION 14TH</button>
                    <div className={styles.editBtnContainer}>
                        <button className={styles.editBtn}>편집하기</button>
                    </div>
                </div>
            </div>
            <div className={styles.chairmanContainer}>
                <div className={styles.chairman}>
                    <q className={styles.mainText}>회장</q>
                    <Card />
                </div>
                <div className={styles.chairman}>
                    <q className={styles.mainText}>부회장</q>
                    <Card />
                </div>
            </div>
        </div>
    )
}