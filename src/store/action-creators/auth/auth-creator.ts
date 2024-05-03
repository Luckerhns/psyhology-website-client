import { AxiosError } from "axios";
import { login, registration } from "../../../http/userApi";
import { AppDispatch } from "./../../store";
import {
  AuthActionsEnum,
  IUser,
  SetAuthAction,
  SetErrorAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./auth";

export const AuthActionCreators = {
  setIsAuth: (auth: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: auth,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload: error,
  }),
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        try {
          const data = await login(email, password);
          dispatch(AuthActionCreators.setIsAuth(true));
          localStorage.setItem("isAdmin", "true");
          window.location.href = '/'
          window.location.reload()
        } catch (error: any) {
          console.log("Ошибка входа: ", error.message);
        }
      });
    } catch (error: any) {
      console.log("Общая ошибка входа: ", error.message);
    }
  },
};
