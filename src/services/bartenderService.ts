import { DrinkType, OrderStatus, type IOrderRepository, type Order } from "../model.js";

export class BartenderService {
  constructor(
    private repo: IOrderRepository,
    private prepTime = Number(process.env.PREP_TIME) * 1000 || 5000,
    private bartenders = Number(process.env.BARTENDERS) || 1,
  ) {}

  canAcceptOrder(drinkType: DrinkType): boolean {
    const activeOrders = this.repo.getAllOrders().filter(o => o.status === OrderStatus.PREPARING);

    if (drinkType === DrinkType.BEER) {
      const activeBeers = activeOrders.filter(o => o.drinkType === DrinkType.BEER).length;
      return activeBeers < (this.bartenders * 2);
    } else {
      const activeNonBeers = activeOrders.filter(o => o.drinkType !== DrinkType.BEER).length;
      return activeNonBeers < this.bartenders;
    }
  }

  placeOrder(order: Order): boolean {
    const isOrderExists = this.repo.getOrdersByCondition(order)?.length;

    if (isOrderExists || !this.canAcceptOrder(order.drinkType)) {
      return false;
    }

    order.startedAt = Date.now();
    this.repo.addOrder(order);

    setTimeout(() => {
      order.status = OrderStatus.SERVED;
      order.completedAt = Date.now();
    }, this.prepTime);

    return true;
  }

  getStatus() {
    return {
      servedOrders: this.repo.getAllOrders(),
      uniqueCustomers: this.repo.getUniqueCustomers(),
    };
  }
}
