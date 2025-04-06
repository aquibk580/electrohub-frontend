import { Order, OrderItem } from "@/types/entityTypes";
import axios from "axios";
interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  answer: string;
  gender: "Male" | "Female";
}

type OrderPayload = Order;
type OrderItemPayload = { order: OrderItem; user: User };

class Mail {
  private static API_URL = `${import.meta.env.VITE_API_URL}/api/sendmail`;

  static async OrderConfirmed(order: Order): Promise<boolean> {
    return this.send(order, "OrderConfirmed");
  }

  static async Shipped(data: {
    order: OrderItem;
    user: User;
  }): Promise<boolean> {
    return this.send(data, "Shipped");
  }

  static async Delivered(data: {
    order: OrderItem;
    user: User;
  }): Promise<boolean> {
    return this.send(data, "Delivered");
  }

  static async Cancelled(data: {
    order: OrderItem;
    user: User;
  }): Promise<boolean> {
    return this.send(data, "Cancelled");
  }

  static async Returned(data: {
    order: OrderItem;
    user: User;
  }): Promise<boolean> {
    return this.send(data, "Returned");
  }

  static async custom(order: Order & { type: string }): Promise<boolean> {
    try {
      const response = await axios.post(this.API_URL, {
        ...order,
        type: order.type,
      });

      return response.status === 200;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  private static async send(
    data: OrderPayload | OrderItemPayload,
    type: string
  ): Promise<boolean> {
    try {
      const payload = { ...data, type };
      const response = await axios.post(this.API_URL, payload);
      return response.status === 200;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
}

export default Mail;
