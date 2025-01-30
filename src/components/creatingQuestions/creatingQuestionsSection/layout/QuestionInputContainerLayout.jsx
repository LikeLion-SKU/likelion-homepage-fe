import styles from './QuestionInputContainerLayout.module.css';

export default function QuestionInputContainerLayout({ children }) {
  return <div className={styles['question-input-container']}>{children}</div>;
}
