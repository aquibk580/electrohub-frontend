import axios from "axios"

type EmailOptions = {
  to: string
  subject: string
  message?: string
  image?: string
  templateData?: Record<string, any>
}

class Mail {
  private static API_URL = "http://localhost:8000/api/sendmail"

  /**
   * Send a success email
   */
  static async success(options: EmailOptions): Promise<boolean> {
    return this.send({
      ...options,
      type: "success",
    })
  }

  /**
   * Send an error/failure email
   */
  static async error(options: EmailOptions): Promise<boolean> {
    return this.send({
      ...options,
      type: "error",
    })
  }

  /**
   * Send an info email
   */
  static async info(options: EmailOptions): Promise<boolean> {
    return this.send({
      ...options,
      type: "info",
    })
  }

  /**
   * Send a custom email
   */
  static async custom(options: EmailOptions & { html: string }): Promise<boolean> {
    try {
      const response = await axios.post(this.API_URL, {
        to: options.to,
        subject: options.subject,
        message: options.html,
        type: "custom",
      })

      return response.status === 200
    } catch (error) {
      console.error("Error sending email:", error)
      return false
    }
  }

  /**
   * Send an email with a predefined template
   */
  private static async send(data: EmailOptions & { type: string }): Promise<boolean> {
    try {
      const response = await axios.post(this.API_URL, {
        to: data.to,
        subject: data.subject,
        message: data.message || "",
        type: data.type,
        image: data.image,
        templateData: data.templateData,
      })

      return response.status === 200
    } catch (error) {
      console.error("Error sending email:", error)
      return false
    }
  }
}

export default Mail





// // Send a success email
// await Mail.success({
//   to: "customer@example.com",
//   subject: "Order Confirmation",
//   message: "Thank you for your purchase! Your order #12345 has been confirmed."
// });

// // Send an error notification
// await Mail.error({
//   to: "user@example.com",
//   subject: "Login Attempt Failed",
//   message: "We detected a failed login attempt on your account."
// });

// // Send an information email with an image
// await Mail.info({
//   to: "subscriber@example.com",
//   subject: "Weekly Newsletter",
//   message: "Here are this week's top stories...",
//   image: "https://example.com/newsletter-header.jpg"
// });

// // Send a completely custom HTML email
// await Mail.custom({
//   to: "developer@example.com",
//   subject: "API Documentation",
//   html: "<div style='color: blue;'>Your custom HTML content here</div>"
// });

