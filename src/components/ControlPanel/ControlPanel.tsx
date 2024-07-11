import React, { useEffect, useState } from "react";
import clsx from "clsx";

import type { ControlPanelTypes } from "./ControlPanel.types";
import styles from "./ControlPanel.module.scss";
import { INFO_MESSAGE, STATUS, inputRegex } from "../../App.constants";

const ControlPanel: React.FC<ControlPanelTypes> = ({
  onSelectItem,
  onChangeClick,
  onResetClick,
  infoMessage,
  status,
  change,
}) => {
  const [inputValue, setInputValue] = useState<string>(infoMessage || "");

  const onKeyPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (status === STATUS.INITIAL || status === STATUS.COMPLETED) {
      return;
    }

    if (!inputRegex.test(inputValue)) {
      // Test if input value is a number
      setInputValue("");
    }

    const value = (e.target as HTMLButtonElement).value;

    setInputValue((prev) => prev + value);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setInputValue(INFO_MESSAGE.SELECT);
      onSelectItem(inputValue);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <div className={styles.controlPanel}>
      <div className={styles.display}>
        <input type="text" readOnly value={infoMessage || inputValue} />
      </div>

      <div
        className={styles.keypad}
        onClick={(e) =>
          onKeyPress(e as unknown as React.MouseEvent<HTMLButtonElement>)
        }
      >
        <button className={styles.key} value={1}>
          <span>1</span>
        </button>
        <button className={styles.key} value={2}>
          <span>2</span>
        </button>
        <button className={styles.key} value={3}>
          <span>3</span>
        </button>
        <button className={styles.key} value={4}>
          <span>4</span>
        </button>
        <button className={styles.key} value={5}>
          <span>5</span>
        </button>
        <button className={styles.key} value={6}>
          <span>6</span>
        </button>
        <button className={styles.key} value={7}>
          <span>7</span>
        </button>
        <button className={styles.key} value={8}>
          <span>8</span>
        </button>
        <button className={styles.key} value={9}>
          <span>9</span>
        </button>
        <button
          className={clsx(styles.key, styles["key--fullWidth"])}
          value={0}
        >
          <span>0</span>
        </button>
      </div>

      <span>Coins</span>

      <div className={styles.moneyCollector}>
        <span className={styles.moneyIn} />

        <button className={styles.reset} onClick={onResetClick}>
          <img src="/images/reset.png" alt="reset" />
        </button>
      </div>

      <span>Change</span>

      <div className={styles.change} onClick={onChangeClick}>
        {change.length ? (
          <img
            src="images/coins/change.png"
            alt="change"
            className={styles.changeIcon}
            onClick={onChangeClick}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ControlPanel;
