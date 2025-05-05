import type React from "react"

import { useEffect, useState, useRef } from "react"
import { MessageSquare, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion";

interface ChatBotProps {
  //   clientId: string
  botName?: string
  welcomeMessage?: string
}

interface Message {
  id: string
  content: string
  role: "user" | "bot"
  timestamp: Date
}

export function ChatBot({
  //   clientId,
  botName = "Assistant",
  welcomeMessage = "Hello! How can I help you today?",
}: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const clientRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const clientId = import.meta.env.VITE_CHATBOT_CLIENT_KEY

  useEffect(() => {
    import("@botpress/webchat")
      .then(({ getClient }) => {
        clientRef.current = getClient({ clientId })

        // Initialize the client
        const initClient = async () => {
          try {
            // Listen for messages from the bot
            clientRef.current.on("message", (message: any) => {

              // Extract the message content properly based on the message structure
              let content = ""

              // Handle the specific format you're receiving
              if (message.payload && typeof message.payload === "object") {
                if (message.payload.block && message.payload.block.text) {
                  // Extract from the block.text format
                  content = message.payload.block.text
                } else if (message.payload.type === "text") {
                  content = message.payload.text
                } else if (message.payload.text) {
                  content = message.payload.text
                } else {
                  // Fallback for other message types - display in a readable format
                  try {
                    content = JSON.stringify(message.payload, null, 2)
                  } catch (e) {
                    content = "Received a message (unable to display)"
                  }
                }
              } else if (typeof message.payload === "string") {
                try {
                  const parsedPayload = JSON.parse(message.payload)
                  if (parsedPayload.block && parsedPayload.block.text) {
                    content = parsedPayload.block.text
                  } else {
                    content = message.payload
                  }
                } catch (e) {
                  // If it's not valid JSON, use it as is
                  content = message.payload
                }
              } else {
                content = "Received a message"
              }

              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now().toString(),
                  content: content,
                  role: "bot",
                  timestamp: new Date(),
                },
              ])
              setIsLoading(false)
            })

            // Connect to the Botpress server
            await clientRef.current.connect()
            setIsConnected(true)

            setMessages([
              {
                id: "welcome",
                content: welcomeMessage,
                role: "bot",
                timestamp: new Date(),
              },
            ])
          } catch (error) {
            console.error("Failed to initialize Botpress client:", error)
          }
        }

        initClient()
      })
      .catch((error) => {
        console.error("Failed to load Botpress webchat client:", error)
      })

    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect()
      }
    }
  }, [clientId, welcomeMessage])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!inputValue.trim() || !isConnected || !clientRef.current) return

    // Add user message to the chat
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      await clientRef.current.sendMessage({
        type: "text",
        text: inputValue,
        metadata: {},
      })
    } catch (error) {
      console.error("Failed to send message:", error)
      setIsLoading(false)
    }
  }

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="w-80 md:w-96 shadow-xl border-0 overflow-hidden">
              <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </Avatar>
                  <CardTitle className="text-base font-medium">{botName}</CardTitle>
                </div>

                <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 bg-gradient-to-b from-background/50 to-background">
                <ScrollArea className="h-[350px] p-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4 opacity-60">
                      <MessageSquare className="h-12 w-12 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">No messages yet. Start a conversation!</p>
                    </div>
                  )}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex mb-4", message.role === "user" ? "justify-end" : "justify-start")}
                    >
                      {message.role === "bot" && (
                        <Avatar className="h-8 w-8 mr-2 ring-2 ring-primary/20">
                          <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                            {botName.charAt(0)}
                          </div>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl p-3",
                            message.role === "user"
                              ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground ml-auto shadow-sm"
                              : "bg-muted/80 backdrop-blur-sm shadow-sm",
                          )}
                        >
                          {message.content}
                        </div>
                        <div
                          className={cn(
                            "text-xs text-muted-foreground mt-1",
                            message.role === "user" ? "text-right" : "text-left",
                          )}
                        >
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 ml-2 ring-2 ring-primary/20">
                          <div className="flex h-full w-full items-center justify-center bg-zinc-700 text-zinc-100 text-xs font-bold">
                            U
                          </div>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <Avatar className="h-8 w-8 mr-2 ring-2 ring-primary/20">
                        <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                          {botName.charAt(0)}
                        </div>
                      </Avatar>
                      <div className="bg-muted/80 p-3 rounded-2xl">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                          <span className="h-2 w-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                          <span className="h-2 w-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 border-t bg-background/80 backdrop-blur-sm">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={!isConnected}
                    className="flex-1 bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/40"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!isConnected || !inputValue.trim()}
                    className="rounded-full"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Button
              onClick={toggleChat}
              className="shadow-lg rounded-full px-5 py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
              variant="default"
            >
              <Bot className="mr-2 h-5 w-5" /> Chat Support
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}



