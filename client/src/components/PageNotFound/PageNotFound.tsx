import React from 'react';
import styles from './PageNotFound.module.css';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className={styles.notFound}>
      <h1 className = {styles.heading}>404 - Page not found </h1>
      <Link to="/"> <p> Would you like to go back to the home page? </p></Link>
    </div>
  );
}
