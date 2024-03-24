import { BurgerActions, BurgerActionsEnum, BurgerState } from "./burger";

const initialState: BurgerState = {
  isBurgerOpen: false,
};

export const burgerReducer = (
  state: BurgerState = initialState,
  action: BurgerActions
): BurgerState => {
  switch (action.type) {
    case BurgerActionsEnum.SET_BURGER_OPEN:
      return { ...state, isBurgerOpen: true };
    case BurgerActionsEnum.SET_BURGER_CLOSE:
      return { ...state, isBurgerOpen: false };
    default:
      return state;
  }
};
