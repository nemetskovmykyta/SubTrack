import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { apiClient, ApiError } from "./apiClient";
import { storageService } from "./storageService";

describe("apiClient", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    storageService.remove("subtrack_auth_token");
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("handles token getter and setter correctly", () => {
    expect(apiClient.getToken()).toBeNull();
    apiClient.setToken("test-jwt-token");
    expect(apiClient.getToken()).toBe("test-jwt-token");
    apiClient.setToken(null);
    expect(apiClient.getToken()).toBeNull();
  });

  it("sends GET request with Authorization header when token is present", async () => {
    apiClient.setToken("my-secret-token");

    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    globalThis.fetch = mockFetch;

    const result = await apiClient.get<{ success: boolean }>("/api/test");

    expect(result).toEqual({ success: true });
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        method: "GET",
        headers: expect.any(Headers),
      })
    );

    const callHeaders = mockFetch.mock.calls[0][1].headers as Headers;
    expect(callHeaders.get("Authorization")).toBe("Bearer my-secret-token");
  });

  it("sends POST request with JSON body", async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "123" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      })
    );
    globalThis.fetch = mockFetch;

    const result = await apiClient.post<{ id: string }>("/api/items", { name: "item1" });

    expect(result).toEqual({ id: "123" });
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/items",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "item1" }),
      })
    );
  });

  it("throws ApiError when response is not ok", async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    );
    globalThis.fetch = mockFetch;

    await expect(apiClient.post("/api/auth/login", {})).rejects.toThrow(ApiError);
  });
});
