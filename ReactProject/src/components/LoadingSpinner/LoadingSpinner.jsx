import React from 'react';
import style from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={style.overlay}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
