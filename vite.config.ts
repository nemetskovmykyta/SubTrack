import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";

function mockarooPlugin(): Plugin {
  return {
    name: "vite-plugin-mockaroo-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlStr = req.url || "";
        if (!urlStr.startsWith("/api/")) {
          return next();
        }

        const url = new URL(urlStr, "http://localhost:3000");
        const pathname = url.pathname;
        const method = (req.method || "GET").toUpperCase();

        res.setHeader("Content-Type", "application/json");
        res.setHeader("X-Powered-By", "Mockaroo-Mock-API");
        res.setHeader("Access-Control-Allow-Origin", "*");

        if (pathname === "/api/mockaroo/status") {
          res.statusCode = 200;
          res.end(
            JSON.stringify(
              {
                provider: "mockaroo",
                status: "connected",
                baseUrl: "https://my.api.mockaroo.com",
                schemas: ["subscriptions", "users", "settings"],
              },
              null,
              2
            )
          );
          return;
        }

        if (pathname === "/api/subscriptions" && method === "GET") {
          const filePath = path.resolve(
            import.meta.dirname,
            "./mockaroo/mock-data/subscriptions.json"
          );
          let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          const category = url.searchParams.get("category");
          const search = url.searchParams.get("search")?.toLowerCase();

          if (category && category !== "all") {
            data = data.filter(
              (s: { category?: string }) => s.category?.toLowerCase() === category.toLowerCase()
            );
          }
          if (search) {
            data = data.filter(
              (s: { name?: string; category?: string }) =>
                s.name?.toLowerCase().includes(search) || s.category?.toLowerCase().includes(search)
            );
          }

          res.statusCode = 200;
          res.end(JSON.stringify(data, null, 2));
          return;
        }

        if (pathname === "/api/settings" && method === "GET") {
          const filePath = path.resolve(import.meta.dirname, "./mockaroo/mock-data/settings.json");
          const data = fs.readFileSync(filePath, "utf-8");
          res.statusCode = 200;
          res.end(data);
          return;
        }

        if (pathname === "/api/auth/me" && method === "GET") {
          const filePath = path.resolve(import.meta.dirname, "./mockaroo/mock-data/users.json");
          const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          res.statusCode = 200;
          res.end(JSON.stringify(users[0], null, 2));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), mockarooPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
