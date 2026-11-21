import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useSubscriptions } from "./useSubscriptions";
import { storageService, INITIAL_SUBSCRIPTIONS } from "../services";

describe("useSubscriptions", () => {
  beforeEach(() => {
    storageService.set("subtrack_subscriptions", INITIAL_SUBSCRIPTIONS);
  });

  it("loads initial subscriptions from api", async () => {
    const { result } = renderHook(() => useSubscriptions());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.subscriptions.length).toBeGreaterThan(0);
    expect(result.current.monthlyTotal).toBeGreaterThan(0);
  });

  it("adds a new subscription", async () => {
    const { result } = renderHook(() => useSubscriptions());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const initialLength = result.current.subscriptions.length;

    await act(async () => {
      await result.current.addSubscription({
        name: "Figma Pro",
        category: "Work",
        price: 450,
        currency: "UAH",
        billingCycle: "monthly",
        nextPaymentDate: "2026-11-20",
        icon: "spark",
        tone: "indigo",
        status: "active",
      });
    });

    expect(result.current.subscriptions.length).toBe(initialLength + 1);
    expect(result.current.subscriptions[0].name).toBe("Figma Pro");
  });

  it("deletes a subscription", async () => {
    const { result } = renderHook(() => useSubscriptions());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const toDeleteId = result.current.subscriptions[0].id;
    const initialLength = result.current.subscriptions.length;

    await act(async () => {
      await result.current.deleteSubscription(toDeleteId);
    });

    expect(result.current.subscriptions.length).toBe(initialLength - 1);
    expect(result.current.subscriptions.find((s) => s.id === toDeleteId)).toBeUndefined();
  });

  it("filters subscriptions by search query", async () => {
    const { result } = renderHook(() => useSubscriptions());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setSearchQuery("netflix");
    });

    expect(
      result.current.filteredSubscriptions.every((s) => s.name.toLowerCase().includes("netflix"))
    ).toBe(true);
  });

  it("filters subscriptions by category", async () => {
    const { result } = renderHook(() => useSubscriptions());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setSelectedCategory("Sport");
    });

    expect(result.current.filteredSubscriptions.every((s) => s.category === "Sport")).toBe(true);
  });
});
