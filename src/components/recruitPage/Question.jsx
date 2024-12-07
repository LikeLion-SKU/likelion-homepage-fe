import styles from "../../styles/recruitPage/question.module.css";

export default function Question() {
    const qaList = [
        {
            question: "비전공자도 참여 가능한가요?",
            answer:
                "비전공자도 참여 가능합니다.\n멋쟁이사자처럼의 목표는 컴퓨터과학 비전공자들도 프로그래밍 기초 지식을 배워 자신의 웹서비스를 만들 수 있도록 하는 것입니다.",
        },
        {
            question: "정기 세션은 언제 이루어지나요?",
            answer:
                "사설마다 조금씩 차이가 있지만 정기 세션은 매주 월요일 18시부터 2~3시간가량 오프라인으로 진행됩니다.\n시간표 구성 시 참고해주세요.",
        },
        {
            question: "누가 참여할 수 있나요?",
            answer:
                "1학년 도입 과목부터 졸업생까지 참여할 준비가 되어있는 사전과제 제출 및 동아리에 열정이 많은 누구나 참여 가능합니다.",
        },
        {
            question: "나이 제한이 있나요?",
            answer:
                "없습니다.\n멋쟁이사자처럼은 나이와 학년과 무관하게 선발이 이루어집니다.",
        },
        {
            question: "선발기준은 무엇인가요?",
            answer:
                "시간 투자를 많이 해야하는 멋대인만큼 아기사자들의 열정에 가장 중점을 두고,\n 1년 동안 함께 즐겁게 활동할 수 있는 아기사자들을 선호합니다.",
        },
        {
            question: "지원서 제출 후 수정이 가능한가요?",
            answer:
                "지원서 제출 후 수정이 불가합니다.\n중복 제출 또한 불가합니다.\n신중하게 지원서를 제출해주시길 바랍니다.",
        },
        {
            question: "여러 트랙으로 중복 지원이 가능한가요?",
            answer:
                "여러 트랙으로 중복 지원은 불가합니다.\n중복 제출 또한 불가합니다.\n이미 제출된 지원서가 있을 시 더 이상 지원서를 제출할 수 없습니다.",
        },
        {
            question: "합격 이후 다른 트랙으로 이동할 수 있나요?",
            answer:
                "합격 이후 트랙 간 멤버 조정은 없습니다.\n이 점 참고해서 지원 트랙 선택해주세요.",
        },
    ];

    return (
        <div id="questionSection" className={styles.allContainer}>
            <p className={styles.title}>자주 묻는 질문</p>
            <div className={styles.qaContainer}>
                {qaList.map((qa, index) => (
                    <div key={index} className={styles.qaItem}>
                        <div className={styles.question}>
                            <span>Q</span> {qa.question}
                        </div>
                        <div className={styles.answer}>
                            <span className={styles.answerPrefix}>A</span>
                            <div className={styles.answerContainer}>
                                {qa.answer.split("\n").map((line, i) => (
                                    <p key={i} className={styles.answerLine}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
