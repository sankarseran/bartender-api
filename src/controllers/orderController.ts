import type { Request, Response } from "express";
import type { BartenderService } from "../services/bartenderService.js";
import { OrderStatus, type DrinkType, type Order } from "../model.js";

export class OrderController {
  constructor(private bartender: BartenderService) {}

  placeOrder(req: Request, res: Response) {
    const { customerId, drinkType } = req.body as { customerId: string; drinkType: DrinkType };
    const order: Order = { customerId, drinkType, status: OrderStatus.PREPARING };
    if (!this.bartender.placeOrder(order)) {
      return res.status(429).json({ error: "Bartender at capacity or duplicate order" });
    }
    return res.status(200).json({ message: "Order accepted", order });
  }

  getStatus(req: Request, res: Response) {
    res.json(this.bartender.getStatus());
  }
}
