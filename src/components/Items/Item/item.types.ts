import { STATUS } from "../../../App.constants";
import { Product } from "../../../App.types";

export type ItemProps = {
  item: Product;
  selectedItemId?: number;
  status: STATUS;
};
