"use client"

import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, ArrowLeft } from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isAdmin: boolean
}

const ChatLayout = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [user, setUser] = useState<{ name: string; type: string } | null>(null)

  useEffect(() => {
    if (location.state?.message) {
      const { sender, type } = location.state.message
      setUser({ name: sender, type })
    }
    // In a real application, you would fetch the chat history here
    setMessages([
      {
        id: 1,
        sender: "User",
        content: "Hello, I have a question about my order.",
        timestamp: "10:00 AM",
        isAdmin: false,
      },
      {
        id: 2,
        sender: "Admin",
        content: "Hi there! I'd be happy to help. What's your order number?",
        timestamp: "10:05 AM",
        isAdmin: true,
      },
    ])
  }, [location.state])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "Admin",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isAdmin: true,
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-5/6 p-5">
      <Card className="flex-grow flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.name}`} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle>{user?.name || "Chat"}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden flex flex-col">
          <ScrollArea className="flex-grow pr-4">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.isAdmin ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block p-2 rounded-lg ${message.isAdmin ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-50">{message.timestamp}</span>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center mt-4">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-grow mr-2"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatLayout

