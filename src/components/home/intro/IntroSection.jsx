import React from "react";
import styles from "./IntroSection.module.css"
import SectionWrapper from "../commons/SectionWrapper";
import lionimg from "@images/homepage/lion.png"

export default function IntroSection() {

    return (
        <SectionWrapper>
            <p className={styles.title}>서경대학교 멋쟁이사자처럼</p>
            <img className={styles.lionImg} src={lionimg} alt="lionimg" />
            <p className={styles.medium16}>
                안녕하세요 <span className={styles.bold}>서경대학교 멋쟁이사자처럼</span>입니다. <br/> 
                서경대 멋쟁이사자처럼은 다양한 전공의 학생들로 이루어진 IT 서비스 제작 동아리입니다. <br/>
                기획, 디자인, 프론트엔드, 백엔드 총 4개의 트랙으로 구성되어 있으며 <br/>
                여러 프로젝트를 통해 협업 능력과 실전 경험을 얻을 수 있습니다.
                </p>
        </SectionWrapper>
    )
}