import { MessageSquare, Book, BookOpen, Clock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: "ai-chat", label: "AI Chat", icon: MessageSquare },
    { id: "duas", label: "Duas", icon: Book },
    { id: "quran", label: "Quran", icon: BookOpen },
    { id: "prayer", label: "Prayer Times", icon: Clock },
  ];

  return (
    <div className="w-64 h-screen bg-sidebar-background border-r border-sidebar-border flex flex-col">
      {/* Logo and Title */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-islamic flex items-center justify-center">
            <span className="text-2xl">🕌</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">Deen Buddy</h1>
            <p className="text-xs text-sidebar-foreground/60">Your Islamic Companion</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => onSectionChange("settings")}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
            activeSection === "settings"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;