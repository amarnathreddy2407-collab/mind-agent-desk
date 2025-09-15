import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Send, Mail, FileText } from "lucide-react";

interface ExamplePromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const examples = [
  {
    icon: Search,
    text: "Search Google for latest AI news",
    category: "Search"
  },
  {
    icon: Send,
    text: "Send a tweet saying 'Hello world!'",
    category: "Social Media"
  },
  {
    icon: Mail,
    text: "Check my Gmail inbox",
    category: "Email"
  },
  {
    icon: FileText,
    text: "Summarize this article: https://example.com/article",
    category: "Analysis"
  }
];

export const ExamplePrompts = ({ onPromptSelect }: ExamplePromptsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          🤖 AgenticAI Chat
        </h2>
        <p className="text-muted-foreground">
          Chat with AgenticAI backend (web automation, social media, OpenAI, Google APIs)
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examples.map((example, index) => {
          const IconComponent = example.icon;
          return (
            <Card 
              key={index}
              className="relative overflow-hidden bg-gradient-card border-border/50 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group"
              onClick={() => onPromptSelect(example.text)}
            >
              <Button
                variant="ghost"
                className="w-full h-full p-6 justify-start text-left hover:bg-transparent group-hover:bg-accent/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-primary font-medium mb-1 uppercase tracking-wider">
                      {example.category}
                    </div>
                    <div className="text-sm text-foreground leading-relaxed">
                      {example.text}
                    </div>
                  </div>
                </div>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};