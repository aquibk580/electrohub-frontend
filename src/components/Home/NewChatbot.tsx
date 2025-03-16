// declare global {
//   interface Window {
//     botpressWebChat: any;
//   }
// }
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar } from "@/components/ui/avatar";
// import { Bot, MessageCircle, X, ChevronDown } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Webchat, WebchatProvider, getClient } from "@botpress/webchat";

// // Custom theme for Botpress that uses the system's primary/accent colors
// const customTheme = {
//   style: `
//     :root {
//       --webchat-header-bg: hsl(var(--primary));
//       --webchat-header-text: hsl(var(--primary-foreground));
//       --webchat-bubble-bot-bg: hsl(var(--secondary));
//       --webchat-bubble-bot-text: hsl(var(--secondary-foreground));
//       --webchat-bubble-user-bg: hsl(var(--primary));
//       --webchat-bubble-user-text: hsl(var(--primary-foreground));
//       --webchat-button-primary-bg: hsl(var(--primary));
//       --webchat-button-primary-text: hsl(var(--primary-foreground));
//       --webchat-button-secondary-bg: hsl(var(--accent));
//       --webchat-button-secondary-text: hsl(var(--accent-foreground));
//     }
//   `,
//   theme: {
//     themeName: "system",
//     themeColor: "var(--primary)" // This will adapt to the system theme
//   }
// };

// // Frequently asked questions
// const faqs = [
//   { question: "How long does shipping take?", answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days." },
//   { question: "What's your return policy?", answer: "We offer a 30-day return policy for all unused items in their original packaging." },
//   { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and Apple Pay." },
//   { question: "How can I track my order?", answer: "Once your order ships, you'll receive a tracking number via email." },
//   { question: "Do you ship internationally?", answer: "Yes, we ship to over 50 countries worldwide." }
// ];

// interface ChatBotProps {
//   clientId?: string;
//   botName?: string;
//   showFaq?: boolean;
// }

// const ChatBot: React.FC<ChatBotProps> = ({
//   clientId = import.meta.env.VITE_CHATBOT_CLIENT_KEY,
//   botName = "Customer Support",
//   showFaq = true
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [view, setView] = useState<'chat' | 'faq'>('chat');
//   const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

//   // Initialize Botpress Webchat
//   useEffect(() => {
//     if (window.botpressWebChat && clientId) {
//       window.botpressWebChat.init({
//         clientId,
//         theme: "light",
//         userId: "user-1234",
//         avatarUrl: "https://www.boat-lifestyle.com/cdn/shop/files/boAt_logo_black_24889e30-925c-4185-a028-9fef497a8e44.svg?v=1732879339",
//         userData: {
//           name: "John Doe",
//           email: "johndoe@example.com",
//         },
//         enableSound: true,  
//         ...customTheme.theme
//       });
//     }
//   }, [clientId]);

//   const toggleFaq = (index: number) => {
//     setExpandedFaq(expandedFaq === index ? null : index);
//   };

//   return (
//     <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
//       {/* Chat button */}
//       <Button
//         onClick={() => setIsOpen(!isOpen)}
//         className="rounded-full shadow-lg p-4 h-14 w-14 flex items-center justify-center"
//         variant="default"
//       >
//         <MessageCircle size={24} />
//       </Button>

//       {/* Chat window */}
//       {isOpen && (
//         <Card className="w-[380px] h-[520px] shadow-xl rounded-xl overflow-hidden">
//           {/* Chat header */}
//           <CardHeader className="bg-primary text-primary-foreground p-3 flex flex-row items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Avatar className="h-8 w-8 bg-primary-foreground/20">
//                 <Bot size={16} className="text-primary-foreground" />
//               </Avatar>
//               <div>
//                 <CardTitle className="text-sm font-medium">{botName}</CardTitle>
//                 <Badge variant="outline" className="text-xs border-primary-foreground/30 text-primary-foreground/90 mt-1">
//                   Online
//                 </Badge>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               {showFaq && (
//                 <>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setView(view === 'chat' ? 'faq' : 'chat')}
//                     className="h-8 w-8 p-0 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
//                   >
//                     {view === 'chat' ?
//                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg> :
//                       <MessageCircle size={16} />
//                     }
//                   </Button>
//                 </>
//               )}
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="h-8 w-8 p-0 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
//                 onClick={() => setIsOpen(false)}
//               >
//                 <X size={16} />
//               </Button>
//             </div>
//           </CardHeader>

//           <CardContent className="p-0 h-[calc(520px-56px)] relative">
//             {view === 'chat' ? (
//               <WebchatProvider client={getClient({ clientId })}>
//                 <style>{customTheme.style}</style>
//                 <div className="h-full">
//                   <Webchat />
//                 </div>
//               </WebchatProvider>
//             ) : (
//               <div className="h-full bg-gray-50">
//                 <ScrollArea className="h-full p-4">
//                   <h3 className="text-sm font-medium text-gray-700 mb-4">Frequently Asked Questions</h3>
//                   <div className="space-y-3">
//                     {faqs.map((faq, index) => (
//                       <div
//                         key={index}
//                         className="bg-white rounded-lg shadow-sm overflow-hidden"
//                       >
//                         <div
//                           className="p-3 cursor-pointer flex justify-between items-center hover:bg-gray-50"
//                           onClick={() => toggleFaq(index)}
//                         >
//                           <h4 className="text-sm font-medium">{faq.question}</h4>
//                           <ChevronDown
//                             size={16}
//                             className={`transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`}
//                           />
//                         </div>
//                         {expandedFaq === index && (
//                           <div className="p-3 pt-0 text-sm text-gray-600 border-t">
//                             {faq.answer}
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-6 flex justify-center">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="text-blue-600"
//                       onClick={() => setView('chat')}
//                     >
//                       Ask more questions
//                     </Button>
//                   </div>
//                 </ScrollArea>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default ChatBot;
