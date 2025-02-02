import styles from './CreateApplyBtnSection.module.css';

import CreateApplyBtn from './CreateApplyBtn';
import CreateApplyMention from './CreateApplyMention';
import CreateApplyTitle from './CreateApplyTitle';

export default function CreateApplyBtnSection() {
  return (
    <section className={styles['create-apply-section']}>
      <CreateApplyTitle />
      <CreateApplyBtn />
      <CreateApplyMention />
    </section>
  );
}
