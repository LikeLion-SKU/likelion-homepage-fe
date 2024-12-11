import styles from "../../styles/recruitPage/requirements.module.css"

export default function Requirements() {
    const steps = [
        { label: '1. 서경대학교 재학생 또는 휴학생' },
        { label: '2. 멋사 활동에 적극적으로 참야하실 분' },
        { label: '3. 개인 노트북 보유자' },
        { label: '4. 매주 월요일 18시 대면 참가 가능하신 분' },
        { label: '5. 멋사 활동에 3회 불참시 수료증이 나오지 않습니다.' },
    ];

    return (
        <div id="requirementSection" className={styles.allContainer}>
            <p className={styles.title}>모집 대상</p>
            {steps.map((step, index) => (
                <div key={index}>
                    <div className={styles.label}>{step.label}</div>
                </div>
            ))}
        </div>
    )
}