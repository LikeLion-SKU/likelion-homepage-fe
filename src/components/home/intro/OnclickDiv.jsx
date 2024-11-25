import React from "react";
import styles from "./OnclickDiv.module.css"
import link from "@svgs/link.svg"

function OnclickDiv(props) {
    return(
        <>
            {props.children}
        </>
    )
}

function Members() {
    return(
        <div className={styles.div}>
            <div className={styles.titleDiv}>
                <span className={styles.bold16}>MEMBERS</span>
                <span className={styles.bold28}>명예의 전당</span>
            </div>
            <img className={styles.img} src={link} alt="link"/>
        </div>
    )
}

function Recruit() {
    return(
        <div className={styles.div}>
            <div className={styles.titleDiv}>
                <span className={styles.bold16}>RECRUIT</span>
                <span className={styles.bold28}>멋사 지원하기</span>
            </div>
            <img className={styles.img} src={link} alt="link"/>
        </div>
    )
}

OnclickDiv.Members = Members;
OnclickDiv.Recruit = Recruit;


export {OnclickDiv};