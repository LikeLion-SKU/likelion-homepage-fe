import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Recruit.module.css';
import ParallaxText from './ParallaxText/ParallaxText';
import arrow from "@images/homepage/arrow.png"

export default function Recruit({ children }) {
  return <section className={styles.section}>{children}</section>;
}

function RecruitItemBox({ children }) {
  return <div className={styles.itemBox}>{children}</div>;
}

function RecruitTitle() {
  return <p className={styles.title}>13기 아기사자 모집</p>;
}

function RecruitTimerTitle() {
  return (
    <div className={styles.timertitle}>
      <span>DAYS</span>
      <span>HOURS</span>
      <span>MINUTES</span>
      <span>SECONDS</span>
    </div>
  )
}

function RecruitTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const targetDate = new Date('2024-12-31T23:59:59');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } 
      else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return (
    <div className={styles.timer}>
      <span>{timeLeft.days}</span>
      <span>:</span>
      <span>{timeLeft.hours}</span>
      <span>:</span>
      <span>{timeLeft.minutes}</span>
      <span>:</span>
      <span>{timeLeft.seconds}</span>
    </div>
  )
}

function RecruitButton() {
  const navigate = useNavigate();
  return (
    <>
      <button className={styles.button} onClick={() => navigate('recruit')}>
        지원하러 가기
        <img src={arrow} alt="arrow" />
      </button>
    </>
  )
}

function RecruitMotion() {
  return (
    <>
      <ParallaxText baseVelocity={-3}>LIKELION SKU LIKELION SKU</ParallaxText>
      <ParallaxText baseVelocity={4}>GROWL TO WORLD</ParallaxText>
    </>
  )
}

Recruit.ItemBox = RecruitItemBox;
Recruit.Title = RecruitTitle;
Recruit.TimerTitle = RecruitTimerTitle;
Recruit.Timer = RecruitTimer;
Recruit.Button = RecruitButton;
Recruit.Motion = RecruitMotion;
