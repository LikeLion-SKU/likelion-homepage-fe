import styles from './IntroSection.module.css';
import SectionWrapper from '../commons/SectionWrapper';
import lionimg from '@assets/homepage/lion.webp';

export default function IntroSection() {
  return (
    <SectionWrapper>
      <p className={styles.title}>서경대학교 멋쟁이사자처럼</p>
      <img
        className={styles.lionImg}
        src={lionimg}
        alt='lionimg'
      />
      <p className={styles.medium16}>
        안녕하세요 <span className={styles.bold}>서경대학교 멋쟁이사자처럼</span>입니다. <br />
        멋쟁이사자처럼은 다양한 전공의 학생들로 이루어진 IT 동아리입니다. <br />
        서경대 멋쟁이사자처럼은 함께 배우고 성장하는 커뮤니티를 지향합니다. <br />
        스스로를 발전시키고자 하는 열정을 바탕으로 도전하며, <br />
        성장을 즐길 줄 아는 분들과 함께 더 나은 내일을 만들어가고자 합니다.
      </p>
    </SectionWrapper>
  );
}
