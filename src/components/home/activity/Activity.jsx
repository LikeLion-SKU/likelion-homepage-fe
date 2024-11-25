import React from "react";
import styles from "./Activity.module.css"

function Activity({children}) {
    return(
        <div >
            {children}
        </div>
    )
}

function Activity1() {
    return(
        <div className={styles.div}>
            <p>a1</p>
        </div>
    )
}

function Activity2() {
    return(
        <div className={styles.div}>
            <p>a2</p>
            
        </div>
    )
}

function Activity3() {
    return(
        <div className={styles.div}>
            <p>a3</p>
        </div>
    )
}

function Activity4() {
    return(
        <div className={styles.div}>
            <p>a4</p>
        </div>
    )
}

function Activity5() {
    return(
        <div className={styles.div}>
            <p>a5</p>
        </div>
    )
}


Activity.Activity1 = Activity1;
Activity.Activity2 = Activity2;
Activity.Activity3 = Activity3;
Activity.Activity4 = Activity4;
Activity.Activity5 = Activity5;

export {Activity};