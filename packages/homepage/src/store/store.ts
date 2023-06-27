import { createStore as reduxCreateStore, combineReducers } from "redux";
import { ModalStatusReducer } from "./ModalStatusReducer";

const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      modalStatus: ModalStatusReducer,
    })
  );
};

export const store = createStore();
