import styles from "../../styles/aboutPage/aboutPage.module.css";
import Card from "./Card";

export default function Section02() {
    return (
        <div className={styles.allContainer}>
            <div className={styles.managementContainer}>
                <q className={styles.mainText}>운영진</q>
                <Card />
            </div>
        </div>
    )
}