import { STATUS } from "../../App.constants";
import type { Item } from "../../App.types";

export type ItemsProps = {
  items: Item[];
  selectedItemId?: number;
  status: STATUS;
};
