export interface ITitle {
  title: string;
}

export interface IUser {
  email: string;
  password: string;
  username: string;
}

export interface IUserBlank {
  firstname: string;
  lastname: string;
  patronymic: string;
  time: string;
  number: string;
}

export interface INavbarRoutes {
  path: string;
  pathName: string;
  therapyType?: string;
  toProfile?: boolean;
}

export interface ILayout {
  children?: any;
  title?: string;
  metaContent?: string;
}

export interface IRecord {
  id: number;
  date: string;
  time: string;
  phone: string;
  email: string;
  firstname: string;
  lastname: string;
  patronymic: string;
}

export type INavbarRoutesArray = INavbarRoutes[];

export type IUserBlankArr = IUserBlank[];
