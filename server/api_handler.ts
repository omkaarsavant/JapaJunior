import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";

console.log("[SERVERLESS] Handler module loaded successfully.");
console.log("[SERVERLESS] Node version:", process.version);
console.log("[SERVERLESS] Environment:", process.env.NODE_ENV);

// Cache the app instance across invocations
let _app: any = null;

function getApp() {
    if (!_app) {
        console.log("[SERVERLESS] Initializing Express app...");
        _app = express();

        // Increased limits for large image payloads
        _app.use(express.json({ limit: "50mb" }));
        _app.use(express.urlencoded({ limit: "50mb", extended: true }));

        // Diagnostic health endpoint
        _app.get("/api/health", (req: any, res: any) => {
            console.log("[SERVERLESS] Health check hit");
            res.json({
                status: "ok",
                timestamp: new Date().toISOString(),
                env: process.env.NODE_ENV,
                hasKey: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY
            });
        });

        // Mount tRPC
        console.log("[SERVERLESS] Mounting tRPC at /api/trpc");
        _app.use(
            "/api/trpc",
            (req: any, res: any, next: any) => {
                console.log(`[SERVERLESS] tRPC Request: ${req.method} ${req.url}`);
                next();
            },
            createExpressMiddleware({
                router: appRouter,
                createContext,
            })
        );

        // Fallback for debugging
        _app.use((req: any, res: any) => {
            console.log(`[SERVERLESS] Unhandled route: ${req.method} ${req.url}`);
            res.status(404).json({ error: "Route not found", path: req.url });
        });
    }
    return _app;
}

export default function handler(req: any, res: any) {
    console.log(`[SERVERLESS] Invoking handler for: ${req.method} ${req.url}`);
    try {
        const app = getApp();
        return app(req, res);
    } catch (error) {
        console.error("[SERVERLESS] Global handler error:", error);
        res.status(500).json({ error: "Internal server error during invocation" });
    }
}
