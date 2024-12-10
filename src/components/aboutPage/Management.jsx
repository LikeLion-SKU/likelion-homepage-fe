import styles from "../../styles/aboutPage/aboutPage.module.css";
import Card from "./Card";
import profileImage from "../../assets/svgs/ex.svg";

export default function Management() {
    const managementMembers = [
        { name: "김운영", department: "컴퓨터 공학과 22학번" },
        { name: "이운영", department: "컴퓨터 공학과 21학번", profileImage },
        { name: "박운영", department: "컴퓨터 공학과 20학번", profileImage },
        { name: "최운영", department: "컴퓨터 공학과 19학번", profileImage },
        { name: "최운영", department: "컴퓨터 공학과 19학번", profileImage },
        { name: "최운영", department: "컴퓨터 공학과 19학번", profileImage },
        { name: "최운영", department: "컴퓨터 공학과 19학번", profileImage },
        { name: "최운영", department: "컴퓨터 공학과 19학번", profileImage },
    ];

    return (
        <div className={styles.allContainer}>
            <div className={styles.managementContainer}>
                <p className={styles.mainText}>운영진</p>
                <div className={styles.managementCardGrid}>
                    {managementMembers.map((member, index) => (
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