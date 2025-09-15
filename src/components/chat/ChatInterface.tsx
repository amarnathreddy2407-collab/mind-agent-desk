import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { MessageInput } from "./MessageInput";
import { ExamplePrompts } from "./ExamplePrompts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instruction: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const responseText = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);

      // Add bot response
      const botMessage: Message = {
        id: Date.now().toString() + '-bot',
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: `⚠️ Error: ${error instanceof Error ? error.message : 'Failed to connect to backend'}`,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to AgenticAI backend. Please check if the server is running on localhost:8000.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-background">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <ExamplePrompts onPromptSelect={handlePromptSelect} />
        </div>
      ) : (
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && (
              <ChatMessage
                message=""
                isUser={false}
                timestamp={new Date()}
                isLoading={true}
              />
            )}
          </div>
        </ScrollArea>
      )}

      <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};