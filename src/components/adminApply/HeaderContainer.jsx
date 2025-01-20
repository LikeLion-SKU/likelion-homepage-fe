import { useStore } from '@store/useStore';
import Generation from './Generation';
import styles from './HeaderContainer.module.css';

export default function HeaderContainer() {
  const { semester } = useStore();
  return (
    <>
      <div className={styles.header}>
        <header>{semester}th 지원서 모아보기</header>
      </div>
      <Generation />
    </>
  );
}
