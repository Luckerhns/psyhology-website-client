export interface BurgerState {
  isBurgerOpen: boolean;
}

export enum BurgerActionsEnum {
  SET_BURGER_OPEN = "SET_BURGER_OPEN",
  SET_BURGER_CLOSE = "SET_BURGER_CLOSE",
}

export interface SetBurgerOpen {
  type: BurgerActionsEnum.SET_BURGER_OPEN;
  payload: boolean;
}

export interface SetBurgerClose {
  type: BurgerActionsEnum.SET_BURGER_CLOSE;
  payload: boolean;
}

export type BurgerActions = SetBurgerOpen | SetBurgerClose