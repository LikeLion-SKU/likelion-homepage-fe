import styles from "../../styles/aboutPage/aboutPage.module.css";
import Card from "./Card";
import profileImage from "../../assets/svgs/ex.svg";

export default function Chairman() {
    const chairmanMembers = [
        { name: "서회장", department: "컴퓨터 공학과 22학번", profileImage, role: "회장" },
        { name: "이부회장", department: "컴퓨터 공학과 21학번", profileImage, role: "부회장" },
    ];

    return (
        <div className={styles.allContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>멋사인</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.btn}>LIKELION 12TH</button>
                    <button className={styles.btn}>LIKELION 13TH</button>
                    <button className={styles.btn}>LIKELION 14TH</button>
                </div>
            </div>
            <div className={styles.chairmanContainer}>
                <div className={styles.chairmanCardGrid}>
                    {chairmanMembers.map((member, index) => (
                        <div key={index} className={styles.chairman}>
                            <q className={styles.mainText}>{member.role}</q>
                            <Card
                                name={member.name}
                                department={member.department}
                                profileImage={member.profileImage}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
