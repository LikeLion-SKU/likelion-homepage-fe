import { useEffect, useState } from 'react';
import styles from './FormBody.module.css';

export default function FormBody() {
  const [userInfos, setUserInfos] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setUserInfos([1, 2, 3, 4, 5]);
    setQuestions([1, 2, 3, 4, 5]);
    setAnswers([1, 2, 3, 4, 5]);
  }, []);

  return (
    <div className={styles.bodyWrapper}>
      {userInfos.map((item, index) => (
        <div
          key={index}
          className={styles.inputWrapper}
        >
          <p className={styles.question}>안녕</p>
          <p className={styles.answer}>그래</p>
        </div>
      ))}
      <div className={styles.divider}>공통 질문</div>
      {questions.map((item, index) => (
        <div
          key={index}
          className={styles.inputWrapper}
        >
          <p className={styles.question}>안녕</p>
          <p className={styles.answer}>그래</p>
        </div>
      ))}
      <div className={styles.divider}>파트별 질문</div>
      {questions.map((item, index) => (
        <div
          key={index}
          className={styles.inputWrapper}
        >
          <p className={styles.question}>안녕</p>
          <p className={styles.answer}>그래</p>
        </div>
      ))}
    </div>
  );
}
