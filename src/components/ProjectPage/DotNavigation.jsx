import styles from './DotNavigation.module.css';

function DotsNavigation({ totalDots, activeIndex, onDotClick }) {
  return (
    <div className={styles.dotsContainer}>
      {Array.from({ length: totalDots }).map((_, index) => (
        <div
          key={index}
          className={`${styles.dot} ${activeIndex === index ? styles.active : ''}`}
          onClick={() => onDotClick(index)}
        ></div>
      ))}
    </div>
  );
}

export default DotsNavigation;
