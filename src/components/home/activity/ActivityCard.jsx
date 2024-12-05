import styles from './ActivityCard.module.css';

export default function ActivityCard({ children }) {
  return <section className={styles.card}>{children}</section>;
}

function ActivityItemBox({ children }) {
  return <div className={styles.itemBox}>{children}</div>;
}

function ActivityItem({ content }) {
  return (
    <div className={styles.item}>
      <p>{content}</p>
    </div>
  );
}

function ActivityTitle() {
  return <p className={styles.title}>멋사 활동</p>;
}

ActivityCard.Title = ActivityTitle;
ActivityCard.ItemBox = ActivityItemBox;
ActivityCard.Item = ActivityItem;
