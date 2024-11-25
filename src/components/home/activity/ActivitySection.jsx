import React from "react";
import styles from "./ActivitySection.module.css"
import { Activity } from "./Activity";

export default function ActivitySection() {
    return (
        <div className={styles.center}>
            <p className={styles.title}>멋사 활동</p>
            <div className={styles.horizontal}>
                <Activity.Activity1/>
                <Activity.Activity2/>
                <Activity.Activity3/>
                <Activity.Activity4/>
                <Activity.Activity5/>
            </div>

        </div>
    )
}