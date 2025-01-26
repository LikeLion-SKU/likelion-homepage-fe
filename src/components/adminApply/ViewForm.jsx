import styles from '@pages/Apply.module.css';
import ViewFormHeader from './ViewFormHeader';
import FormBody from './FormBody';
import { useParams } from 'react-router-dom';
import { useGetUserInfo } from '@/hooks/useAdminApplyHook';
import { useState } from 'react';

export default function ViewForm() {
  const { id } = useParams();
  const [userInfos, setUserInfos] = useState([]);
  useGetUserInfo(setUserInfos, id);

  return (
    <div className={styles.pageWrapper}>
      <ViewFormHeader
        name={userInfos.이름}
        url='/admin/apply'
        btnMsg='목록으로'
      />
      <FormBody
        id={id}
        userInfos={userInfos}
      />
    </div>
  );
}
