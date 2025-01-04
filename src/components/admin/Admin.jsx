import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Admin.module.css';

export default function Admin({ children }) {
  return <section className={styles.section}>{children}</section>;
}


function AdminTitle() {
  return (
    <p className={styles.title}>
      관리자님 <br/>
      안녕하세요 </p>
  )
}

function AdminText() {
  return (
    <p className={styles.text}>admin1234@skuniv.ac.kr</p>
  )
}

function AdminItemBox({ children }) {
  return <div className={styles.itembox}>{children}</div>;
}

function AdminButton({ label, path }) {
  const navigate = useNavigate();
  
  return (
    <button
      className={styles.itembox__button}
      onClick={() => navigate(path)}>
      {label}
    </button>
  )
}



Admin.Title = AdminTitle;
Admin.Text = AdminText;
Admin.ItemBox = AdminItemBox;
Admin.Button = AdminButton;
