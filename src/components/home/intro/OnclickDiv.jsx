import React from "react";
import styles from "./OnclickDiv.module.css"
import { useNavigate } from "react-router-dom";
import link from "@svgs/link.svg"

function OnclickDiv({children}) {
    return(
        <>
            {children}
        </>
    )
}

function Members() {
    const navigate = useNavigate();

    return(
        <div className={styles.div} onClick={() => navigate('about')}>
            <div className={styles.titleDiv}>
                <span className={styles.bold16}>MEMBERS</span>
                <span className={styles.bold28}>명예의 전당</span>
            </div>
            <img className={styles.img} src={link} alt="link"/>
        </div>
    )
}

function Recruit() {
    const navigate = useNavigate();

    return(
        <div className={styles.div} onClick={() => navigate('recruit')}>
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