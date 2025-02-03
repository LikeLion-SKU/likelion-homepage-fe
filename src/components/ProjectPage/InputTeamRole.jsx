import styles from './InputTeamRole.module.css';
import TextareaAutosize from 'react-textarea-autosize';

const roleLabels = {
  pm: 'PM',
  design: 'Designer',
  'front-end': 'Front-End',
  'back-end': 'Back-End',
};

function InputTeamRole({ teamMembers, onMemberChange }) {
  return (
    <div className={styles.teamBox}>
      {Object.entries(teamMembers).map(([role, value]) => (
        <div
          key={role}
          className={styles.teamRole}
        >
          <span className={styles.role}>{roleLabels[role] || role}</span>
          <TextareaAutosize
            type='text'
            className={styles.memberInput}
            placeholder={`이름을 입력해주세요`} // 역할에 따른 placeholder
            value={value} // 초기값 설정
            onChange={(e) => onMemberChange(role, e.target.value)} // 역할별 입력값 업데이트
            required={false} // 기본 유효성 검사 비활성화
            spellCheck={false} // 맞춤법 검사를 비활성화하여 빨간 줄 제거
          />
        </div>
      ))}
    </div>
  );
}

export default InputTeamRole;
