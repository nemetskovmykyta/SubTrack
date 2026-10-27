import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  { path: "/", Component: LoginPage },
  { path: "/login", Component: LoginPage },
  { path: "/dashboard", Component: DashboardPage },
  { path: "/analytics", Component: AnalyticsPage },
  { path: "/calendar", Component: CalendarPage },
  { path: "/settings", Component: SettingsPage },
  { path: "*", Component: NotFoundPage },
]);
