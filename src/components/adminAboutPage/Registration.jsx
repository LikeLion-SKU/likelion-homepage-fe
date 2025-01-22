import { useState, useEffect } from 'react';
import styles from './registration.module.css';
import AddImage from './AddImage';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

export default function Registration({ users }) {
  const [rows, setRows] = useState([]);
  const [isStorage, setIsStorage] = useState(false);

  const roleOrder = ['회장', '부회장', '운영진', '아기사자', '게스트'];
  const partOrder = ['기획/디자인', '기획', '디자인', '프론트엔드', '백엔드'];

  useEffect(() => {
    if (users && Array.isArray(users)) {
      const initialRows = users.map((user) => ({
        role: user.role || '운영진',
        name: user.userName || '',
        part: user.parts || '',
        department: user.department || '',
        studentId: user.studentId || '',
        image: user.profileImageUrl || '',
      }));
      setRows(initialRows);
    }
  }, [users]);

  if (!users || !Array.isArray(users)) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  function sortRows(rows) {
    return [...rows].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  }

  function toggleStorage() {
    setIsStorage((prev) => !prev);
  }

  function handleCellChange(index, field, value) {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(sortRows(updatedRows));
  }

  function handleDeleteRow(index) {
    setRows(sortRows(rows.filter((_, rowIndex) => rowIndex !== index)));
  }

  function handleImageUpload(index, { url, name }) {
    const updatedRows = [...rows];
    updatedRows[index].image = url;
    updatedRows[index].fileName = name;
    setRows(updatedRows);
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.titleText}>LIKELION SKU 관리</p>
      </div>

      <div className={styles.newCategoryContainer}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>역할</th>
                <th>이름</th>
                <th>파트</th>
                <th>학과</th>
                <th>학번</th>
                <th></th>
                <th>이미지</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <select
                      className={styles.tableInput}
                      value={row.role}
                      onChange={(e) => handleCellChange(index, 'role', e.target.value)}
                      disabled={isStorage}
                    >
                      {roleOrder.map((role) => (
                        <option
                          key={role}
                          value={role}
                        >
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      className={styles.tableInput}
                      type='text'
                      value={row.name}
                      onChange={(e) => handleCellChange(index, 'name', e.target.value)}
                      disabled={isStorage}
                    />
                  </td>

                  <td>
                    <select
                      className={styles.tableInput}
                      value={row.part}
                      onChange={(e) => handleCellChange(index, 'part', e.target.value)}
                      disabled={isStorage}
                    >
                      {partOrder.map((part) => (
                        <option
                          key={part}
                          value={part}
                        >
                          {part}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      className={styles.tableInput}
                      type='text'
                      value={row.department}
                      onChange={(e) => handleCellChange(index, 'department', e.target.value)}
                      disabled={isStorage}
                    />
                  </td>

                  <td>
                    <input
                      className={styles.tableInput}
                      type='text'
                      value={row.studentId}
                      onChange={(e) => handleCellChange(index, 'studentId', e.target.value)}
                      disabled={isStorage}
                    />
                  </td>

                  <td>
                    <div>
                      {isStorage ? (
                        <div className={styles.deleteButtonContainer}>
                          <MdEdit
                            style={{ color: 'black', fontSize: '2rem', cursor: 'pointer' }}
                            onClick={toggleStorage}
                          />
                          <FaTrashAlt
                            style={{ color: 'red', fontSize: '2rem', cursor: 'pointer' }}
                            onClick={() => handleDeleteRow(index)}
                          />
                        </div>
                      ) : (
                        <div className={styles.submitButtonContainer}>
                          <button
                            className={styles.submitButton}
                            onClick={toggleStorage}
                          >
                            저장하기
                          </button>
                        </div>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className={styles.container}>
                      <AddImage
                        onImageUpload={(data) => handleImageUpload(index, data)}
                        isStorage={isStorage}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
