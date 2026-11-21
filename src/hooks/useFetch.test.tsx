import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "./useFetch";
import { apiClient } from "../services";

describe("useFetch", () => {
  it("fetches data immediately by default", async () => {
    vi.spyOn(apiClient, "get").mockResolvedValueOnce({ message: "Hello" });

    const { result } = renderHook(() => useFetch<{ message: string }>("/api/hello"));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual({ message: "Hello" });
    expect(result.current.error).toBeNull();
  });

  it("handles fetch error gracefully", async () => {
    vi.spyOn(apiClient, "get").mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useFetch("/api/fail"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe("Network error");
    expect(result.current.data).toBeNull();
  });

  it("does not fetch immediately when immediate option is false", () => {
    const spy = vi.spyOn(apiClient, "get");

    const { result } = renderHook(() => useFetch("/api/manual", { immediate: false }));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });
});
