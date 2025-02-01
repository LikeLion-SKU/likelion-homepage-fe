import styles from './DotNavigation.module.css';

function DotsNavigation({ totalDots, activeIndex, onDotClick }) {
  if (totalDots <= 1) return null;

  const handleDotClick = (index) => () => {
    onDotClick(index);
  };

  return (
    <div className={styles.dotsContainer}>
      {Array.from({ length: totalDots }).map((_, index) => (
        <div
          key={index}
          className={`${styles.dot} ${activeIndex === index ? styles.active : ''}`}
          onClick={handleDotClick(index)}
        ></div>
      ))}
    </div>
  );
}

export default DotsNavigation;
