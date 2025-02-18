import styles from './welcomeSection.module.css';
export default function WelcomeSection() {
  return (
    <>
      <div className={styles.titleContainer}>
        <p className={styles.mainTitle}>🎉 서류 합격을 축하드립니다 🎉</p>
      </div>

      <div className={styles.contentContainer}>
        <p className={styles.content}>안녕하세요. IT동아리 멋쟁이사자처럼 서경대학교 13기입니다.</p>
        <p className={styles.content}>1차 서류 합격을 진심으로 축하드립니다.</p>
        <p className={styles.content}>
          함께하고 싶으신 분들이 너무 많아 지원서를 여러 번 읽어보고 모든 운영진들이 고심 끝에 결정하였습니다.
        </p>
        <p className={styles.content}>어떤 분들을 만나 뵙게 될지 기대하고 있겠습니다.</p>
        <p className={styles.content}>아래에서 3월 9일까지 반드시 2차 대면 면접 날짜를 선택 후 등록해 주세요.</p>
        <p className={styles.content}>면접 장소는 다음과 같습니다.</p>

        <p className={styles.content}>백엔드 학술정보관 8층 스터디룸1</p>
        <p className={styles.content}>디자인 학술정보관 8층 스터디룸2</p>
        <p className={styles.content}>기획 학술정보관 8층 스터디룸3</p>
        <p className={styles.content}>프론트엔드 학술정보관 8층 스터디룸4</p>

        <p className={styles.content}>선택한 면접일자는 마이페이지에서 확인하실 수 있습니다.</p>

        <p className={styles.guidecontent}>* 면접 시간은 선착순 입니다.</p>
        <p className={styles.guidecontent}>* 면접 시간을 선택하지 않을 경우 자동 탈락됩니다.</p>
        <p className={styles.guidecontent}>
          * 선택한 면접 시간은 마이페이지에서 3월 9일까지 취소 후 재등록 할 수 있습니다.
        </p>
        <p className={styles.guidecontent}>* 선택 후 회비 및 활동 여부에 동의하셔야합니다.</p>
      </div>
    </>
  );
}
