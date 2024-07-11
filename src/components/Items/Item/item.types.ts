import { STATUS } from "../../../App.constants";
import { Item } from "../../../App.types";

export type ItemProps = {
  item: Item;
  selectedItemId?: number;
  status: STATUS;
};
