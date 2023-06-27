import { ModalStatus } from "../types";
import { initialState } from "./initialState";

const CLOSE_MODAL = "CLOSE_MODAL";
const OPEN_LOADING_MODAL = "OPEN_LOADING_MODAL";
const OPEN_ERROR_MODAL = "OPEN_ERROR_MODAL";

type CloseModalAction = {
  type: typeof CLOSE_MODAL;
};
type OpenLoadingModalAction = {
  type: typeof OPEN_LOADING_MODAL;
};
type OpenErrorModalAction = {
  type: typeof OPEN_ERROR_MODAL;
  payload: string;
};

export const createCloseModalAction = (): CloseModalAction => {
  return {
    type: CLOSE_MODAL,
  };
};
export const createOpenLoadingModalAction = (): OpenLoadingModalAction => {
  return {
    type: OPEN_LOADING_MODAL,
  };
};
export const createOpenErrorModalAction = (
  errorMessage: string
): OpenErrorModalAction => {
  return {
    type: OPEN_ERROR_MODAL,
    payload: errorMessage,
  };
};

export const ModalStatusReducer = (
  state = initialState.modalStatus,
  action: CloseModalAction | OpenLoadingModalAction | OpenErrorModalAction
): ModalStatus => {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        modalType: "",
        errorMessage: "",
      };
    case OPEN_LOADING_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: "LOADING",
      };
    case OPEN_ERROR_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: "ERROR",
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
