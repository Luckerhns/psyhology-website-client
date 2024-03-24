import { AppDispatch } from "../../store";
import { BurgerActionsEnum, SetBurgerClose, SetBurgerOpen } from "./burger";

export const BurgerActionCreators = {
  OpenBurger: (): SetBurgerOpen => ({
    type: BurgerActionsEnum.SET_BURGER_OPEN,
    payload: true,
  }),
  CloseBurger: (): SetBurgerClose => ({
    type: BurgerActionsEnum.SET_BURGER_CLOSE,
    payload: false,
  }),

  SetBurgerOpen: () => async (dispatch: AppDispatch) => {
    dispatch(BurgerActionCreators.OpenBurger());

    document.body.style.overflowY = "hidden";
  },

  SetBurgerClose: () => async (dispatch: AppDispatch) => {
    dispatch(BurgerActionCreators.CloseBurger());
    document.body.style.overflowY = "scroll";
  },
};
