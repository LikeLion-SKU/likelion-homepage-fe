import styles from './Track.module.css';
import pmImg from "@images/homepage/pmImg.png";
import designerImg from "@images/homepage/designerImg.png"
import frontImg from "@images/homepage/frontImg.png";
import backImg from "@images/homepage/backImg.png";

export default function Track({ children }) {
  return <section className={styles.section}>{children}</section>;
}

function Title() {
  return <p className={styles.title}>트랙 소개</p>
}

function Manager() {
  return (
    <div className={styles.card}>
      <img className={styles.trackImg} src={pmImg}/>
      <p className={styles.trackName}>기획</p>
      <p className={styles.trackContent}>
        우리 삶 속 Pain Point를 찾아내고
        이를 해결하기 위한 서비스를 출시해요.
        이를 위해 와이어프레임 Flowchart를 배워요.
      </p>
    </div>
  )
}

function Designer() {
  return (
    <div className={styles.card}>
      <img className={styles.trackImg} src={designerImg}/>
      <p className={styles.trackName}>디자인</p>
      <p className={styles.trackContent}>
        사용자 경험을 고려한 UI를 디자인하고
        서비스의 의도에 맞게 사용자들을 유도해요.
        이를 위해 Figma라는 디자인 툴을 배워요.
      </p>
    </div>
  )
}

function Frontend() {
  return (
    <div className={styles.card}>
      <img className={styles.trackImg} src={frontImg}/>
      <p className={styles.trackName}>프론트엔드</p>
      <p className={styles.trackContent}>
        사용자 인터페이스를 구현하고 서버와 통신하여
        동적인 웹사이트를 구축해요.
        이를 위해 React라는 JS 라이브러리를 배워요.
      </p>
    </div>
  )
}

function Backend() {
  return (
    <div className={styles.card}>
      <img className={styles.trackImg} src={backImg}/>
      <p className={styles.trackName}>백엔드</p>
      <p className={styles.trackContent}>
        눈에 보이지 않는 서버를 담당해요. 
        서비스에 필요한 API를 개발하고 데이터를 관리해요. 
        이를 위해 Spring라는 자바 프레임워크를 배워요.
      </p>
    </div>
  )
}


Track.Title = Title;
Track.Manager = Manager;
Track.Designer = Designer;
Track.Frontend = Frontend;
Track.Backend = Backend;

