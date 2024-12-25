import LionImage from "../../assets/recruitPage/lionImg.svg";
import styles from "../../styles/recruitPage/recruitMain.module.css";

export default function RecruitMain() {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className={styles.allContainer}>
            <div className={styles.D_dayContainer}>
                <p className={styles.subText}>지원 마감까지</p>
                <p className={styles.dayText}>D-120</p>
                <p className={styles.mainText}>13기 아기사자 모집</p>
            </div>
            <img src={LionImage} alt="사자 이미지" className={styles.lionImg} />
            <button className={styles.recruitButton}>멋사 지원하기</button>
            <div className={styles.pageButtonContainer}>
                <button
                    className={styles.pageButton}
                    onClick={() => scrollToSection("scheduleSection")}
                >
                    모집 일정
                </button>
                <button 
                    className={styles.pageButton}
                    onClick={() => scrollToSection("requirementSection")}
                >
                    모집 대상
                </button>
                <button 
                    className={styles.pageButton}
                    onClick={() => scrollToSection("questionSection")}
                >
                    자주 묻는 질문
                </button>
            </div>
        </div>
    );
}
