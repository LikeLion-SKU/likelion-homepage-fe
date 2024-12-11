import { useState } from "react";
import styles from "../../styles/adminAboutPage/registration.module.css";
import AddImg from "../../assets/aminaboutPage/addImg.svg";
import { FaTrashAlt } from "react-icons/fa";

export default function Registration() {
    const [rows, setRows] = useState([
        { role: "회장", name: "", department: "", studentId: "", image: "" },
    ]);

    // 역할 순서
    const roleOrder = ["회장", "부회장", "운영진", "아기사자"];

    // 정렬 함수
    const sortRows = (rows) => {
        return [...rows].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
    };

    // 행 추가
    const handleAddRow = () => {
        const updatedRows = [...rows, { role: "아기사자", name: "", department: "", studentId: "", image: "" }];
        setRows(sortRows(updatedRows));
    };

    // 셀 정렬
    const handleCellChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(sortRows(updatedRows));
    };

    // 행 삭제
    const handleDeleteRow = (index) => {
        setRows(sortRows(rows.filter((_, rowIndex) => rowIndex !== index)));
    };

    return (
        <div className={styles.allContainer}>
            <div className={styles.titleContainer}>
                <p className={styles.titleText}>새로운 카테고리 생성</p>
            </div>

            <div className={styles.newCategoryContainer}>
                <div className={styles.generationInputContainer}>
                    <p className={styles.categoryText}>기수</p>
                    <input className={styles.generationInput} type="number" placeholder="기수 입력" />
                    {/* <div className={styles.upDownButtonContainer}>
                        <button className={styles.upButton}>▲</button>
                        <button className={styles.downButton}>▼</button>
                    </div> */}
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
                                    {/* 역할 */}
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

                                    {/* 이름 */}
                                    <td>
                                        <input
                                            className={styles.tableInput}
                                            type="text"
                                            value={row.name}
                                            placeholder="이름 입력"
                                            onChange={(e) => handleCellChange(index, "name", e.target.value)}
                                        />
                                    </td>

                                    {/* 학과 */}
                                    <td>
                                        <input
                                            className={styles.tableInput}
                                            type="text"
                                            value={row.department}
                                            placeholder="학과 입력"
                                            onChange={(e) => handleCellChange(index, "department", e.target.value)}
                                        />
                                    </td>

                                    {/* 학번 */}
                                    <td>
                                        <input
                                            className={styles.tableInput}
                                            type="text"
                                            value={row.studentId}
                                            placeholder="학번 입력"
                                            onChange={(e) => handleCellChange(index, "studentId", e.target.value)}
                                        />
                                    </td>

                                    {/* 이미지 첨부 */}
                                    <td>
                                        <span>
                                            <img src={AddImg} alt="이미지 첨부" /> 이미지 첨부
                                        </span>
                                    </td>

                                    {/* 삭제 버튼 */}
                                    <td onClick={() => handleDeleteRow(index)} className={styles.deleteButton}>
                                        <FaTrashAlt style={{ color: "red", fontSize: "2rem" }} />
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