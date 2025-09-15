import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import botAvatar from "@/assets/bot-avatar.png";
import userAvatar from "@/assets/user-avatar.png";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

export const ChatMessage = ({ message, isUser, timestamp, isLoading }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-4 mb-6", isUser && "flex-row-reverse")}>
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage 
          src={isUser ? userAvatar : botAvatar} 
          alt={isUser ? "User" : "AgenticAI"} 
        />
        <AvatarFallback className={cn(
          "text-sm font-medium",
          isUser ? "bg-chat-user text-chat-user-foreground" : "bg-chat-bot text-chat-bot-foreground"
        )}>
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn("flex flex-col max-w-[80%]", isUser && "items-end")}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground font-medium">
            {isUser ? "You" : "AgenticAI"}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <Card className={cn(
          "p-4 shadow-card border-border/50",
          isUser 
            ? "bg-chat-user text-chat-user-foreground" 
            : "bg-gradient-card text-chat-bot-foreground",
          isLoading && "animate-pulse"
        )}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              </div>
              <span className="text-muted-foreground">Thinking...</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
          )}
        </Card>
      </div>
    </div>
  );
};