import styles from './welcomeSection.module.css';
export default function WelcomeSection() {
  return (
    <>
      <div className={styles.titleContainer}>
        <p className={styles.mainTitle}>🎉 서류 합격을 축하드립니다 🎉</p>
      </div>

      <div className={styles.contentContainer}>
        <p className={styles.content}>안녕하세요. IT동아리 멋쟁이사자처럼 서경대학교 13기입니다.</p>
        <p className={styles.content}>프론트엔드 파트 1차 서류 합격을 진심으로 축하드립니다.</p>
        <p className={styles.content}>
          함께하고 싶으신 분들이 너무 많아 지원서를 여러 번 읽어보고 모든 운영진들이 고심 끝에 결정하였습니다.
        </p>
        <p className={styles.content}>어떤 분들을 만나 뵙게 될지 기대하고 있겠습니다.</p>
        <p className={styles.content}>아래에서 3월 9일 자정까지 반드시 2차 대면 면접 날짜를 선택 후 등록해 주세요.</p>
        <p className={styles.content}>면접 장소는 청운관 1004호입니다.</p>
        <p className={styles.content}>선택한 면접일자는 마이페이지에서 확인하실 수 있습니다.</p>

        <p className={styles.guidecontent}>* 면접 시간은 선착순 입니다.</p>
        <p className={styles.guidecontent}>* 선택한 면접 시간은 변경할 수 없습니다.</p>
        <p className={styles.guidecontent}>* 선택 후 회비 및 활동 여부에 동의하셔야합니다.</p>
      </div>
    </>
  );
}
