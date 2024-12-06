import styles from "../../styles/recruitPage/schedule.module.css";

export default function Schedule() {
    const steps = [
        { label: '1차 서류 모집', date: '25.00.00 - 25.00.00' },
        { label: '1차 합격자 발표', date: '25.00.00' },
        { label: '2차 면접', date: '25.00.00 - 25.00.00' },
        { label: '2차 합격자 발표', date: '25.00.00' },
        { label: '서경대 멋사 OT', date: '25.00.00' },
    ];

    return (
        <div id="scheduleSection" className={styles.allContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>모집 일정</p>
            </div>
            <div className={styles.scheduleContainer}>
                <p className={styles.mainText}>합격자는 서경대 멋사 사이트에서 발표됩니다.</p>
                <p className={styles.mainText}>잊지 말고 꼭 확인해주세요.</p>
                <div className={styles.timelineContainer}>
                    <div className={styles.line}></div>
                    {steps.map((step, index) => (
                        <div key={index} className={styles.step}>
                            <div className={styles.circle}></div>
                            <div className={styles.label}>{step.label}</div>
                            <div className={styles.date}>{step.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
