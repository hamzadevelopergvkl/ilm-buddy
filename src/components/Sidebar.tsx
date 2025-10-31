import { MessageSquare, Book, BookOpen, Clock, Settings, Calendar, HelpCircle, Compass, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { id: "ai-chat", label: "AI Chat", icon: MessageSquare },
    { id: "duas", label: "Duas", icon: Book },
    { id: "quran", label: "Quran", icon: BookOpen },
    { id: "prayer", label: "Prayer Times", icon: Clock },
    { id: "quiz", label: "Quiz", icon: HelpCircle },
    { id: "qibla", label: "Qibla Finder", icon: Compass },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ];

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 h-screen bg-sidebar-background border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:translate-x-0 backdrop-blur-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
        style={{ backgroundColor: 'hsl(var(--sidebar-background))' }}
      >
        {/* Logo and Title */}
        <div className="p-4 sm:p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-islamic flex items-center justify-center">
                <span className="text-2xl">🕌</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground">Deen Buddy</h1>
                <p className="text-xs text-sidebar-foreground/60">Your Islamic Companion</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="lg:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all text-left",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Settings */}
        <div className="p-3 sm:p-4 border-t border-sidebar-border">
          <button
            onClick={() => handleSectionChange("settings")}
            className={cn(
              "w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all text-left",
              activeSection === "settings"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;