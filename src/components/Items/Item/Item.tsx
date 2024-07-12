import React from "react";
import styles from "./Item.module.scss";

import { ItemProps } from "./item.types";
import { STATUS } from "../../../App.constants";
import clsx from "clsx";

const Item: React.FC<ItemProps> = ({ item, selectedItemId, status }) => {
  const { id, imageName, name, price } = item;

  const applyAnimation = status === STATUS.PREPEARING && id === selectedItemId;

  return (
    <li className={styles.item}>
      <img
        src={`/images/products/${imageName}`}
        alt={name}
        className={clsx(
          styles.icon,
          applyAnimation && styles["icon--animation"]
        )}
      />
      <span className={styles.price}>{`(${id}) ${price}лв`}</span>
    </li>
  );
};

export default Item;
