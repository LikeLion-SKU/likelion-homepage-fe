import styles from './CreateQuestionBtnContainerLayout.module.css';

export default function CreateQuestionBtnContainerLayout({ children }) {
  return <div className={styles['create-question-btn-container']}>{children}</div>;
}
