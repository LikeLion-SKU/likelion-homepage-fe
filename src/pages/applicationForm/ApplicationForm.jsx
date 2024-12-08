import { useCookies } from 'react-cookie';
import BodySection from '../../components/applicationForm/BodySection';
import HeaderSection from '../../components/applicationForm/HeaderSection';
import styles from './ApplicationForm.module.css';
import ShowApply from '../showApply/showApply';

export default function ApplicationForm() {
  const [cookies] = useCookies(['token']);

  return !cookies.token ? (
    <div className={styles.pageWrapper}>
      <HeaderSection />
      <BodySection />
    </div>
  ) : (
    <ShowApply />
  );
}
