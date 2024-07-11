import { STATUS } from "../../App.constants";

export type ControlPanelTypes = {
  onSelectItem: (value: string) => void;
  infoMessage?: string | undefined;
  status: STATUS;
};
