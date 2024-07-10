import React from "react";

import type { WalletTypes } from "./Wallet.types";
import styles from "./Wallet.module.scss";

const Wallet: React.FC<WalletTypes> = ({ onSelectAmount }) => {
  return (
    <div className={styles.wallet}>
      <div className={styles.title}>
        <h2>Enter from selected coins:</h2>
      </div>

      <div className={styles.coins}>
        <button className={styles.coin} onClick={() => onSelectAmount(0.01)}>
          <img src="/images/coins/1st.png" alt="1st" />
        </button>
        <button
          className={styles.coin}
          value={0.02}
          onClick={() => onSelectAmount(0.02)}
        >
          <img src="/images/coins/2st.png" alt="2st" />
        </button>
        <button
          className={styles.coin}
          value={0.05}
          onClick={() => onSelectAmount(0.05)}
        >
          <img src="/images/coins/5st.png" alt="5st" />
        </button>
        <button
          className={styles.coin}
          value={0.1}
          onClick={() => onSelectAmount(0.10)}
        >
          <img src="/images/coins/10st.png" alt="10st" />
        </button>
        <button
          className={styles.coin}
          value={0.2}
          onClick={() => onSelectAmount(0.20)}
        >
          <img src="/images/coins/20st.png" alt="20st" />
        </button>
        <button
          className={styles.coin}
          value={0.5}
          onClick={() => onSelectAmount(0.50)}
        >
          <img src="/images/coins/50st.png" alt="50st" />
        </button>
        <button
          className={styles.coin}
          value={1}
          onClick={() => onSelectAmount(1)}
        >
          <img src="/images/coins/1lev.png" alt="1lev" />
        </button>
        <button
          className={styles.coin}
          value={2}
          onClick={() => onSelectAmount(2)}
        >
          <img src="/images/coins/2leva.png" alt="2leva" />
        </button>
      </div>
    </div>
  );
};

export default Wallet;
