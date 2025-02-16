import { useState, useEffect } from 'react';
import styles from './registration.module.css';
import AddImage from './AddImage';
import { FaTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { putProfile, putImage, deleteProfile } from '@api/aboutAdminAPI';

export default function Registration({ users }) {
  const [rows, setRows] = useState([]);
  const [filterRole, setFilterRole] = useState('전체');

  const roleOrder = ['전체', 'LEAD', 'COLEAD', 'COREMEMBER', 'BABYLION', 'GUEST'];
  const partOrder = ['지원자', '기획디자인', '기획', '디자인', '백엔드', '프론트엔드'];

  useEffect(() => {
    if (users && Array.isArray(users)) {
      const initialRows = users.map((user) => ({
        loginId: user.loginId,
        role: user.role || 'GUEST',
        name: user.userName || '',
        part: user.parts || '',
        department: user.department || '',
        studentId: user.studentId || '',
        semester: user.semester || null,
        originalStudentId: user.studentId || '',
        image: user.profileImageUrl || '',
        isStorage: true,
      }));
      setRows(initialRows);
    }
  }, [users]);

  if (!users || !Array.isArray(users)) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  const filteredRows = filterRole === '전체' ? rows : rows.filter((row) => row.role === filterRole);

  function toggleStorage(loginId) {
    setRows(rows.map((row) => (row.loginId === loginId ? { ...row, isStorage: !row.isStorage } : row)));
  }

  function handleCellChange(loginId, field, value) {
    setRows(rows.map((row) => (row.loginId === loginId ? { ...row, [field]: value } : row)));
  }

  async function handleDeleteRow(loginId) {
    const originalUser = users.find((user) => user.loginId === loginId);
    if (!originalUser) return;
    try {
      const isDeleted = await deleteProfile(originalUser.semester, originalUser.studentId);
      if (isDeleted) {
        setRows(rows.filter((row) => row.loginId !== loginId));
        alert('삭제되었습니다.');
      } else {
        alert('게스트만 삭제 가능합니다.');
      }
    } catch {
      alert('삭제에 실패했습니다.');
    }
  }

  function handleImageUpload(file, loginId) {
    setRows(rows.map((row) => (row.loginId === loginId ? { ...row, image: file === '' ? null : file } : row)));
  }

  async function handleSave(loginId) {
    const updatedRow = rows.find((row) => row.loginId === loginId);
    const originalUser = users.find((user) => user.loginId === loginId);
    if (!originalUser) {
      alert('원본 데이터를 찾을 수 없습니다.');
      return;
    }

    const updatedData = {
      role: updatedRow.role,
      userName: updatedRow.name,
      parts: updatedRow.part,
      department: updatedRow.department,
      studentId: updatedRow.studentId,
      semester: updatedRow.semester,
    };

    try {
      let imageSuccess = true;
      let profileSuccess = true;

      if (updatedRow.image instanceof File || updatedRow.image == null) {
        const formData = new FormData();
        formData.append('image', updatedRow.image);
        const response = await putImage(updatedRow.semester, updatedRow.originalStudentId, formData);
        imageSuccess = response.success;
        if (!imageSuccess) {
          alert(`${response.message} 이미지는 다시 저장해주세요`);
        }
      }

      const profileResponse = await putProfile(updatedRow.semester, updatedRow.originalStudentId, updatedData);
      profileSuccess = profileResponse.success;

      if (profileSuccess) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.loginId === loginId ? { ...row, originalStudentId: updatedRow.studentId, isStorage: true } : row,
          ),
        );

        alert('저장되었습니다.');
        toggleStorage(loginId);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.allContainer}>
      <div className={styles.titleContainer}>
        <p className={styles.titleText}>LIKELION SKU 관리</p>
        <select
          className={styles.filterDropdown}
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
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
                <th>수정/삭제</th>
                <th>이미지</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.loginId}>
                  <td>
                    <select
                      className={styles.tableInput}
                      value={row.role}
                      onChange={(e) => handleCellChange(row.loginId, 'role', e.target.value)}
                      disabled={row.isStorage}
                    >
                      {roleOrder.slice(1).map((role) => (
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
                      onChange={(e) => handleCellChange(row.loginId, 'name', e.target.value)}
                      disabled={row.isStorage}
                    />
                  </td>
                  <td>
                    <select
                      className={styles.tableInput}
                      value={row.part}
                      onChange={(e) => handleCellChange(row.loginId, 'part', e.target.value)}
                      disabled={row.isStorage}
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
                      onChange={(e) => handleCellChange(row.loginId, 'department', e.target.value)}
                      disabled={row.isStorage}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.tableInput}
                      type='text'
                      value={row.studentId}
                      onChange={(e) => handleCellChange(row.loginId, 'studentId', e.target.value)}
                      disabled={row.isStorage}
                    />
                  </td>
                  <td>
                    <div>
                      {row.isStorage ? (
                        <div className={styles.deleteButtonContainer}>
                          <MdEdit
                            style={{ color: 'black', fontSize: '2rem', cursor: 'pointer' }}
                            onClick={() => toggleStorage(row.loginId)}
                          />
                          <FaTrashAlt
                            style={{ color: 'red', fontSize: '2rem', cursor: 'pointer' }}
                            onClick={() => handleDeleteRow(row.loginId)}
                          />
                        </div>
                      ) : (
                        <button
                          className={styles.submitButton}
                          onClick={() => handleSave(row.loginId)}
                        >
                          저장하기
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <AddImage
                      index={row.loginId}
                      onImageUpload={handleImageUpload}
                      isStorage={row.isStorage}
                      initialImage={row.image}
                    />
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
