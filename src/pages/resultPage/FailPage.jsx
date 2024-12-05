import styles from "../../styles/resultPage/failPage.module.css";

export default function FailPage() {
    return (
        <>
            <div className={styles.allContainer}>
                <div className={styles.titleContainer}>
                    <p className={styles.subTitle}>LIKELION 13TH</p>
                    <p className={styles.mainTitle}>불합격함.</p>
                </div>
                <div className={styles.contentContainer}>
                    <p className={styles.content}>
                        <span className={styles.spanStyle}>박성연</span>
                        님, 지원해주셔서 감사한데
                    </p>
                    <p className={styles.content}>
                        다음기회에 만나요
                    </p>
                    <p className={styles.content}>
                        더 할말 있을까?
                    </p>
                    <p className={styles.content}>
                        일단 네줄 정도...
                    </p>
                </div>
            </div>
        </>
    );
}
