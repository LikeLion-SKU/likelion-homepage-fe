import { createContext, useContext, useState } from 'react';

import { BsThreeDotsVertical } from 'react-icons/bs';

import styles from './ApplicationBtnCard.module.css';

const ApplicationBtnContext = createContext(null);

function useApplicationBtnContext() {
  const ctx = useContext(ApplicationBtnContext);

  if (!ctx) throw new Error('ApplicaitionBtn내에서 사용해주세요');

  return ctx;
}

export default function ApplicationBtnCard({ children }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <ApplicationBtnContext.Provider value={{ isClicked, setIsClicked }}>
      <button className={styles['application-btn']}>{children}</button>
    </ApplicationBtnContext.Provider>
  );
}

function ApplicationCohort({ cohort }) {
  return (
    <div className={styles['application-btn__cohort']}>
      <p className={styles['application-btn__text']}>{cohort}</p>
    </div>
  );
}

function Dots() {
  const { setIsClicked } = useApplicationBtnContext();

  return (
    <div
      className={styles['application-btn__dots']}
      onClick={function () {
        setIsClicked((prev) => !prev);
      }}
    >
      <BsThreeDotsVertical
        fontSize='1.5em'
        display='block'
      />
    </div>
  );
}

function MenuList({ children }) {
  const { isClicked } = useApplicationBtnContext();

  if (isClicked) return <ul className={styles['application-btn__menu']}>{children}</ul>;

  return null;
}

function MenuItem({ text, onClick }) {
  return (
    <li
      className={styles['application-btn__item']}
      onClick={function () {
        onClick();
      }}
    >
      {text}
    </li>
  );
}

ApplicationBtnCard.Dots = Dots;
ApplicationBtnCard.ApplicationCohort = ApplicationCohort;
ApplicationBtnCard.MenuList = MenuList;
ApplicationBtnCard.MenuItem = MenuItem;
