export interface IOrderRepository {
  addOrder(order: Order): void;
  getOrder(key: string): Order | undefined;
  getAllOrders(): Order[];
  getOrdersByFilter(filter: OrderFilter): Order[];
  getUniqueCustomers(): string[];
}

export interface OrderFilter {
  customerId?: string;
  drinkType?: DrinkType;
  status?: OrderStatus;
}

export enum DrinkType {
  BEER = "BEER",
  DRINK = "DRINK",
}

export enum OrderStatus {
  PREPARING = "PREPARING",
  SERVED = "SERVED",
}

export interface Order {
  customerId: string;
  drinkType: DrinkType;
  status: OrderStatus;
  startedAt?: number;
  completedAt?: number;
}
