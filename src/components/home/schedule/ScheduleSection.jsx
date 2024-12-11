import React from "react";
import styles from "./ScheduleSection.module.css"
import SectionWrapper from "../commons/SectionWrapper";
import schedule from "@images/homepage/schedule.png"

export default function ScheduleSection() {

    return (
        <SectionWrapper>
            <p className={styles.title}>일정</p>
            <img className={styles.scheduleImg} src={schedule} alt="schedule" />
        </SectionWrapper>
    )
}