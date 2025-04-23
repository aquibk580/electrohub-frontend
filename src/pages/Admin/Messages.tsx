import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Trash2,
  Users,
  SortAsc,
  Loader2,
  Store,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "@/lib/axios";
import { Message } from "@/types/entityTypes";
import AnimatedCounter from "@/components/Common/AnimatedCounter";
import { Helmet } from "react-helmet-async";
import { MessagesSkeleton } from "@/components/Admin/Skeletons";

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [senderTypeFilter, setSenderTypeFilter] = useState("all");

  // Enhanced stats with more visual styling
  const statsData = [
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      label: "Total Messages",
      value: messages?.length,
      bgColor: "bg-blue-50",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      label: "User Messages",
      value: messages?.filter((message) => message.userType === "User").length,
      bgColor: "bg-green-50",
    },
    {
      icon: <Store className="w-8 h-8 text-red-600" />,
      label: "Seller Messages",
      value: messages?.filter((message) => message.userType === "Seller")
        .length,
      bgColor: "bg-green-50",
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

    // Sender Type Filter
    if (senderTypeFilter !== "all") {
      result = result.filter(
        (message) => message.userType === senderTypeFilter
      );
    }

    // Sorting
    if (sortBy !== "default") {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });
    }

    return result;
  }, [messages, searchTerm, sortBy, senderTypeFilter]);

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/messages/${id}`
      );
      if (response.status === 200) {
        setMessages((prev) => prev.filter((message) => message.id !== id));
        toast.success("Message Deleted Successfully", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  // Enhanced Message Card Component
  const MessageCard = ({ message }: { message: Message }) => (
    <div className="bg-primary/10 border border-primary/55 rounded-xl mb-4 overflow-hidden group">
      <div className="p-2 sm:p-4 flex flex-col items-start justify-between">
        <div className="flex-1 space-y-2 w-full">
          {/* Header row with name and trash button */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <span className="p-1 bg-gradient-to-br from-primary to-blue-900 text-white font-bold px-2.5 rounded-full">
                {message.name[0]}
              </span>
              <h3 className="font-semibold text-base sm:text-lg text-accent-foreground">
                {message.name}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:bg-red-600 hover:text-white dark:hover:bg-red-700 rounded-xl sm:opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDelete(message.id)}
            >
              <Trash2 size={16} className="sm:size-18" />
            </Button>
          </div>
          
          {/* Email badge - responsive positioning */}
          <Badge className="text-[8px] dark:bg-primary/35 text-white mb-1">
            {message.email}
          </Badge>
  
          {/* Content area */}
          <div className="space-y-1">
            <p className="font-medium text-gray-700 dark:text-slate-300 text-sm sm:text-base">
              {message.subject}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
              {message.message}
            </p>
          </div>
  
          {/* Timestamp */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{new Date(message.createdAt).toLocaleString()}</span>
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
          className={`dark:bg-gradient-to-br from-primary/15  to-black rounded-xl p-5 border border-primary/85 bg-primary/10 flex items-center space-x-4 shadow-sm`}
        >
          <div className="rounded-full bg-primary/10  p-3 ">{stat.icon}</div>
          <div>
            <p className="text-sm text-gray-600 dark:text-white font-medium">
              {stat.label}
            </p>
            <AnimatedCounter end={String(stat.value)} duration={500} />
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return <MessagesSkeleton />;
  }

  return (
    <div className="min-h-screen p-6">
      <Helmet
        title="Messages | Admin"
        meta={[
          {
            name: "description",
            content: "Shows All messages form Users and Sellers",
          },
        ]}
      />
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className=" shadow-md rounded-xl  bg-primary/5 border-primary/75 dark:bg-gradient-to-br from-primary/15 via-slate-900/15 to-primary/10">
          <CardContent className="p-6">
            <StatsCard />
          </CardContent>
        </Card>

        <Card className="border-primary/75   shadow-md bg-primary/5 rounded-xl ">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-accent-foreground">
                Message Center
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2  w-5 h-5 dark:text-white -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10 py-2 rounded-full bg-white/95 dark:bg-black border-primary/65"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <Select
                  value={senderTypeFilter}
                  onValueChange={setSenderTypeFilter}
                >
                  <SelectTrigger className="rounded-full bg-white/95 dark:bg-black border-primary/60">
                    <SelectValue placeholder="Sort">
                      <div className="flex items-center space-x-2">
                        <SortAsc size={16} />
                        <span>
                          {senderTypeFilter === "all"
                            ? "All"
                            : senderTypeFilter === "User"
                              ? "User"
                              : "Seller"}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl  ">
                    <SelectItem className="rounded-lg" value="all">
                      All
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="User">
                      User
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="Seller">
                      Seller
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-full bg-white/95 dark:bg-black border-primary/60">
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
                  <SelectContent className="rounded-xl">
                    <SelectItem className="rounded-lg" value="default">
                      Default
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="newest">
                      Newest First
                    </SelectItem>
                    <SelectItem className="rounded-lg" value="oldest">
                      Oldest First
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <ScrollArea className="h-[500px] pr-4 no-scrollbar">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="flex flex-col justify-center items-center h-[300px]">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Loading Messages...</p>
                  </div>
                ) : filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                  ))
                ) : (
                  <div className="bg-primary/5 rounded-xl border border-primary/75 p-6 text-muted-foreground italic">
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
