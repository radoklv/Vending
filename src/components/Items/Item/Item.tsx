import React from "react";
import styles from "./Item.module.scss";

import { ItemProps } from "./item.types";

const Item: React.FC<ItemProps> = ({ item }) => {
  const { id, imageName, name, price } = item;

  return (
    <li className={styles.item}>
      <img src={`/images/products/${imageName}`} alt={name} />
      <span className={styles.price}>{`(${id}) ${price}лв`}</span>
    </li>
  );
};

export default Item;
