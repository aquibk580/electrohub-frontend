"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
// import Mail from "../utils/Mail"
import Mail from "@/lib/Mail"

type FormData = {
  to: string
  subject: string
  message: string
  emailType: "success" | "error" | "info" | "custom"
  image: string
}

export default function Test() {
  const { register, handleSubmit, reset, watch } = useForm<FormData>({
    defaultValues: {
      emailType: "success",
      image: "",
    },
  })
  const [status, setStatus] = useState<{ success?: boolean; message?: string }>({})

  const onSubmit = async (data: FormData) => {
    setStatus({ message: "Sending email..." })
    let success = false

    try {
      switch (data.emailType) {
        case "success":
          success = await Mail.success({
            to: data.to,
            subject: data.subject,
            message: data.message,
            image: data.image || undefined,
          })
          break
        case "error":
          success = await Mail.error({
            to: data.to,
            subject: data.subject,
            message: data.message,
            image: data.image || undefined,
          })
          break
        case "info":
          success = await Mail.info({
            to: data.to,
            subject: data.subject,
            message: data.message,
            image: data.image || undefined,
          })
          break
        case "custom":
          success = await Mail.custom({
            to: data.to,
            subject: data.subject,
            html: data.message,
            image: data.image || undefined,
          })
          break
      }

      if (success) {
        setStatus({ success: true, message: "Email sent successfully!" })
        reset()
      } else {
        setStatus({ success: false, message: "Failed to send email" })
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus({ success: false, message: "An error occurred while sending the email" })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-4">
      <h1 className="text-2xl font-bold mb-4">Email Sender</h1>

      {status.message && (
        <div
          className={`mb-4 p-3 rounded w-full max-w-md ${
            status.success === undefined
              ? "bg-blue-100 text-blue-800"
              : status.success
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Email Type</label>
          <select {...register("emailType")} className="w-full p-2 border rounded">
            <option value="success">Success</option>
            <option value="error">Error</option>
            <option value="info">Information</option>
            <option value="custom">Custom HTML</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Recipient Email</label>
          <input
            {...register("to")}
            type="email"
            placeholder="recipient@example.com"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            {...register("subject")}
            type="text"
            placeholder="Email Subject"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {watch("emailType") === "custom" ? "HTML Content" : "Message"}
          </label>
          <textarea
            {...register("message")}
            placeholder={watch("emailType") === "custom" ? "<p>Your HTML here</p>" : "Your message here"}
            required
            className="w-full p-2 border rounded h-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
          <input
            {...register("image")}
            type="text"
            placeholder="https://example.com/image.jpg"
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors">
          Send Email
        </button>
      </form>
    </div>
  )
}

