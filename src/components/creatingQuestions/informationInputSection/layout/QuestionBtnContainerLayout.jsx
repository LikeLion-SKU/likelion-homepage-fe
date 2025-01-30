import styles from './QuestionBtnContainerLayout.module.css';

export default function QuestionBtnContainerLayout({ children }) {
  return <div className={styles['question-Btn-Container']}>{children}</div>;
}
