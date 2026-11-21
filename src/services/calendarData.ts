import { CalendarCategory, CalendarPayment } from "../types";

export const CALENDAR_CATEGORIES: CalendarCategory[] = [
  "Entertainment",
  "Work",
  "Sport",
  "Utilities",
];

export const INITIAL_CALENDAR_PAYMENTS: CalendarPayment[] = [
  {
    day: 2,
    name: "Netflix",
    amount: 200,
    category: "Entertainment",
    logo: "N",
    tone: "netflix",
    urgent: true,
  },
  {
    day: 5,
    name: "Spotify",
    amount: 150,
    category: "Entertainment",
    logo: "●",
    tone: "spotify",
  },
  {
    day: 15,
    name: "SportLife",
    amount: 800,
    category: "Sport",
    logo: "S",
    tone: "sportlife",
  },
  {
    day: 20,
    name: "iCloud",
    amount: 50,
    category: "Work",
    logo: "☁",
    tone: "icloud",
  },
  {
    day: 28,
    name: "Patreon",
    amount: 150,
    category: "Utilities",
    logo: "P",
    tone: "patreon",
  },
];
