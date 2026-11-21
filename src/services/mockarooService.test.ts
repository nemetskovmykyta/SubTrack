import { describe, it, expect } from "vitest";
import { mockarooService } from "./mockarooService";
import { apiClient } from "./apiClient";

describe("mockarooService", () => {
  it("provides valid Mockaroo configuration", () => {
    const config = mockarooService.getConfig();
    expect(config.provider).toBe("mockaroo");
    expect(config.baseUrl).toContain("mockaroo");
    expect(config.apiKey).toBeTruthy();
  });

  it("builds Mockaroo URLs with api key query param", () => {
    const url = mockarooService.buildMockarooUrl("/subscriptions.json");
    expect(url).toContain("https://my.api.mockaroo.com/subscriptions.json");
    expect(url).toContain("key=");
  });

  it("loads Mockaroo seed datasets properly", () => {
    const subscriptions = mockarooService.getSeedSubscriptions();
    const users = mockarooService.getSeedUsers();
    const settings = mockarooService.getSeedSettings();

    expect(subscriptions.length).toBeGreaterThanOrEqual(5);
    expect(users.length).toBeGreaterThanOrEqual(1);
    expect(settings.currency).toBe("UAH");
  });

  it("validates subscription schema accurately", () => {
    const valid = mockarooService.validateSubscription({
      name: "Megogo",
      price: 299,
      category: "Entertainment",
    });
    expect(valid.valid).toBe(true);

    const missingName = mockarooService.validateSubscription({
      name: "",
      price: 299,
      category: "Entertainment",
    });
    expect(missingName.valid).toBe(false);

    const invalidPrice = mockarooService.validateSubscription({
      name: "Test",
      price: -10,
      category: "Entertainment",
    });
    expect(invalidPrice.valid).toBe(false);
  });

  it("filters and sorts subscriptions in Mockaroo style", () => {
    const seed = mockarooService.getSeedSubscriptions();

    const entertainmentOnly = mockarooService.filterSubscriptions(seed, {
      category: "Entertainment",
    });
    expect(entertainmentOnly.every((s) => s.category.toLowerCase() === "entertainment")).toBe(true);

    const sortedByPriceAsc = mockarooService.filterSubscriptions(seed, {
      sort: "price",
      order: "asc",
    });
    for (let i = 0; i < sortedByPriceAsc.length - 1; i++) {
      expect(sortedByPriceAsc[i].price).toBeLessThanOrEqual(sortedByPriceAsc[i + 1].price);
    }
  });

  it("returns Mockaroo mock server status via API", async () => {
    const status = await apiClient.get<{
      provider: string;
      status: string;
      schemas: string[];
    }>("/api/mockaroo/status");

    expect(status.provider).toBe("mockaroo");
    expect(status.status).toBe("connected");
    expect(status.schemas).toContain("subscriptions");
  });
});
