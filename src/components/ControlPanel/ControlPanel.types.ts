import { STATUS } from "../../App.constants";

export type ControlPanelTypes = {
  onSelectItem: (value: string) => void;
  onChangeClick: () => void;
  onResetClick: () => void;
  infoMessage?: string | undefined;
  status: STATUS;
  change: number[];
};
