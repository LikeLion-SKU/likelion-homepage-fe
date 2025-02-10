import styles from './consentCheckboxes.module.css';
import { useState } from 'react';

export default function ConsentCheckbox() {
  const [feeConsent, setFeeConsent] = useState(false);
  const [attendanceConsent, setAttendanceConsent] = useState(false);

  return (
    <div className={styles.checkboxContainer}>
      <div className={styles.checkboxItem}>
        <div className={styles.contentSection}>
          <h3 className={styles.title}>회비 및 보증금 제도 동의 여부</h3>
          <div className={styles.content}>
            <p>
              멋쟁이사자처럼 13기 부원들께서는 장소 대관, 행사 운영 등을 위해 5만원(회비 45000원 + 보증금 5000원)의
              운영비를 납부하셔야 합니다.
            </p>
            <p>운영비 사용 내역을 투명하게 공개됩니다.</p>
            <p>보증금은 1년이 지난 후 돌려드리며 (세션 참석 장려용) 세션 3회 불참 시 보증금은 돌려드리지 않습니다.</p>
          </div>
          <div className={styles.consentRow}>
            <input
              type='checkbox'
              id='feeConsent'
              checked={feeConsent}
              onChange={(e) => setFeeConsent(e.target.checked)}
              className={styles.checkbox}
            />
            <label
              htmlFor='feeConsent'
              className={styles.checkboxLabel}
            >
              위 내용에 동의합니다.
            </label>
          </div>
        </div>
      </div>

      <div className={styles.checkboxItem}>
        <div className={styles.contentSection}>
          <h3 className={styles.title}>멋쟁이사자처럼 활동 참석 동의 여부</h3>
          <div className={styles.content}>
            <p>매주 월요일 18시30분~20시30분 세션 필참</p>
            <p>3월 21일(목) 18시 : 전체 OT 참여 권장</p>
            <p>3월 11일(월) 교내 OT 필참</p>
            <p>5월 중 진행될 아이디어톤 필참</p>
            <p>8월 중 진행될 중앙해커톤 필참</p>
            <p>위 활동 불참 시 불이익이 있을 수 있습니다.</p>
          </div>
          <div className={styles.consentRow}>
            <input
              type='checkbox'
              id='attendanceConsent'
              checked={attendanceConsent}
              onChange={(e) => setAttendanceConsent(e.target.checked)}
              className={styles.checkbox}
            />
            <label
              htmlFor='attendanceConsent'
              className={styles.checkboxLabel}
            >
              위 내용에 동의합니다.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
