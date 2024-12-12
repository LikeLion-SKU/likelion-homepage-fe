import { useState } from "react";
import styles from "../../styles/adminAboutPage/registration.module.css";
import AddImage from "./AddImage";
import { FaTrashAlt } from "react-icons/fa";

export default function Registration() {
    const [rows, setRows] = useState([
        { role: "회장", name: "", department: "", studentId: "", image: "", fileName: "" },
    ]);

    const roleOrder = ["회장", "부회장", "운영진", "아기사자"];

    function sortRows(rows) {
        return [...rows].sort(function (a, b) {
            return roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role);
        });
    }

    function handleAddRow() {
        const updatedRows = [
            ...rows,
            { role: "아기사자", name: "", department: "", studentId: "", image: "", fileName: "" },
        ];
        setRows(sortRows(updatedRows));
    }

    function handleCellChange(index, field, value) {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(sortRows(updatedRows));
    }

    function handleDeleteRow(index) {
        setRows(sortRows(rows.filter(function (_, rowIndex) {
            return rowIndex !== index;
        })));
    }

    function handleImageUpload(index, { url, name }) {
        const updatedRows = [...rows];
        updatedRows[index].image = url; // 이미지 URL 저장
        updatedRows[index].fileName = name; // 파일명 저장
        setRows(updatedRows);
    }

    return (
        <div className={styles.allContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.titleText}>새로운 카테고리 생성</p>
            </div>

            <div className={styles.newCategoryContainer}>
                <div className={styles.generationInputContainer}>
                    <p className={styles.categoryText}>기수</p>
                    <input className={styles.generationInput} type="number" placeholder="기수 입력" />
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>역할</th>
                                <th>이름</th>
                                <th>학과</th>
                                <th>학번</th>
                                <th>이미지</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        <select
                                            className={styles.tableInput}
                                            value={row.role}
                                            onChange={(e) => handleCellChange(index, "role", e.target.value)}
                                        >
                                            {roleOrder.map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td>
                                        <input
                                            className={styles.tableInput}
                                            type="text"
                                            value={row.name}
                                            placeholder="이름 입력"
                                            onChange={(e) => handleCellChange(index, "name", e.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className={styles.tableInput}
                                            type="text"
                                            value={row.department}
                                            placeholder="학과 입력"
                                            onChange={(e) => handleCellChange(index, "department", e.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className={styles.tableInput}
                                            type="text"
                                            value={row.studentId}
                                            placeholder="학번 입력"
                                            onChange={(e) => handleCellChange(index, "studentId", e.target.value)}
                                        />
                                    </td>

                                    <td>
                                        <div className={styles.container}>
                                            {row.fileName ? (
                                                <p>{row.fileName}</p>
                                            ) : (
                                                <AddImage onImageUpload={(data) => handleImageUpload(index, data)} />
                                            )}
                                        </div>
                                    </td>

                                    <td onClick={() => handleDeleteRow(index)} >
                                        <div className={styles.deleteButtonContainer}>
                                            <FaTrashAlt style={{ color: "red", fontSize: "2rem" }} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.addRowButtonContainer}>
                        <button className={styles.addRowButton} onClick={handleAddRow}>
                            + 추가
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.submitButtonContainer}>
                <button className={styles.submitButton}>등록하기</button>
            </div>
        </div>
    );
}
