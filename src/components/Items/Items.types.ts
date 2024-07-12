import { STATUS } from "../../App.constants";
import type { Product } from "../../App.types";

export type ItemsProps = {
  items: Product[];
  selectedItemId?: number;
  status: STATUS;
};
