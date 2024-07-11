import React from "react";

import type { ItemsProps } from "./Items.types";
import styles from "./Items.module.scss";
import Item from "./Item/Item";

const Items: React.FC<ItemsProps> = ({ items, selectedItemId, status }) => {
  return (
    <div>
      <ul className={styles.list}>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            selectedItemId={selectedItemId}
            status={status}
          />
        ))}
      </ul>
    </div>
  );
};

export default Items;
