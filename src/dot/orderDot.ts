import type { IOrderRepository, Order, OrderFilter } from "../model.js";

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  addOrder(order: Order): void {
    this.orders.push(order);
  }

  getOrder(key: string): Order | undefined {
    return this.orders.find(o => o.customerId === key);
  }

  getOrdersByCondition(filterVal: OrderFilter): Order[] {
    return this.orders.filter(
      o =>
        o.customerId === filterVal.customerId &&
        o.status === filterVal.status &&
        o.drinkType === filterVal.drinkType
    );
  }

  getAllOrders(): Order[] {
    return this.orders;
  }

  getUniqueCustomers(): string[] {
    return [...new Set(this.orders.map(o => o.customerId))];
  }
}
