import { Router } from "express";
import { InMemoryOrderRepository } from "./dot/orderDot.js";
import { BartenderService } from "./services/bartenderService.js";
import { OrderController } from "./controllers/orderController.js";
import { validateOrder } from "./middleware/index.js";

const router = Router();
const repo = new InMemoryOrderRepository();
const service = new BartenderService(repo);
const controller = new OrderController(service);


/**
 * @openapi
 * /order:
 *   post:
 *     summary: Place a drink order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: string
 *               drinkType:
 *                 type: string
 *                 enum: [BEER, DRINK]
 *     responses:
 *       200:
 *         description: Order accepted
 *       429:
 *         description: Bartender at capacity
 */
router.post("/order", validateOrder, (req, res) => controller.placeOrder(req, res));

/**
 * @openapi
 * /status:
 *   get:
 *     summary: Get status of served orders
 *     responses:
 *       200:
 *         description: List of orders and unique customers
 */
router.get("/status", (req, res) => controller.getStatus(req, res));

export default router;
