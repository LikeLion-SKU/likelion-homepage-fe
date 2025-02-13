import { MdCheckBox } from 'react-icons/md';
import styles from './requirements.module.css';

export default function Requirements() {
  const steps = [
    '서경대학교 재학생 또는 휴학생',
    '멋사 활동을 성실하게 참여하실 분',
    '개인 노트북 보유자',
    '매주 월요일 18시 30분 대면 참가 가능하신 분',
    '멋사 활동에 2회 불참시 수료증이 나오지 않습니다.',
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
