import { defineApp } from "convex/server";
import betterAuth from "@convex-dev/better-auth/convex.config";

const app = defineApp();
// here we are saying convex to use betterAuth
app.use(betterAuth);

export default app;