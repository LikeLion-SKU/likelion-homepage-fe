import styles from "../../styles/aboutPage/aboutPage.module.css";
import Card from "./Card";
import profileImage from "../../assets/svgs/ex.svg";

export default function Chairman() {

    const chairmanMember1 = [
        { name: "김회장", department: "컴퓨터 공학과 22학번", profileImage },
    ];

    const chairmanMember2 = [
        { name: "이부회장", department: "컴퓨터 공학과 21학번", profileImage },
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
                <div className={styles.chairman}>
                    <q className={styles.mainText}>회장</q>
                    <Card
                        name={chairmanMember1[0].name}
                        department={chairmanMember1[0].department}
                        profileImage={chairmanMember1[0].profileImage}
                    />
                </div>
                <div className={styles.chairman}>
                    <q className={styles.mainText}>부회장</q>
                    <Card
                        name={chairmanMember2[0].name}
                        department={chairmanMember2[0].department}
                        profileImage={chairmanMember2[0].profileImage}
                    />
                </div>
            </div>
        </div>
    )
}