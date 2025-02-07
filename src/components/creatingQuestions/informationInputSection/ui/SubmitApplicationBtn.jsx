import styles from './SubmitApplicationBtn.module.css';

export default function SubmitApplicationBtn({ validateAndSubmitApplication, applicationInformation, questions }) {
  return (
    <button
      className={styles['submit-btn']}
      onClick={function () {
        validateAndSubmitApplication(applicationInformation, questions);
      }}
    >
      등록하기
    </button>
  );
}
