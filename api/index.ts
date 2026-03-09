import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

// Cache the app instance across invocations (Vercel keeps the lambda warm)
let _app: any = null;

function getApp() {
    if (!_app) {
        _app = express();
        _app.use(express.json({ limit: "50mb" }));
        _app.use(express.urlencoded({ limit: "50mb", extended: true }));

        // Mount tRPC at /api/trpc
        _app.use(
            "/api/trpc",
            createExpressMiddleware({
                router: appRouter,
                createContext,
            })
        );
    }
    return _app;
}

export default function handler(req: any, res: any) {
    const app = getApp();
    return app(req, res);
}
