import type { Request, Response, NextFunction } from "express";
import { DrinkType } from "../model.js";

export function validateOrder(req: Request, res: Response, next: NextFunction): Response | undefined {
  const { customerId, drinkType } = req.body;

  if (!customerId || typeof customerId !== "string") {
    return res.status(400).json({ error: "customerId is required and must be a string" });
  }

  if (!Object.values(DrinkType).includes(drinkType)) {
    return res.status(400).json({ error: `Invalid drinkType. Allowed: ${Object.values(DrinkType).join(", ")}` });
  }

  next();
}
