import { useState } from "react";
import styles from "../../styles/resultPage/passPage.module.css";

export default function PassPage() {
    const [selectedDate, setSelectedDate] = useState(null);

    const interviewDates = [
        { date: "2025년 3월 10일 월요일" },
        { date: "2025년 3월 11일 화요일" },
        { date: "2025년 3월 12일 수요일" },
        { date: "2025년 3월 13일 목요일" },
    ];

    function handleDateClick(date) {
        setSelectedDate(date);
    }    

    return (
        <>
            <div className={styles.allContainer}>
                <div className={styles.titleContainer}>
                    <p className={styles.mainTitle}>🎉 서류 합격을 축하드립니다 🎉</p>
                </div>
                <div className={styles.contentContainer}>
                    <p className={styles.content}>
                        <span className={styles.spanStyle}>박성연</span>
                        님, 1차 서류 지원에 합격하셨습니다.
                    </p>
                    <p className={styles.content}>
                        아래에서 2차 면접 날짜를 선택해주세요.
                    </p>
                    <div className={styles.datePickerContainer}>
                        {interviewDates.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.dateItem} ${
                                    selectedDate === item.date ? styles.selected : ""
                                }`}
                                onClick={() => handleDateClick(item.date)}
                            >
                                <p className={styles.date}>{item.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}