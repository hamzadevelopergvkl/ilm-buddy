import { useState, useRef, useEffect } from "react";
import { Send, Plus, Image as ImageIcon, Sparkles, MessageSquarePlus } from "lucide-react";
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
  activeChatId?: string | null;
  onChatCreated?: (chatId: string) => void;
}

const AIChat = ({ user, activeChatId, onChatCreated }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "السلام عليكم ورحمة الله وبركاته 🌙\n\nWelcome to Deen Buddy! I'm here to help you with Islamic knowledge, guidance, and spiritual support. How may I assist you today? 💚"
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(activeChatId || null);
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

  useEffect(() => {
    if (activeChatId) {
      loadChat(activeChatId);
    }
  }, [activeChatId]);

  const loadChat = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setMessages(data.map(msg => ({ role: msg.role as "user" | "assistant", content: msg.content })));
        setCurrentChatId(chatId);
      }
    } catch (error) {
      console.error("Error loading chat:", error);
    }
  };

  const createNewChat = async (firstMessage: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from("chats")
        .insert({
          user_id: user.id,
          title: firstMessage.substring(0, 50) + (firstMessage.length > 50 ? "..." : "")
        })
        .select()
        .single();

      if (error) throw error;

      setCurrentChatId(data.id);
      onChatCreated?.(data.id);
      return data.id;
    } catch (error) {
      console.error("Error creating chat:", error);
      return null;
    }
  };

  const saveMessage = async (chatId: string, role: "user" | "assistant", content: string) => {
    try {
      await supabase
        .from("messages")
        .insert({
          chat_id: chatId,
          role,
          content
        });
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "السلام عليكم ورحمة الله وبركاته 🌙\n\nWelcome to Deen Buddy! I'm here to help you with Islamic knowledge, guidance, and spiritual support. How may I assist you today? 💚"
      }
    ]);
    setCurrentChatId(null);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your chats.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    const messageContent = input;
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create chat if it doesn't exist
      let chatId = currentChatId;
      if (!chatId) {
        chatId = await createNewChat(messageContent);
        if (!chatId) throw new Error("Failed to create chat");
      }

      // Save user message
      await saveMessage(chatId, "user", messageContent);

      const { data, error } = await supabase.functions.invoke("ai-chat", {
        body: { messages: [...messages, userMessage] }
      });

      if (error) throw error;

      if (data?.response) {
        const assistantMessage = { role: "assistant" as const, content: data.response };
        setMessages(prev => [...prev, assistantMessage]);
        
        // Save assistant response
        await saveMessage(chatId, "assistant", data.response);
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

    // Ask user for custom prompt
    const customPrompt = window.prompt("What would you like to know about this image?", "Please analyze this image from an Islamic perspective.");
    if (!customPrompt) return;

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        
        const userMessage: Message = { 
          role: "user", 
          content: customPrompt
        };
        setMessages(prev => [...prev, userMessage]);

        const { data, error } = await supabase.functions.invoke("vision-chat", {
          body: { 
            prompt: customPrompt,
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
      <div className="p-4 sm:p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              AI Chat
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Ask me anything about Islam</p>
          </div>
          {user && (
            <Button
              onClick={handleNewChat}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span className="hidden sm:inline">New Chat</span>
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
        {messages.map((message, index) => {
          // Check if message contains an image (markdown or base64)
          const imageRegex = /!\[.*?\]\((data:image\/[^)]+)\)/;
          const imageMatch = message.content.match(imageRegex);
          
          return (
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
                {imageMatch ? (
                  <div className="space-y-3">
                    <p className="whitespace-pre-wrap">{message.content.replace(imageRegex, '').trim()}</p>
                    <img 
                      src={imageMatch[1]} 
                      alt="Generated Islamic image" 
                      className="rounded-lg max-w-full h-auto"
                    />
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          );
        })}
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
      <div className="p-3 sm:p-6 border-t border-border bg-card">
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