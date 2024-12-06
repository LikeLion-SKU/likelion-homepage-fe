import styles from "../../styles/aboutPage/aboutPage.module.css";
import Card from "./Card";

export default function Babylion() {
    return (
        <div className={styles.allContainer}>
            <div className={styles.babylionContainer}>
                <q className={styles.mainText}>아기사자</q>
                <Card />
            </div>
        </div>
    )
}