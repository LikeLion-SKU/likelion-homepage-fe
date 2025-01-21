import { useStore } from '@store/useStore';
import Generation from './Generation';
import styles from './HeaderContainer.module.css';
import Select from 'react-select';
import { sortOptions, sortStyle } from '@constants/adminApplyConst';
import { getApplicants } from '@/api/adminApplyAPI';

export default function HeaderContainer() {
  const { semester, setApplicants, setSort } = useStore();

  return (
    <>
      <div className={styles.header}>
        <header>{semester}th 지원서 모아보기</header>
      </div>
      <Generation />
      <Select
        styles={sortStyle}
        options={sortOptions}
        onChange={(option) => {
          setSort(option);
          getApplicants(setApplicants, semester, option.value);
        }}
        placeholder='전체'
        isSearchable={false}
      />
    </>
  );
}
