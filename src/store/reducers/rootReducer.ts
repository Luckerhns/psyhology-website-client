import { combineReducers } from "redux";
import { authModalReducer } from "../action-creators/modal/auth-modal";
import { authReducer } from "../action-creators/auth";
import { themeReducer } from "../action-creators/theme";
import { recordModalReducer } from "../action-creators/modal/record-modal";
import { burgerReducer } from "../action-creators/burger";
import { imageModalRecurer } from "../action-creators/image";

export const rootReducer = combineReducers({
  auth: authReducer,
  modal: authModalReducer,
  theme: themeReducer,
  recordModal: recordModalReducer,
  burger: burgerReducer,
  imageModal: imageModalRecurer,
});

export type RootState = ReturnType<typeof rootReducer>;
