import styles from "../../styles/resultPage/passPage.module.css";

export default function PassPage() {
    return (
        <>
        <div className={styles.allContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.subTitle}>LIKELION 13TH</p>
                <p className={styles.mainTitle}>🎉 합격을 축하드립니다 🎉</p>
            </div>
            <div className={styles.contentContainer}>
                <p className={styles.content}>
                    <span className={styles.spanStyle}>박성연</span>
                    님, 합격하셨습니다.
                </p>
                <p className={styles.content}>
                    010-9425-9537로 카톡 부탁드립니다...?
                </p>
            </div>
        </div>
        </>
    );
}
