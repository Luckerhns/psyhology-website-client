import { ThemeCreators } from "./theme/theme-creator";
import { ModalCreators } from "./modal/auth-modal/modal-creator";
import { AuthActionCreators } from "./auth/auth-creator";
import { RecordActionCreators } from "./modal/record-modal/record-creator";
import { BurgerActionCreators } from "./burger/burger-creator";

export default {
  ...ModalCreators,
  ...AuthActionCreators,
  ...ThemeCreators,
  ...RecordActionCreators,
  ...BurgerActionCreators
};
