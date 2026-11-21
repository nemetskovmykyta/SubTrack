import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import React from "react";
import { AuthProvider } from "../context";
import { useAuth } from "./useAuth";
import { storageService } from "../services";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe("useAuth", () => {
  beforeEach(() => {
    storageService.remove("subtrack_auth_token");
    storageService.remove("subtrack_current_user");
  });

  it("handles successful login", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    let success = false;
    await act(async () => {
      success = await result.current.login({
        email: "alex@example.com",
        password: "secretpassword",
      });
    });

    expect(success).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.email).toBe("alex@example.com");
  });

  it("handles login failure on empty credentials", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    let success = true;
    await act(async () => {
      success = await result.current.login({
        email: "",
        password: "",
      });
    });

    expect(success).toBe(false);
    expect(result.current.error).toBeTruthy();
  });

  it("handles user registration", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    let success = false;
    await act(async () => {
      success = await result.current.register({
        name: "Olena Kovalenko",
        email: "olena@example.com",
        password: "secretpassword",
      });
    });

    expect(success).toBe(true);
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.name).toBe("Olena Kovalenko");
    expect(result.current.user?.avatarInitials).toBe("OK");
  });

  it("handles logout", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({
        email: "alex@example.com",
        password: "secretpassword",
      });
    });

    expect(result.current.isAuthenticated).toBe(true);

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });
});
