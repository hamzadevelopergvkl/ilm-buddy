import { useState, useEffect } from "react";
import { Moon, Sun, LogIn, LogOut, MessageSquare, Trash2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";

interface SettingsProps {
  user: User | null;
  onChatSelect?: (chatId: string) => void;
}

interface Chat {
  id: string;
  title: string;
  created_at: string;
}

const Settings = ({ user, onChatSelect }: SettingsProps) => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (user) {
      loadChats();
    }
  }, [user]);

  const loadChats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setChats(data || []);
    } catch (error) {
      console.error("Error loading chats:", error);
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} mode`,
    });
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    setChats([]);
  };

  const handleChatSelect = (chatId: string) => {
    onChatSelect?.(chatId);
  };

  const handleDeleteChat = async (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const { error } = await supabase
        .from("chats")
        .delete()
        .eq("id", chatId);

      if (error) throw error;

      toast({
        title: "Chat Deleted",
        description: "Chat has been deleted successfully",
      });
      
      loadChats();
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast({
        title: "Error",
        description: "Failed to delete chat",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          ⚙️ Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Customize your experience</p>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Theme Selection */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Theme</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card
              onClick={() => handleThemeChange("light")}
              className={`p-4 cursor-pointer hover:shadow-glow transition-all ${
                theme === "light" ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <Sun className="w-6 h-6 text-foreground" />
                </div>
                <span className="font-medium text-foreground">Light</span>
              </div>
            </Card>

            <Card
              onClick={() => handleThemeChange("dark")}
              className={`p-4 cursor-pointer hover:shadow-glow transition-all ${
                theme === "dark" ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-islamic flex items-center justify-center">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-foreground">Dark</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Account Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Account</h3>
          <Card className="p-4 sm:p-6">
            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-islamic flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{user.email}</h4>
                    <p className="text-sm text-muted-foreground">Signed In</p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-islamic flex items-center justify-center">
                  <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-foreground mb-1">Sign In</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Login to save your chats and progress
                  </p>
                  <Button
                    onClick={handleLogin}
                    className="bg-gradient-islamic hover:opacity-90"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Chat History */}
        {user && chats.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Chat History</h3>
            <Card className="p-3 sm:p-4">
              <ScrollArea className="h-[300px]">
                <div className="space-y-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatSelect(chat.id)}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{chat.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(chat.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        )}

        {/* About Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">About</h3>
          <Card className="p-6">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2">🕌</div>
              <h4 className="font-semibold text-foreground">ilm AI</h4>
              <p className="text-sm text-muted-foreground">
                Your Islamic companion for spiritual growth and knowledge
              </p>
              <p className="text-xs text-muted-foreground mt-4">
                Version 1.0.0
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;