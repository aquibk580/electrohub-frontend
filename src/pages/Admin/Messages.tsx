"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MessageSquare, Bell, Send, Trash2, Plus, Users, AlertCircle, Search } from "lucide-react"
import { DashboardStats } from "@/components/Admin/dashboard-stats"
import { mockData } from "@/data/mock-data"

const Messages = () => {
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [emailList, setEmailList] = useState<string[]>([])
  const [newEmail, setNewEmail] = useState("")
  const [messageSubject, setMessageSubject] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [activeTab, setActiveTab] = useState("messages")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [messageTypeFilter, setMessageTypeFilter] = useState("all")
  const [senderTypeFilter, setSenderTypeFilter] = useState("all")
  const [timeRangeFilter, setTimeRangeFilter] = useState("all")

  const statsData = [
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      label: "Total Messages",
      value: mockData.messageStats.totalMessages,
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      label: "Active Chats",
      value: mockData.messageStats.activeChats,
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-primary" />,
      label: "Complaints",
      value: mockData.messageStats.complaints,
    },
  ]

  const filteredMessages = useMemo(() => {
    let result = [...mockData.messages]

    // Search filter
    if (searchTerm) {
      result = result.filter(
        message =>
          message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Message type filter
    if (messageTypeFilter !== "all") {
      result = result.filter(message => message.messageType === messageTypeFilter)
    }

    // Sender type filter
    if (senderTypeFilter !== "all") {
      result = result.filter(message => message.senderType === senderTypeFilter)
    }

    // Time range filter
    if (timeRangeFilter !== "all") {
      const now = new Date()
      const messageDate = new Date()
      result = result.filter(message => {
        const msgDate = new Date(message.timestamp)
        switch (timeRangeFilter) {
          case "today":
            return msgDate.toDateString() === now.toDateString()
          case "week":
            const weekAgo = new Date(now.setDate(now.getDate() - 7))
            return msgDate >= weekAgo
          case "month":
            const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
            return msgDate >= monthAgo
          default:
            return true
        }
      })
    }

    // Sort
    if (sortBy !== "default") {
      result.sort((a, b) => {
        const dateA = new Date(a.timestamp)
        const dateB = new Date(b.timestamp)
        return sortBy === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime()
      })
    }

    return result
  }, [searchTerm, sortBy, messageTypeFilter, senderTypeFilter, timeRangeFilter])

  const handleAddEmail = () => {
    if (newEmail && !emailList.includes(newEmail)) {
      setEmailList([...emailList, newEmail])
      setNewEmail("")
    }
  }

  const handleRemoveEmail = (email: string) => {
    setEmailList(emailList.filter(e => e !== email))
  }

  const handleMessageClick = (message: (typeof mockData.messages)[0]) => {
    navigate(`/admin/messages/chat/${message.id}`, { state: { message } })
  }

  const MessageCard = ({ message }: { message: (typeof mockData.messages)[0] }) => (
    <Card className="mb-4 cursor-pointer hover:bg-accent transition-colors" onClick={() => handleMessageClick(message)}>
      <CardContent className="p-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{message.sender}</span>
            {message.unread && <Badge variant="destructive" className="h-2 w-2 rounded-full p-0" />}
          </div>
          <p className="text-sm font-medium">{message.subject}</p>
          <p className="text-sm text-muted-foreground mt-1">{message.message}</p>
          <span className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Badge variant={message.senderType === "Seller" ? "default" : "secondary"}>
            {message.senderType}
          </Badge>
          <Badge variant="outline">{message.messageType}</Badge>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="w-full px-2 py-2 sm:px-4 sm:py-4 space-y-4">
      <Tabs defaultValue="messages" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="messages" className="flex-1 sm:flex-none text-sm sm:text-base">
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 sm:flex-none text-sm sm:text-base">
            <Bell className="w-4 h-4 mr-2" />
            Send Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-4">
          <Card className="shadow-md rounded-lg py-4">
            <CardContent className="p-4">
              <DashboardStats stats={statsData} showFilters={false} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={messageTypeFilter} onValueChange={setMessageTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Message Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Question">Questions</SelectItem>
                      <SelectItem value="Complaint">Complaints</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Feedback">Feedback</SelectItem>
                      <SelectItem value="Request">Requests</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={senderTypeFilter} onValueChange={setSenderTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Sender Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Senders</SelectItem>
                      <SelectItem value="Seller">Sellers</SelectItem>
                      <SelectItem value="Buyer">Buyers</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={timeRangeFilter} onValueChange={setTimeRangeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[500px] md:h-[550px] pr-4">
                {filteredMessages.map((message) => (
                  <MessageCard key={message.id} message={message} />
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Add Recipients</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter email address"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <Button onClick={handleAddEmail}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {emailList.map((email) => (
                    <Badge key={email} variant="secondary" className="py-1 px-3">
                      {email}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0"
                        onClick={() => handleRemoveEmail(email)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <Input
                    placeholder="Subject"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                  />
                  <Textarea
                    placeholder="Write your message here..."
                    className="min-h-[200px]"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMessageContent("")
                      setMessageSubject("")
                      setEmailList([])
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Send Notification
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Messages

