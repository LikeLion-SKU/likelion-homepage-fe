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
                안녕하세요 <b>서경대학교 멋쟁이사자처럼</b>입니다. <br/> 
                내 아이디어를 내 손으로 만들고 싶은 모든 서경대 학생분들을 환영합니다. <br/>
                여기에서 2줄 정도 더 쓰면 될 듯
                </p>
        </SectionWrapper>
    )
}