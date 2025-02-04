import { TailSpin } from 'react-loader-spinner';

import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles['loading-container']}>
      <TailSpin color='#64a772' />
    </div>
  );
}
