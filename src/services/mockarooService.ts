import { Subscription, UserProfile, UserSettings } from "../types";
import seedSubscriptions from "../../mockaroo/mock-data/subscriptions.json";
import seedUsers from "../../mockaroo/mock-data/users.json";
import seedSettings from "../../mockaroo/mock-data/settings.json";

export interface MockarooConfig {
  provider: string;
  baseUrl: string;
  apiKey: string;
  delayMs: number;
}

export interface SubscriptionQueryParams {
  category?: string | null;
  search?: string | null;
  status?: string | null;
  sort?: "price" | "name" | "nextPaymentDate" | null;
  order?: "asc" | "desc" | null;
  limit?: number | null;
}

export const mockarooService = {
  getConfig(): MockarooConfig {
    const env = typeof import.meta !== "undefined" ? import.meta.env : undefined;
    return {
      provider: env?.VITE_API_PROVIDER || "mockaroo",
      baseUrl: env?.VITE_MOCKAROO_BASE_URL || "https://my.api.mockaroo.com",
      apiKey: env?.VITE_MOCKAROO_API_KEY || "subtrack_demo_key",
      delayMs: Number(env?.VITE_API_DELAY_MS) || 120,
    };
  },

  buildMockarooUrl(endpoint: string): string {
    const config = this.getConfig();
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    const url = new URL(cleanEndpoint, config.baseUrl);
    url.searchParams.set("key", config.apiKey);
    return url.toString();
  },

  getSeedSubscriptions(): Subscription[] {
    return seedSubscriptions as Subscription[];
  },

  getSeedUsers(): UserProfile[] {
    return seedUsers as UserProfile[];
  },

  getSeedSettings(): UserSettings {
    return seedSettings as UserSettings;
  },

  validateSubscription(data: Partial<Subscription>): { valid: boolean; error?: string } {
    if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
      return { valid: false, error: "Name is required and must be a non-empty string" };
    }
    const price = Number(data.price);
    if (isNaN(price) || price <= 0) {
      return { valid: false, error: "Price must be a positive number" };
    }
    if (!data.category || typeof data.category !== "string") {
      return { valid: false, error: "Category is required" };
    }
    return { valid: true };
  },

  validateUser(data: Partial<UserProfile>): { valid: boolean; error?: string } {
    if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
      return { valid: false, error: "User name is required" };
    }
    if (!data.email || typeof data.email !== "string" || !data.email.includes("@")) {
      return { valid: false, error: "Valid email address is required" };
    }
    return { valid: true };
  },

  filterSubscriptions(items: Subscription[], params: SubscriptionQueryParams): Subscription[] {
    let result = [...items];

    if (params.category && params.category !== "all") {
      result = result.filter((s) => s.category.toLowerCase() === params.category?.toLowerCase());
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
      );
    }

    if (params.status && params.status !== "all") {
      result = result.filter((s) => s.status === params.status);
    }

    if (params.sort) {
      const sortField = params.sort;
      const orderFactor = params.order === "desc" ? -1 : 1;
      result.sort((a, b) => {
        if (sortField === "price") {
          return (a.price - b.price) * orderFactor;
        }
        if (sortField === "name") {
          return a.name.localeCompare(b.name) * orderFactor;
        }
        if (sortField === "nextPaymentDate") {
          return a.nextPaymentDate.localeCompare(b.nextPaymentDate) * orderFactor;
        }
        return 0;
      });
    }

    if (params.limit && params.limit > 0) {
      result = result.slice(0, params.limit);
    }

    return result;
  },
};
