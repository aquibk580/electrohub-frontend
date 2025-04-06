import { Order } from "@/types/entityTypes";
import axios from "axios";

type EmailOptions = {
  to: string;
  subject: string;
  message?: string;
  image?: string;
  templateData?: Record<string, any>;
};

class Mail {
  private static API_URL = `${import.meta.env.VITE_API_URL}/api/sendmail`;

  /**
   * Send a success email
   */
  static async success(order: Order): Promise<boolean> {
    return this.send(order, "success");
  }

  static async OrderConfirmed(order: Order): Promise<boolean> {
    return this.send(order, "OrderConfirmed");
  }

  /**
   * Send an error/failure email
   */
  static async error(order: Order): Promise<boolean> {
    return this.send(order, "error");
  }

  /**
   * Send an info email
   */
  static async info(order: Order): Promise<boolean> {
    return this.send(order, "info");
  }

  /**
   * Send a custom email
   */
  static async custom(order: Order & { type: string }): Promise<boolean> {
    try {
      const response = await axios.post(this.API_URL, {
        order,
        type: "custom",
      });

      return response.status === 200;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  /**
   * Send an email with a predefined template
   */
  private static async send(data: Order, type: string): Promise<boolean> {
    try {
      const response = await axios.post(this.API_URL, {
        ...data,
        type,
      });

      return response.status === 200;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }
}

export default Mail;