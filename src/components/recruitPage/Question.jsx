import { useState } from 'react';
import styles from './question.module.css';
import arrowIcon from '@/assets/recruitPage/down.svg';

export default function Question() {
  const qaList = [
    {
      question: '비전공자도 참여 가능한가요?',
      answer:
        '비전공자도 참여 가능합니다! \n멋쟁이사자처럼은 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신만의 웹서비스를 만들어 이를 통해 꿈을 실현하는 것을 목표로하는 코딩 연합 동아리입니다.',
    },
    {
      question: '정기 세션은 언제 이루어지나요?',
      answer:
        '사설마다 조금씩 차이가 있지만 정기 세션은 매주 월요일 18시 30분부터 2~3시간가량 오프라인으로 진행됩니다.\n시간표 구성 시 참고해주세요.',
    },
    {
      question: '누가 참여할 수 있나요?',
      answer:
        '1년 동안 진행되는 세션 및 해커톤 등의 행사에 성실하게 참여할 준비가 되어있는 서경대학교 재학생 및 휴학생이라면 누구나 환영합니다.',
    },
    {
      question: '나이 제한이 있나요?',
      answer: '없습니다.\n멋쟁이사자처럼은 나이와 학년과 무관하게 선발이 이루어집니다.',
    },
    {
      question: '선발기준은 무엇인가요?',
      answer:
        '시간 투자를 많이 해야하는 멋대인만큼 아기사자들의 열정에 가장 중점을 두고,\n 1년 동안 함께 즐겁게 활동할 수 있는 아기사자들을 선호합니다.',
    },
    {
      question: '지원서 제출 후 수정이 가능한가요?',
      answer: '지원서 제출 후 수정이 불가합니다.\n중복 제출 또한 불가합니다.\n신중하게 지원서를 제출해주시길 바랍니다.',
    },
    {
      question: '여러 트랙으로 중복 지원이 가능한가요?',
      answer:
        '여러 트랙으로 중복 지원은 불가합니다.\n중복 제출 또한 불가합니다.\n이미 제출된 지원서가 있을 시 더 이상 지원서를 제출할 수 없습니다.',
    },
    {
      question: '합격 이후 다른 트랙으로 이동할 수 있나요?',
      answer: '합격 이후 트랙 간 멤버 조정은 없습니다.\n이 점 참고해서 지원 트랙 지원해주세요.',
    },
  ];

  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAnswer = (index) => {
    setOpenIndexes((prevState) => {
      if (prevState.includes(index)) {
        return prevState.filter((i) => i !== index);
      } else {
        return [...prevState, index];
      }
    });
  };

  return (
    <div
      id='questionSection'
      className={styles.allContainer}
    >
      <p className={styles.title}>자주 묻는 질문</p>
      <div className={styles.qaContainer}>
        {qaList.map((qa, index) => (
          <div
            key={index}
            className={styles.qaItem}
            onClick={() => toggleAnswer(index)}
          >
            <div className={styles.questionContainer}>
              <div className={styles.question}>
                <span>Q</span> {qa.question}
              </div>
              <img
                src={arrowIcon}
                alt='화살표'
                className={`${styles.arrowIcon} ${openIndexes.includes(index) ? styles.rotated : ''}`}
              />
            </div>
            {openIndexes.includes(index) && (
              <div className={styles.answer}>
                <span className={styles.answerPrefix}>A</span>
                <div className={styles.answerContainer}>
                  {qa.answer.split('\n').map((line, i) => (
                    <p
                      key={i}
                      className={styles.answerLine}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
