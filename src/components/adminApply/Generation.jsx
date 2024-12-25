import styles from './Generation.module.css';

export default function Generation() {
  const years = [12, 13, 14];
  return (
    <div className={styles.navbar}>
      {years.map((year, index) => (
        <button key={index}>LIKELION SKU {year}TH</button>
      ))}
    </div>
  );
}
