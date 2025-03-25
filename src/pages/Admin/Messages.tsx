"use client";

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  Search,
  Filter,
  Trash2,
  AlertCircle,
  ChevronDown,
  Users,
  SortAsc,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { Message } from "@/types/entityTypes";

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [timeRangeFilter, setTimeRangeFilter] = useState("all");
  const [senderTypeFilter, setSenderTypeFilter] = useState("all");

  // Enhanced stats with more visual styling
  const statsData = [
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      label: "Total Messages",
      value: 1254,
      bgColor: "bg-blue-50",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      label: "Active Chats",
      value: 467,
      bgColor: "bg-green-50",
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      label: "Complaints",
      value: 52,
      bgColor: "bg-red-50",
    },
  ];

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/messages`
        );
        if (response.status === 200) {
          setMessages(response.data);
        }
      } catch (error: any) {
        toast.error("Failed to load messages", {
          position: "top-center",
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Memoized filtering and sorting logic
  const filteredMessages = useMemo(() => {
    let result = [...messages];

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (message) =>
          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Time range filter
    if (timeRangeFilter !== "all") {
      const now = new Date();
      result = result.filter((message) => {
        const msgDate = new Date(message.createdAt);
        switch (timeRangeFilter) {
          case "today":
            return msgDate.toDateString() === now.toDateString();
          case "week":
            const weekAgo = new Date(now.setDate(now.getDate() - 7));
            return msgDate >= weekAgo;
          case "month":
            const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
            return msgDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    // Sorting
    if (sortBy !== "default") {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortBy === "newest"
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      });
    }

    return result;
  }, [messages, searchTerm, sortBy, timeRangeFilter]);

  // Enhanced Message Card Component
  const MessageCard = ({ message }: { message: Message }) => (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300 mb-4 overflow-hidden group">
      <div className="p-4 flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-lg text-gray-800">
                {message.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {message.email}
              </Badge>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={18} />
            </Button>
          </div>
          
          <div className="space-y-1">
            <p className="font-medium text-gray-700">{message.subject}</p>
            <p className="text-sm text-gray-500 line-clamp-2">
              {message.message}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              {new Date(message.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Stats Card Component
  const StatsCard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statsData.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgColor} rounded-xl p-5 flex items-center space-x-4 shadow-sm`}
        >
          <div className="rounded-full bg-white p-3 shadow-md">
            {stat.icon}
          </div>
          <div>
            <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-none shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <StatsCard />
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Message Center
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="space-x-2">
                  <Filter size={16} />
                  <span>Filters</span>
                </Button>
                <Button variant="outline" size="sm" className="space-x-2">
                  <SortAsc size={16} />
                  <span>Sort</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10 py-2 rounded-xl border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Sort">
                      <div className="flex items-center space-x-2">
                        <SortAsc size={16} />
                        <span>
                          {sortBy === "default" 
                            ? "Default" 
                            : sortBy === "newest" 
                            ? "Newest" 
                            : "Oldest"}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center text-gray-500 py-10">
                    Loading messages...
                  </div>
                ) : filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-10">
                    No messages found
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;