import { INavbarRoutesArray } from "../types/types";

export enum PublicRoutesEnum {
  MainPath = "/",
  CatalogPath = "/catalog",
  AdminPath = "/admin",
  TherapyPath = "/therapy",
  AboutMePath = "/aboutme",
  AuthPath = "/auth-path",
  RecordPath = "/therapy/record",
  AgreePath = "/agree",
  PoliticyPath = "/politicy",
  PayPath = '/therapy/record/pay-path'
}

export enum PrivateRoutesEnum {
  AdminPath = "/admin",
  CurrentRecords = "/admin-records",
}

export const PublicNavbarRoutesArray: INavbarRoutesArray = [
  { path: PublicRoutesEnum.MainPath, pathName: "Главная", toProfile: false },
  {
    path: PublicRoutesEnum.AboutMePath,
    pathName: "Обо мне",
    therapyType: "aboutme",
    toProfile: false,
  },
  {
    path: PublicRoutesEnum.TherapyPath,
    pathName: "Консультация и терапия",
    therapyType: "consulting",
    toProfile: false,
  },
  {
    path: PublicRoutesEnum.TherapyPath,
    pathName: "Семейная терапия",
    therapyType: "family_psycho",
    toProfile: false,
  },
  
  {
    path: PublicRoutesEnum.TherapyPath,
    pathName: "Психотерапия",
    therapyType: "psycho",
    toProfile: false,
  },
];

export const PrivateNavbarRoutesArray: INavbarRoutesArray = [
  { path: PublicRoutesEnum.MainPath, pathName: "Главная" },
  {
    path: PublicRoutesEnum.CatalogPath,
    pathName: "Каталог",
    toProfile: false,
  },
  {
    path: PublicRoutesEnum.AboutMePath,
    pathName: "Обо мне",
    toProfile: false,
  },
  {
    path: PublicRoutesEnum.TherapyPath,
    pathName: "Консультация и терапия",
    therapyType: "consultation",
    toProfile: false,
  },
  {
    path: PublicRoutesEnum.TherapyPath,
    pathName: "Семейная терапия",
    therapyType: "family_psycho",
    toProfile: false,
  },
  
  {
    path: PublicRoutesEnum.TherapyPath,
    pathName: "Психотерапия",
    therapyType: "psycho",
    toProfile: false,
  },
  {
    path: PrivateRoutesEnum.CurrentRecords,
    pathName: "Профиль",
    toProfile: true,
  },
];


