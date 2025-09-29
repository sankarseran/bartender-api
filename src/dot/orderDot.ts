import type { IOrderRepository, Order, OrderFilter } from "../model.js";

export class InMemoryOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  addOrder(order: Order): void {
    this.orders.push(order);
  }

  getOrder(key: string): Order | undefined {
    return this.orders.find(o => o.customerId === key);
  }

getOrdersByFilter(filter: OrderFilter): Order[] {
  return this.orders.filter(o => {
    if (filter.customerId && o.customerId !== filter.customerId) return false;
    if (filter.status && o.status !== filter.status) return false;
    if (filter.drinkType && o.drinkType !== filter.drinkType) return false;
    return true;
  });
}

  getAllOrders(): Order[] {
    return this.orders;
  }

  getUniqueCustomers(): string[] {
    return [...new Set(this.orders.map(o => o.customerId))];
  }

  updateOrder(customerId: string, updatedFields: Partial<Order>): boolean {
    const order = this.orders.find(o => o.customerId === customerId);
    if (!order) return false;

    Object.assign(order, updatedFields);
    return true;
  }
}
