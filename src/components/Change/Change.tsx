import React, { useEffect, useState } from "react";

import styles from "./Change.module.scss";
import type { ChangesProps } from "./Change.types";
import { calculateChange } from "../../App.utils";
import { link } from "fs";

const Change: React.FC<ChangesProps> = ({ change, onTakeChange }) => {
  const [coins, setCoins] = useState<string[]>([]);

  useEffect(() => {
    if (!change.length) {
      return;
    }

    const mappedCoins = change.map((coin) => {
      switch (coin) {
        case 0.01:
          return "1st.png";
        case 0.02:
          return "2st.png";
        case 0.05:
          return "5st.png";
        case 0.1:
          return "10st.png";
        case 0.2:
          return "20st.png";
        case 0.5:
          return "50st.png";
        case 1:
          return "1lev.png";
        case 2:
          return "2leva.png";
        default:
          return "";
      }
    });

    setCoins(mappedCoins);
  }, [change]);

  return (
    <div>
      <h2 className={styles.title}>Take Change:</h2>
      <ul className={styles.coins}>
        {coins?.map((coin, index) => (
          <li key={index} className={styles.coin} onClick={onTakeChange}>
            <img src={`/images/coins/${coin}`} alt="coin" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Change;
