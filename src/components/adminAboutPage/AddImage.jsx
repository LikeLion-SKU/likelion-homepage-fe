import React, { useState } from "react";
import styles from "../../styles/adminAboutPage/registration.module.css";

export default function AddImage({ onImageUpload }) {
    const [fileName, setFileName] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            const url = URL.createObjectURL(file); // URL 생성
            onImageUpload({ url, name: file.name }); // URL과 파일명 함께 전달
        }
    };

    return (
        <div className={styles.container}>
            <label htmlFor="fileUpload" className={styles.uploadButton}>
                이미지 선택
            </label>
            <input
                id="fileUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.hiddenInput}
            />
            {fileName && <p className={styles.fileName}>{fileName}</p>}
        </div>
    );
}
