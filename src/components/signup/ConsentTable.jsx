import styles from './SignupSection.module.css';

export default function ConsentTable() {
  return (
    <div className={styles['signup-form__consentsection']}>
      <table className={styles['signup-form__consent_table']}>
        <tbody>
          <tr className={styles['signup-form__consent_row']}>
            <th className={styles['signup-form__consent_head']}>수집 목적</th>
            <td className={styles['signup-form__consent_body']}>
              재학생(휴학생 포함) 여부 확인, 입부 지원 처리, 지원 내역 및 합격 여부 확인, 지원자 의사 확인 및 원활한 의사소통
            </td>
          </tr>
          <tr className={styles['signup-form__consent_row']}>
            <th className={styles['signup-form__consent_head']}>필수항목</th>
            <td className={styles['signup-form__consent_body']}>이름, 연락처, 이메일 주소, 학과, 학번</td>
          </tr>
          <tr className={styles['signup-form__consent_row']}>
            <th className={styles['signup-form__consent_head']}>보유 기간</th>
            <td className={styles['signup-form__consent_body']}>
              지원자: 서류 지원 결과 통지일로부터 1개월 동안 보관 후 파기 <br></br>
              부원: 활동 기간 동안보관하며, 활동 종료 후에도 원활한 운영 및 기록 보관 목적으로 보유할 수 있으며, 본인의 요청이 있는 경우 지체 없이 파기
            </td>
          </tr>
        </tbody>
      </table>
      <pre className={styles['signup-form__consent_info']}>
        귀하는 개인 정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.<br></br>
        다만, 동의를 거부할 경우 지원 및 입부 절차가 진행되지 않을 수 있음을 알려드립니다.<br></br>
        위의 내용을 충분히 숙지하였으며, 이에 동의합니다.
      </pre>
    </div>
  );
}
