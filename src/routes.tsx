import { createBrowserRouter } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";

export const router = createBrowserRouter([
  { path: "/", Component: LoginPage },
  { path: "/dashboard", Component: DashboardPage },
  { path: "/analytics", Component: AnalyticsPage },
  { path: "/calendar", Component: CalendarPage },
  { path: "/settings", Component: SettingsPage },
  { path: "*", Component: LoginPage },
]);
