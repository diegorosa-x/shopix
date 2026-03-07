import { MOCK_ORDERS } from '../../mock/data';
import { Order, OrderStatus } from '../../core/types';
import { sleep } from '../../utils';

// Legacy service for backward compatibility
export const orderService = {
  async getOrders() {
    await sleep(800);
    return [...MOCK_ORDERS];
  },

  async getOrderById(id: string) {
    await sleep(500);
    const order = MOCK_ORDERS.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  },

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) {
    await sleep(2000);
    const newOrder: Order = {
      ...orderData,
      id: 'ord_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'Pago',
    };
    MOCK_ORDERS.unshift(newOrder);
    return newOrder;
  },

  async updateOrderStatus(id: string, status: OrderStatus) {
    await sleep(1000);
    const index = MOCK_ORDERS.findIndex((o) => id === o.id);
    if (index === -1) throw new Error('Order not found');
    MOCK_ORDERS[index].status = status;
    return MOCK_ORDERS[index];
  },

  async getDashboardStats() {
    await sleep(1000);
    const totalRevenue = MOCK_ORDERS.reduce((acc, o) => acc + o.total, 0);
    const totalOrders = MOCK_ORDERS.length;
    const totalUsers = 150;
    const totalProducts = 45;

    const salesData = [
      { date: '2024-03-01', amount: 1200 },
      { date: '2024-03-02', amount: 1900 },
      { date: '2024-03-03', amount: 1500 },
      { date: '2024-03-04', amount: 2100 },
      { date: '2024-03-05', amount: 2500 },
      { date: '2024-03-06', amount: 2200 },
    ];

    const categoryData = [
      { name: 'Relógios', value: 400 },
      { name: 'Óculos', value: 300 },
      { name: 'Bolsas', value: 300 },
      { name: 'Joias', value: 200 },
    ];

    return {
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      salesData,
      categoryData,
    };
  }
};
