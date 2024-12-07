import styles from "../../styles/aboutPage/aboutPage.module.css";
import Card from "./Card";
import profileImage from "../../assets/svgs/ex.svg";
export default function Babylion() {
    const babyLionMembers = [
        { name: "아기사자1", department: "소프트웨어학과 23학번", profileImage },
        { name: "아기사자2", department: "컴퓨터 공학과 22학번", profileImage },
        { name: "아기사자3", department: "정보통신학과 21학번" },
        { name: "아기사자4", department: "전자공학과 20학번", profileImage },
        { name: "아기사자5", department: "전자공학과 20학번", profileImage },
        { name: "아기사자6", department: "전자공학과 20학번", profileImage },
        { name: "아기사자7", department: "전자공학과 20학번", profileImage },
    ];

    return (
        <div className={styles.allContainer}>
            <div className={styles.babylionContainer}>
                <p className={styles.mainText}>아기사자</p>
                <div className={styles.cardGrid}>
                    {babyLionMembers.map((member, index) => (
                        <Card
                            key={index}
                            name={member.name}
                            department={member.department}
                            profileImage={member.profileImage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}