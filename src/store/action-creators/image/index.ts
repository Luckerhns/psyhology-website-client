import { ImageAction, ImageActionsEnum, ImageState } from "./image";

const initialState: ImageState = {
  image: "",
  isActive: false,
};

export const imageModalRecurer = (
  state: ImageState = initialState,
  action: ImageAction
) => {
  switch (action.type) {
    case ImageActionsEnum.SET_ACTIVE:
      return { ...state, isActive: action.payload };
    case ImageActionsEnum.SET_IMAGE:
      return { ...state, image: action.payload };
    default:
      return state;
  }
};
