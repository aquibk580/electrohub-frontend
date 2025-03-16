// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Bot, User, ChevronDown } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface Message {
//   text: string;
//   isBot: boolean;
//   timestamp: string;
// }

// const predefinedQuestions = {
//   "Shipping": "How long does shipping take?",
//   "Returns": "What's your return policy?",
//   "Payment": "What payment methods do you accept?",
//   "Tracking": "How can I track my order?",
//   "Size": "How can I find my size?",
//   "Contact": "How can I contact customer service?"
// };

// const responses = {
//   "How long does shipping take?": "We typically process and ship orders within 1-2 business days. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.",
//   "What's your return policy?": "We offer a 30-day return policy for all unused items in their original packaging. Returns are free for store credit, or you can receive a full refund minus shipping costs.",
//   "What payment methods do you accept?": "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted.",
//   "How can I track my order?": "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.",
//   "How can I find my size?": "You can find detailed size charts on each product page. We recommend measuring yourself and comparing with our size guide for the best fit.",
//   "How can I contact customer service?": "You can reach our customer service team via email at support@example.com or by phone at 1-800-123-4567 during business hours (9AM-5PM EST)."
// };

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([{
//     text: "Hello! How can I help you today? Please select a question below.",
//     isBot: true,
//     timestamp: new Date().toLocaleTimeString()
//   }]);

//   const handleQuestionSelect = (question: string) => {
//     // Add user question
//     setMessages(prev => [...prev, {
//       text: question,
//       isBot: false,
//       timestamp: new Date().toLocaleTimeString()
//     }]);

//     // Add bot response
//     setTimeout(() => {
//       setMessages(prev => [...prev, {
//         text: responses[question as keyof typeof responses],
//         isBot: true,
//         timestamp: new Date().toLocaleTimeString()
//       }]);
//     }, 500);
//   };

//   return (
//     <div className="fixed bottom-4 right-4">
//       <Button 
//         onClick={() => setIsOpen(!isOpen)} 
//         className="mb-2 rounded-full"
//         variant="default"
//       >
//         <Bot className="mr-2" /> Chat Support
//       </Button>

//       {isOpen && (
//         <Card className="w-80 h-96">
//           <CardContent className="p-4 h-full flex flex-col">
//             <ScrollArea className="flex-grow mb-4 pr-4">
//               <div className="space-y-4">
//                 {messages.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`flex ${
//                       message.isBot ? "justify-start" : "justify-end"
//                     }`}
//                   >
//                     <div
//                       className={`rounded-lg p-3 max-w-[80%] ${
//                         message.isBot
//                           ? "bg-secondary"
//                           : "bg-primary text-primary-foreground"
//                       }`}
//                     >
//                       <div className="flex items-center gap-2 mb-1">
//                         {message.isBot ? (
//                           <Bot className="w-4 h-4" />
//                         ) : (
//                           <User className="w-4 h-4" />
//                         )}
//                         <span className="text-xs opacity-70">
//                           {message.timestamp}
//                         </span>
//                       </div>
//                       <p className="text-sm">{message.text}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>

//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="w-full">
//                   Select a Question <ChevronDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-72">
//                 {Object.entries(predefinedQuestions).map(([key, question]) => (
//                   <DropdownMenuItem
//                     key={key}
//                     onClick={() => handleQuestionSelect(question)}
//                   >
//                     {question}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default ChatBot;






"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { MessageSquare, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

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
              // console.log("Raw message from Botpress:", message)

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
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-lg">
          <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0 bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-base font-medium">{botName}</CardTitle>
            <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 text-primary-foreground">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[350px] p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex mb-4", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.role === "bot" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                        {botName.charAt(0)}
                      </div>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3",
                        message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted",
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
                    <Avatar className="h-8 w-8 ml-2">
                      <div className="flex h-full w-full items-center justify-center bg-zinc-500 text-primary-foreground text-xs font-bold">
                        U
                      </div>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                      {botName.charAt(0)}
                    </div>
                  </Avatar>
                  <div className="bg-muted p-3 rounded-lg">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={!isConnected}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!isConnected || !inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button onClick={toggleChat} size="icon" className="h-12 w-12 rounded-full shadow-lg">
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}



