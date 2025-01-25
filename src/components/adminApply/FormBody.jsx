import { useState } from 'react';
import styles from './FormBody.module.css';
import { useGetQandA } from '@/hooks/useAdminApplyHook';

export default function FormBody({ id, userInfos }) {
  const [commonQA, setcommonQA] = useState([]);
  const [partQA, setpartQA] = useState([]);

  useGetQandA(setcommonQA, setpartQA, id);

  return (
    <div className={styles.bodyWrapper}>
      {Object.entries(userInfos).map(([key, value]) => (
        <div
          key={key}
          className={styles.inputWrapper}
        >
          <p className={styles.question}>{key}</p>
          <p className={styles.answer}>{value}</p>
        </div>
      ))}
      <div className={styles.divider}>공통 질문</div>
      {commonQA.length > 0
        ? commonQA.map((item, index) => (
            <div
              key={index}
              className={styles.inputWrapper}
            >
              <p className={styles.question}>{item.questionContent}</p>
              <p className={styles.answer}>{item.answerContent}</p>
            </div>
          ))
        : null}
      <div className={styles.divider}>파트별 질문</div>
      {partQA.length > 0
        ? partQA.map((item, index) => (
            <div
              key={index}
              className={styles.inputWrapper}
            >
              <p className={styles.question}>{item.questionContent}</p>
              <p className={styles.answer}>{item.answerContent}</p>
            </div>
          ))
        : null}
    </div>
  );
}
