import { RootStore } from "../types";

export const initialState: RootStore = {
  modalStatus: {
    isOpen: false,
    modalType: "",
    errorMessage: "",
  },
};
