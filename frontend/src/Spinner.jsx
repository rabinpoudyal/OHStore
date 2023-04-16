import React from "react";
import spinner from "./spinner.svg";
import styles from "./Spinner.module.css";

const Spinner = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.backdrop}>
        <div className={styles.spinner}>
          <img src={spinner} alt="Loading..." />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
