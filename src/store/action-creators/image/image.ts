export interface ImageState {
  image: string,
  isActive: boolean
}

export enum ImageActionsEnum {
  SET_IMAGE = "SET_IMAGE",
  SET_ACTIVE = "SET_ACTIVE"
}

export interface SetImageAction {
  type: ImageActionsEnum.SET_IMAGE,
  payload: string
}
export interface SetActiveAction {
  type: ImageActionsEnum.SET_ACTIVE,
  payload: boolean
}

export type ImageAction = SetImageAction | SetActiveAction