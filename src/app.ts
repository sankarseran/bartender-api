import express from "express";
import router from "./routes.js";
import { setupSwagger, auditLogger } from "./middleware/index.js";

const app = express();

app.use(express.json());

app.use(auditLogger);

setupSwagger(app);

app.use("/", router);

app.use("", (_, res) => res.status(200).json({ message: "Bartender app is up and running!!" }));

export default app;
