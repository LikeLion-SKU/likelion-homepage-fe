import React from "react";
import styles from "./IntroSection.module.css"
import { OnclickDiv } from "@components/home/intro/OnclickDiv";

export default function IntroSection() {
    return (
        <div className={styles.center}>
            <p className={styles.title}>서경대학교 멋쟁이사자처럼</p>
            <p className={styles.medium16}>
                서경대학교 멋쟁이사자처럼은 <br/> 
                내 아이디어를 내 손으로 만들고 싶은 대학생들로 이루어진 IT 연합 동아리입니다. <br/>
                기획 및 디자인, 개발 트랙으로 구성되어 있으며 다양한 프로젝트를 통해 협업 경험을 쌓을 수 있습니다. </p>
            <div className={styles.horizontal}>
                <OnclickDiv.Members/>
                <OnclickDiv.Recruit/> 
            </div>

        </div>
    )
}