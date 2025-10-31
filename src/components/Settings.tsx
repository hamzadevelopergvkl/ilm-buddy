import { Moon, Sun, LogIn } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { User } from "@supabase/supabase-js";

interface SettingsProps {
  user: User | null;
}

const Settings = ({ user }: SettingsProps) => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} mode`,
    });
  };

  const handleLogin = () => {
    toast({
      title: "Coming Soon",
      description: "Login functionality will be available soon",
    });
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
          <Card className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-islamic flex items-center justify-center">
                <LogIn className="w-10 h-10 text-white" />
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-foreground mb-1">Sign In</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Login to sync your progress across devices
                </p>
                <Button
                  onClick={handleLogin}
                  className="bg-gradient-islamic hover:opacity-90"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* About Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">About</h3>
          <Card className="p-6">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2">🕌</div>
              <h4 className="font-semibold text-foreground">Deen Buddy</h4>
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