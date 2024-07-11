import React, { useCallback, useEffect, useState, forwardRef } from "react";
import { debounce } from "lodash";
import clsx from "clsx";

import type { ControlPanelTypes } from "./ControlPanel.types";
import styles from "./ControlPanel.module.scss";
import { INFO_MESSAGE, STATUS, inputRegex } from "../../App.constants";

const ControlPanel: React.FC<ControlPanelTypes> = ({
  onSelectItem,
  onChangeClick,
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
          1
        </button>
        <button className={styles.key} value={2}>
          2
        </button>
        <button className={styles.key} value={3}>
          3
        </button>
        <button className={styles.key} value={4}>
          4
        </button>
        <button className={styles.key} value={5}>
          5
        </button>
        <button className={styles.key} value={6}>
          6
        </button>
        <button className={styles.key} value={7}>
          7
        </button>
        <button className={styles.key} value={8}>
          8
        </button>
        <button className={styles.key} value={9}>
          9
        </button>
        <button
          className={clsx(styles.key, styles["key--fullWidth"])}
          value={0}
        >
          0
        </button>
      </div>

      <span>Coins</span>

      <div className={styles.moneyIn} />

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
