import AboutmePage from "../pages/ru/AboutmePage";
import AdminPage from "../pages/ru/AdminPage";
import AdminRecords from "../pages/ru/AdminRecordsPage";
import AuthPage from "../pages/ru/AuthPage";
import MainPage from "../pages/ru/MainPage";
import RecordPage from "../pages/ru/RecordPage";
import TherapyPage from "../pages/ru/TherapyPage";
import AgreePage from "../pages/ru/license/AgreePage";
import PoliticyPage from "../pages/ru/license/PoliticyPage";
import { IRoute } from "../types/routes";
import { PrivateRoutesEnum, PublicRoutesEnum } from "./consts";

export const publicRoutes: IRoute[] = [
  { path: PublicRoutesEnum.MainPath, element: MainPage, },
  { path: PublicRoutesEnum.TherapyPath, element: TherapyPage },
  { path: PublicRoutesEnum.AboutMePath, element: AboutmePage },
  // { path: PublicRoutesEnum.RecordPath, element: RecordPage },
  // { path: PublicRoutesEnum.AuthPath, element: AuthPage },
  // { path: PublicRoutesEnum.AgreePath, element: AgreePage },
  // { path: PublicRoutesEnum.PoliticyPath, element: PoliticyPage },
];

export const privateRoutes = [
  { path: PublicRoutesEnum.MainPath, element: MainPage },
  { path: PublicRoutesEnum.TherapyPath, element: TherapyPage },
  { path: PublicRoutesEnum.AboutMePath, element: AboutmePage },
  // { path: PrivateRoutesEnum.CurrentRecord, element: AdminRecords },
  // { path: PublicRoutesEnum.AdminPath, element: AdminPage },
  // { path: PublicRoutesEnum.AgreePath, element: AgreePage },
  // { path: PublicRoutesEnum.PoliticyPath, element: PoliticyPage },
];
