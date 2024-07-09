import React from "react";

import type { ControlPanelTypes } from "./ControlPanel.types";
import styles from "./ControlPanel.module.scss";

const ControlPanel: React.FC<ControlPanelTypes> = (props) => {
  return (
    <div className={styles.controlPanel}>
      <div className={styles.display}>
        <input type="text" readOnly />
      </div>

      <div className={styles.keypad}>
        <button className={styles.key}>1</button>
        <button className={styles.key}>2</button>
        <button className={styles.key}>3</button>
        <button className={styles.key}>4</button>
        <button className={styles.key}>5</button>
        <button className={styles.key}>6</button>
        <button className={styles.key}>7</button>
        <button className={styles.key}>8</button>
        <button className={styles.key}>9</button>
      </div>

      <span>Coins</span>

      <div className={styles.moneyIn} />

      <span>Change</span>

      <div className={styles.change} />
    </div>
  );
};

export default ControlPanel;
