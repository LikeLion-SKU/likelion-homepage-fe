import styles from "../../styles/resultPage/checkResult.module.css";

export default function CheckResult() {
    return (
        <>
        <div className={styles.allContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.mainTitle}>지원 결과 확인하기</p>
            </div>
            <div className={styles.contentContainer}>
                <p className={styles.content}>지원에 감사드립니다.</p>
                <p className={styles.content}>아래 번호를 입력해 결과를 확인해주세요!</p>
            </div>
            <div className={styles.inputContainer}>
                <input className={styles.input} placeholder="   번호를 입력해주세요" />
                <button className={styles.checkButton}>확인하기</button>
            </div>
        </div>
        </>
    )
}