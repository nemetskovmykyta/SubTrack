import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CalendarPage from "./pages/CalendarPage";
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";

const routes = [
  { path: "/", Component: LoginPage },
  { path: "/login", Component: LoginPage },
  { path: "/dashboard", Component: DashboardPage },
  { path: "/analytics", Component: AnalyticsPage },
  { path: "/calendar", Component: CalendarPage },
  { path: "/settings", Component: SettingsPage },
  { path: "*", Component: NotFoundPage },
];

describe("Application Routing", () => {
  it("renders LoginPage on root path /", () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={memoryRouter} />);
    expect(screen.getByRole("heading", { name: /sign in to subtrack/i })).toBeInTheDocument();
  });

  it("renders LoginPage on /login path", () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={memoryRouter} />);
    expect(screen.getByRole("heading", { name: /sign in to subtrack/i })).toBeInTheDocument();
  });

  it("renders DashboardPage on /dashboard", () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ["/dashboard"],
    });

    render(<RouterProvider router={memoryRouter} />);
    expect(screen.getByRole("heading", { name: /good evening, mykyta/i })).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-nav")).toBeInTheDocument();
  });

  it("renders AnalyticsPage on /analytics", () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ["/analytics"],
    });

    render(<RouterProvider router={memoryRouter} />);
    expect(
      screen.getByRole("heading", { name: /understand where your money goes/i })
    ).toBeInTheDocument();
  });

  it("renders CalendarPage on /calendar", () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ["/calendar"],
    });

    render(<RouterProvider router={memoryRouter} />);
    expect(screen.getByRole("heading", { name: /payment calendar/i })).toBeInTheDocument();
  });

  it("renders SettingsPage on /settings", () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ["/settings"],
    });

    render(<RouterProvider router={memoryRouter} />);
    expect(screen.getByRole("heading", { name: /account settings/i })).toBeInTheDocument();
  });

  it("renders NotFoundPage on unknown path", () => {
    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: ["/random-unknown-page"],
    });

    render(<RouterProvider router={memoryRouter} />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to dashboard/i })).toBeInTheDocument();
  });
});
