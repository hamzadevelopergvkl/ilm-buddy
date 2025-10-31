import { useState, useRef, useEffect } from "react";
import { Send, Plus, Image as ImageIcon, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  user: User | null;
}

const AIChat = ({ user }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "السلام عليكم ورحمة الله وبركاته 🌙\n\nWelcome to Deen Buddy! I'm here to help you with Islamic knowledge, guidance, and spiritual support. How may I assist you today? 💚"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: { messages: [...messages, userMessage] }
      });

      if (error) throw error;

      if (data?.response) {
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        
        const userMessage: Message = { 
          role: "user", 
          content: "I've uploaded an image. Can you analyze it from an Islamic perspective?" 
        };
        setMessages(prev => [...prev, userMessage]);

        const { data, error } = await supabase.functions.invoke("vision-chat", {
          body: { 
            prompt: "Please analyze this image from an Islamic perspective.",
            imageData: base64
          }
        });

        if (error) throw error;

        if (data?.response) {
          setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setShowOptions(false);
    }
  };

  const handleGenerateImage = async () => {
    const prompt = window.prompt("Describe the Islamic image you want to create:");
    if (!prompt) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt }
      });

      if (error) throw error;

      if (data?.imageUrl) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: `Here's the generated image:\n\n![Generated Image](${data.imageUrl})`
        }]);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setShowOptions(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          AI Chat
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Ask me anything about Islam</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.role === "user"
                  ? "bg-gradient-islamic text-white"
                  : "bg-card border border-border text-card-foreground"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-card border border-border p-4 rounded-2xl">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-border bg-card">
        <div className="flex gap-2">
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowOptions(!showOptions)}
              className="rounded-full"
            >
              <Plus className="w-5 h-5" />
            </Button>
            
            {showOptions && (
              <div className="absolute bottom-full mb-2 left-0 bg-card border border-border rounded-lg shadow-lg p-2 space-y-1">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md w-full text-left transition-colors"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Upload Image</span>
                </button>
                <button
                  onClick={handleGenerateImage}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md w-full text-left transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create Image</span>
                </button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />

          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-islamic hover:opacity-90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;