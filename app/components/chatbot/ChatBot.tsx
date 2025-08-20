import React, { useRef, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { Message } from "./types/chatbot";
import { chatService, PortfolioContext } from "./services/chatService";

interface SimpleChatBotProps {
  className?: string;
  context?: PortfolioContext;
  title?: string;
  toggle?: boolean;
  onToggleDisable?: () => void;
}

const ChatBot: React.FC<SimpleChatBotProps> = ({
  className = "",
  context = "general",
  title = "Chat with AI Assistant",
  toggle = false,
  onToggleDisable,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
    
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Expose scrollToBottom globally for manual triggering
  useEffect(() => {
    (window as any).scrollToBottom = scrollToBottom;
    return () => {
      delete (window as any).scrollToBottom;
    };
  }, []);

  useEffect(() => {
    // Only scroll to bottom if user has sent messages (not just intro)
    if (
      messages.length > 1 ||
      (messages.length === 1 && messages[0].sender === "user")
    ) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  // Initialize chat with context-specific intro
  useEffect(() => {
    const initializeChat = async () => {
      try {
        chatService.setContext(context);
        const introMessage = await chatService.setContextWithIntro(context);

        if (introMessage) {
          const botMessage: Message = {
            id: Date.now().toString(),
            text: introMessage,
            sender: "bot",
            timestamp: new Date(),
          };
          setMessages([botMessage]);
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setError("Failed to initialize chat. Please refresh the page.");
        setIsInitialized(true);
      }
    };

    initializeChat();
  }, [context]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Get real AI response
      const aiResponse = await chatService.sendMessage(inputValue);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={`relative h-fit `}>
       
      <div
        className={`z-10 relative flex flex-col 
    bg-white  border-neutral-100 rounded-[39px] border-[8px]  shadow-sm ${className}
    ${
      toggle
        ? "opacity-100 h-[calc(90vh-104px)]"
        : "opacity-0 h-0"
    }
    transition-all duration-700 ease-in-out
    `}
      >
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center"></div>
              )}

              <div
                className={`flex flex-col max-w-[80%] ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.sender === "bot"
                      ? "bg-gray-100 text-gray-800 rounded-tl-sm"
                      : "bg-orange-600 text-white rounded-tr-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-1">
                  {formatTime(message.timestamp)}
                </span>
              </div>

              {message.sender === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#0a0a0a] flex items-center justify-center"></div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center"></div>
              <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input Area */}
      <div
        className={`p-3 rounded-full 
            bg-orange-600 text-white mt-4 shadow-sm mx-auto
        `}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isTyping}
            className="text-white flex-1 px-4 py-2 rounded-full focus:outline-none disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="p-6 bg-white shadow-sm  text-white rounded-full cursor-pointer flex items-center justify-center transition-colors disabled:cursor-not-allowed"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
