import type { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logsDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFilePath = path.join(logsDir, "audit.log");

export function auditLogger(req: Request, res: Response, next: NextFunction) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    body: req.body,
  };

  const logLine = JSON.stringify(logEntry) + "\n";

  console.log(logLine);

  fs.appendFile(logFilePath, logLine, err => {
    if (err) console.error("Failed to write audit log:", err);
  });

  next();
}
