import { AxiosError } from "axios";
import { registration } from "../../../http/userApi";
import getErrorByStatus from "../../../utils/functions";
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
  registration:
    (email: string, password: string, username: string) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(async () => {
          try {
            const data = await registration({
              email,
              password,
              username,
            });
            dispatch(AuthActionCreators.setIsAuth(true));
            localStorage.setItem('isAuth', "true")
            console.log(data);
          } catch (error: any) {
            const statusCode = error.response.status;
            const errorType = getErrorByStatus(statusCode);
            console.log(getErrorByStatus(statusCode));
            dispatch(AuthActionCreators.setError(errorType));
          }
        });
      } catch (error) {
        dispatch(AuthActionCreators.setError("Некорректные данные"));
      }
    },
};
