import favorites from "../icons/favorites.png";
import login from "../icons/login.png";
import loop from "../icons/loop.png";
import order from "../icons/order.png";
import { IBusyRecord } from "../types/Calendar";

export const event = [
  {
    date: "2023-01-10",
    username: "dsadsa",
    freeTimes: [],
    busyTimes: [],
    notSelectedTimes: [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ],
  },
];

export const busyRecords: IBusyRecord[] = [
  {
    id: 1,
    email: "",
    firstname: "",
    lastname: "",
    patronymic: "",
    phone: "",
    time: "",
    date: "",
  },
];

export const payIcons = [
  { id: 1, src: loop },
  { id: 2, src: favorites },
  { id: 3, src: order },
  { id: 4, src: login },
];

export const rewards = [
  { id: 1, src: loop },
  { id: 2, src: loop },
  { id: 3, src: loop },
  { id: 4, src: loop },
  { id: 5, src: loop },
];

export const weekDaysRu = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];

export const monthsRu = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

export const monthsRuList = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const link = "http://localhost:3000";
export const websiteOwner = "Еремина Татьяна";
export const websiteOwnerPhone = "+7-993-354-72-60";
export const websiteOwnerEmail = "Luckerhackerr@gmail.com";
export const INN = "770370256650";