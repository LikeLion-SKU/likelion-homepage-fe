import React, { useState } from "react";
import styles from "../../styles/adminAboutPage/generation.module.css";

export default function Generation() {
    const [buttons, setButtons] = useState(["LIKELION 12TH", "LIKELION 13TH", "LIKELION 14TH"]);

    // 버튼 삭제 핸들러
    function handleRemove(index) {
        setButtons(buttons.filter(function(_, i) {
            return i !== index;
        }));
    }    

    // 버튼 추가 핸들러
    function handleAdd() {
        setButtons([...buttons, `LIKELION ${buttons.length + 12}TH`]);
    }

    return (
        <div className={styles.allContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.title}>멋사인 편집하기</p>
                <div className={styles.buttonContainer}>
                    {buttons.map((label, index) => (
                        <div key={index} className={styles.btnWrapper}>
                            <button className={styles.btn}>
                                {label}
                                <span
                                    className={styles.closeIcon}
                                    onClick={() => handleRemove(index)}
                                >
                                    ×
                                </span>
                            </button>
                        </div>
                    ))}
                    <button className={styles.addButtonContainer} onClick={handleAdd}>
                        <span className={styles.addButton}>
                            +
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
