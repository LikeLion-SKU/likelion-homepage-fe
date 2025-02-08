import styles from './QuestionEditingContainerLayout.module.css';

export default function QuestionEditingContainerLayout({ children }) {
  return <div className={styles['question-editing-container']}>{children}</div>;
}
