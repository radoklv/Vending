import React from "react";

import type { ItemsProps } from "./Items.types";
import styles from "./Items.module.scss";
import Item from "./Item/Item";

const Items: React.FC<ItemsProps> = ({ items }) => {
  return (
    <div>
      <ul className={styles.list}>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default Items;
