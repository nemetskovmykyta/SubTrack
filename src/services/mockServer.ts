import { Subscription, UserProfile, UserSettings } from "../types";
import { storageService } from "./storageService";
import { INITIAL_SUBSCRIPTIONS } from "./subscriptionService";

const STORAGE_KEYS = {
  SUBSCRIPTIONS: "subtrack_subscriptions",
  USER: "subtrack_current_user",
  SETTINGS: "subtrack_user_settings",
  TOKEN: "subtrack_auth_token",
};

export const DEFAULT_USER: UserProfile = {
  id: "usr-1",
  name: "Mykyta Nemetskov",
  email: "mykyta@example.com",
  plan: "Pro Plan",
  avatarInitials: "MN",
};

export const DEFAULT_SETTINGS: UserSettings = {
  autoConvert: true,
  emailReminders: true,
  telegramNotifications: true,
  currency: "UAH",
  language: "Ukrainian / English",
  reminderDaysBefore: 1,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function delay(ms: number): Promise<void> {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "test") {
    return Promise.resolve();
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let isInitialized = false;

export function setupMockServer(): void {
  if (isInitialized) return;
  if (typeof window === "undefined" && typeof globalThis === "undefined") return;

  const target = typeof window !== "undefined" ? window : globalThis;
  const originalFetch = target.fetch ? target.fetch.bind(target) : null;

  target.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const urlString =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input instanceof Request
            ? input.url
            : "";

    if (!urlString.includes("/api/")) {
      if (originalFetch) {
        return originalFetch(input, init);
      }
      return jsonResponse({ message: "Not found" }, 404);
    }

    await delay(120);

    const method = (init?.method || "GET").toUpperCase();
    const url = new URL(urlString, "http://localhost:3000");
    const pathname = url.pathname;

    let bodyData: Record<string, unknown> = {};
    if (init?.body && typeof init.body === "string") {
      try {
        bodyData = JSON.parse(init.body);
      } catch {
        bodyData = {};
      }
    }

    if (pathname === "/api/auth/login" && method === "POST") {
      const email = String(bodyData.email || "").trim();
      const password = String(bodyData.password || "");

      if (!email || !password) {
        return jsonResponse({ message: "Email and password are required" }, 400);
      }

      const user = storageService.get<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
      const token = `token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      storageService.set(STORAGE_KEYS.TOKEN, token);
      storageService.set(STORAGE_KEYS.USER, { ...user, email });

      return jsonResponse({ token, user: { ...user, email } }, 200);
    }

    if (pathname === "/api/auth/register" && method === "POST") {
      const name = String(bodyData.name || "").trim();
      const email = String(bodyData.email || "").trim();
      const password = String(bodyData.password || "");

      if (!name || !email || !password) {
        return jsonResponse({ message: "Name, email and password are required" }, 400);
      }

      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name,
        email,
        plan: "Standard Plan",
        avatarInitials: getInitials(name),
      };

      const token = `token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      storageService.set(STORAGE_KEYS.TOKEN, token);
      storageService.set(STORAGE_KEYS.USER, newUser);

      return jsonResponse({ token, user: newUser }, 201);
    }

    if (pathname === "/api/auth/me" && method === "GET") {
      const user = storageService.get<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
      return jsonResponse(user, 200);
    }

    if (pathname === "/api/auth/profile" && method === "PUT") {
      const current = storageService.get<UserProfile>(STORAGE_KEYS.USER, DEFAULT_USER);
      const updated: UserProfile = {
        ...current,
        name: typeof bodyData.name === "string" ? bodyData.name : current.name,
        email: typeof bodyData.email === "string" ? bodyData.email : current.email,
        avatarInitials:
          typeof bodyData.name === "string" ? getInitials(bodyData.name) : current.avatarInitials,
      };
      storageService.set(STORAGE_KEYS.USER, updated);
      return jsonResponse(updated, 200);
    }

    if (pathname === "/api/auth/logout" && method === "POST") {
      storageService.remove(STORAGE_KEYS.TOKEN);
      return jsonResponse({ success: true }, 200);
    }

    if (pathname === "/api/subscriptions" && method === "GET") {
      const all = storageService.get<Subscription[]>(
        STORAGE_KEYS.SUBSCRIPTIONS,
        INITIAL_SUBSCRIPTIONS
      );
      const category = url.searchParams.get("category");
      const search = url.searchParams.get("search")?.toLowerCase();

      let filtered = [...all];
      if (category && category !== "all") {
        filtered = filtered.filter((s) => s.category === category);
      }
      if (search) {
        filtered = filtered.filter(
          (s) => s.name.toLowerCase().includes(search) || s.category.toLowerCase().includes(search)
        );
      }

      return jsonResponse(filtered, 200);
    }

    if (pathname === "/api/subscriptions" && method === "POST") {
      const all = storageService.get<Subscription[]>(
        STORAGE_KEYS.SUBSCRIPTIONS,
        INITIAL_SUBSCRIPTIONS
      );
      const name = String(bodyData.name || "").trim();
      const price = Number(bodyData.price);

      if (!name || isNaN(price) || price <= 0) {
        return jsonResponse({ message: "Invalid subscription data" }, 400);
      }

      const newSub: Subscription = {
        id: `sub-${Date.now()}`,
        name,
        category: (bodyData.category as Subscription["category"]) || "Other",
        price,
        currency: (bodyData.currency as string) || "UAH",
        billingCycle: (bodyData.billingCycle as "monthly" | "yearly") || "monthly",
        nextPaymentDate:
          (bodyData.nextPaymentDate as string) ||
          new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
        icon: (bodyData.icon as Subscription["icon"]) || "spark",
        tone: (bodyData.tone as Subscription["tone"]) || "indigo",
        status: (bodyData.status as Subscription["status"]) || "active",
      };

      const updated = [newSub, ...all];
      storageService.set(STORAGE_KEYS.SUBSCRIPTIONS, updated);
      return jsonResponse(newSub, 201);
    }

    const subIdMatch = pathname.match(/^\/api\/subscriptions\/([^/]+)$/);
    if (subIdMatch) {
      const id = subIdMatch[1];
      const all = storageService.get<Subscription[]>(
        STORAGE_KEYS.SUBSCRIPTIONS,
        INITIAL_SUBSCRIPTIONS
      );

      if (method === "PUT" || method === "PATCH") {
        const index = all.findIndex((s) => s.id === id);
        if (index === -1) {
          return jsonResponse({ message: "Subscription not found" }, 404);
        }
        const updatedSub = { ...all[index], ...bodyData, id };
        all[index] = updatedSub as Subscription;
        storageService.set(STORAGE_KEYS.SUBSCRIPTIONS, all);
        return jsonResponse(updatedSub, 200);
      }

      if (method === "DELETE") {
        const nextList = all.filter((s) => s.id !== id);
        storageService.set(STORAGE_KEYS.SUBSCRIPTIONS, nextList);
        return jsonResponse({ success: true, id }, 200);
      }
    }

    if (pathname === "/api/settings" && method === "GET") {
      const settings = storageService.get<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      return jsonResponse(settings, 200);
    }

    if (pathname === "/api/settings" && (method === "PUT" || method === "PATCH")) {
      const current = storageService.get<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      const updated: UserSettings = {
        ...current,
        ...bodyData,
      };
      storageService.set(STORAGE_KEYS.SETTINGS, updated);
      return jsonResponse(updated, 200);
    }

    if (pathname === "/api/analytics" && method === "GET") {
      const all = storageService.get<Subscription[]>(
        STORAGE_KEYS.SUBSCRIPTIONS,
        INITIAL_SUBSCRIPTIONS
      );
      const active = all.filter((s) => s.status === "active");

      const monthlyTotal = active.reduce((sum, s) => {
        return sum + (s.billingCycle === "yearly" ? Math.round(s.price / 12) : s.price);
      }, 0);

      const yearlyTotal = monthlyTotal * 12;

      const categoryTotals: Record<string, number> = {};
      active.forEach((s) => {
        const cost = s.billingCycle === "yearly" ? Math.round(s.price / 12) : s.price;
        categoryTotals[s.category] = (categoryTotals[s.category] || 0) + cost;
      });

      return jsonResponse(
        {
          monthlyTotal,
          yearlyTotal,
          activeCount: active.length,
          categoryTotals,
        },
        200
      );
    }

    return jsonResponse({ message: `Route ${method} ${pathname} not found` }, 404);
  };

  isInitialized = true;
}
