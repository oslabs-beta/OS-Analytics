import React from 'react';
import styles from './PageNotFound.module.css';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page not found </h1>

      <p> The page you were looking for does not exist. </p>
      <Link to="/"> Would you like to go back to the home page? </Link>
    </div>
  );
}
