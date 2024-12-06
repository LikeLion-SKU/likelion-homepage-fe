import styles from "../../styles/recruitPage/requirements.module.css"

export default function Requirements() {
    const steps = [
        { label: '1. 멋사 활동에 적극적으로 참여하실 분' },
        { label: '2. 개인 노트북은 필수입니다.' },
        { label: '3. 매주 월요일 6시 세션이 있습니다.' },
        { label: '4. 멋사 활동에 3회 불참시 수료증이 나오지 않습니다.' },
        { label: '5. 또 뭐를 적으면 좋을까용' },
    ];

    return (
        <div id="requirementSection" className={styles.allContainer}>
            <p className={styles.title}>요구조건</p>
            {steps.map((step, index) => (
                <div key={index}>
                    <div className={styles.label}>{step.label}</div>
                </div>
            ))}
        </div>
    )
}