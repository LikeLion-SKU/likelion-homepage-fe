import { MdCheckBox } from 'react-icons/md';
import styles from './requirements.module.css';

export default function Requirements() {
  const steps = [
    '서경대학교 재학생 또는 휴학생',
    '멋쟁이사자처럼 활동에 성실하게 참여하실 분',
    '개인 노트북을 보유하신 분',
    '매주 월요일 저녁 세션 진행에 참여 가능하신 분',
    '1년간 각 트랙별 규칙을 잘 지켜 수료하실 수 있으신 분',
  ];

  return (
    <div
      id='requirementSection'
      className={styles.allContainer}
    >
      <p className={styles.title}>모집 대상</p>
      {steps.map((step, index) => (
        <div
          key={index}
          className={styles.stepContainer}
        >
          <MdCheckBox className={styles.checkIcon} />
          <span className={styles.label}>{step}</span>
        </div>
      ))}
    </div>
  );
}
