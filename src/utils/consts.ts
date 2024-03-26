import { INavbarRoutesArray } from "../types/types";

export enum catalogPaths {}

export enum PublicRoutesEnum {
  MainPath = "/",
  CatalogPath = "/catalog.html",
  AdminPath = "/admin.html",
  BasketPath = "/basket.html",
  FavoritesPath = "/favorites.html",
  TherapyPath = "/therapy.html",
  AboutMePath = "/aboutme.html",
  AuthPath = "/auth-path.html",
  RecordPath = "/therapy/record.html",
  AgreePath = "/agree.html",
  PoliticyPath = "/politicy.html",
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
    path: PublicRoutesEnum.AdminPath,
    pathName: "Профиль",
    toProfile: true,
  },
];

export enum PrivateRoutesEnum {
  AdminPath = "/admin",
  CurrentRecord = "/admin-records",
}
