import {
  DrinkType,
  OrderStatus,
  type IOrderRepository,
  type Order,
} from "../model.js";

export class BartenderService {
  constructor(
    private repo: IOrderRepository,
    private prepTime = Number(process.env.PREP_TIME) * 1000 || 5000,
    private bartenders = Number(process.env.BARTENDERS) || 1,
  ) {}

  canAcceptOrder(drinkType: DrinkType): boolean {
    const activeOrders = this.repo.getOrdersByFilter({
      status: OrderStatus.PREPARING,
    });

    const totalUsedSlots = activeOrders.reduce((sum, order) => {
      return sum + (order.drinkType === DrinkType.BEER ? 0.5 : 1);
    }, 0);

    const neededSlots = drinkType === DrinkType.BEER ? 0.5 : 1;

    return totalUsedSlots + neededSlots <= this.bartenders;
  }

  placeOrder(order: Order): boolean {
    const isOrderExists = this.repo.getOrdersByFilter(order)?.length;

    if (isOrderExists || !this.canAcceptOrder(order.drinkType)) {
      return false;
    }

    order.startedAt = Date.now();
    this.repo.addOrder(order);

    this.completeOrder(order);

    return true;
  }

  private completeOrder(order: Order) {
    setTimeout(() => {
      this.repo.updateOrder(order.customerId, {
        status: OrderStatus.SERVED,
        completedAt: Date.now(),
      })
    }, this.prepTime);
  }

  getStatus() {
    return {
      servedOrders: this.repo.getAllOrders(),
      uniqueCustomers: this.repo.getUniqueCustomers(),
    };
  }
}
