import { AppDispatch } from "./../../store";
import { ImageActionsEnum, SetActiveAction, SetImageAction } from "./image";

export const ImageActionCreators = {
  setImage: (image: string): SetImageAction => ({
    type: ImageActionsEnum.SET_IMAGE,
    payload: image,
  }),

  setImageActive: (isActive: boolean): SetActiveAction => ({
    type: ImageActionsEnum.SET_ACTIVE,
    payload: isActive,
  }),

  openImageModal:
    (image: string, isActive: boolean) => async (dispatch: AppDispatch) => {
      try {
        setTimeout(() => {
          try {
            dispatch(ImageActionCreators.setImageActive(isActive));
            dispatch(ImageActionCreators.setImage(image));
          } catch (error: any) {
            console.log("Ошибка модалки:", error.message);
          }
        });
      } catch (error: any) {
        console.log("Ошибка модалки:", error.message);
      }
    },

  closeImageModal: () => async (dispatch: AppDispatch) => {
    try {
      setTimeout(() => {
        try {
          dispatch(ImageActionCreators.setImageActive(false));
          dispatch(ImageActionCreators.setImage(""));
        } catch (error: any) {
          console.log("Ошибка модалки:", error.message);
        }
      });
    } catch (error: any) {
      console.log("Ошибка модалки:", error.message);
    }
  },
};
