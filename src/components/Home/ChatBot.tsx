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

declare global {
  interface Window {
    botpressWebChat: any;
  }
}


import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, MessageCircle } from "lucide-react";
import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";

// Generate the Botpress theme
const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#634433",
});

// Client ID for Botpress
const clientId = import.meta.env.VITE_CHATBOT_CLIENT_KEY

const ChatBot = () => {
  const [isBotpressOpen, setIsBotpressOpen] = useState(false);

  // Initialize Botpress Webchat
  useEffect(() => {
    if (window.botpressWebChat) {
      window.botpressWebChat.init({
        clientId,
        theme,
      });
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {/* Live Chat Button */}
      <Button
        onClick={() => setIsBotpressOpen(!isBotpressOpen)}
        className="rounded-full"
        variant="secondary"
      >
        <MessageCircle className="mr-2" /> Live Chat
      </Button>

      {/* Botpress Webchat Window */}
      {isBotpressOpen && (
        <WebchatProvider client={getClient({ clientId })}>
          <style>{style}</style>
          <div
            className="fixed bottom-20 right-4 w-[350px] h-[500px] bg-white rounded-xl shadow-lg overflow-hidden"
            style={{ zIndex: 1000 }}
          >
            <Webchat />
          </div>
          {/* Close Button */}
          <Fab
            className="fixed bottom-[470px] right-[10px] bg-red-500 text-white rounded-full p-2 cursor-pointer"
            onClick={() => setIsBotpressOpen(false)}
          />
        </WebchatProvider>
      )}
    </div>
  );
};

export default ChatBot;
