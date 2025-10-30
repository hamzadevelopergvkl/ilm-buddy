import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AIChat from "@/components/AIChat";
import Duas from "@/components/Duas";
import Quran from "@/components/Quran";
import Prayer from "@/components/Prayer";
import Settings from "@/components/Settings";

const Index = () => {
  const [activeSection, setActiveSection] = useState("ai-chat");

  const renderSection = () => {
    switch (activeSection) {
      case "ai-chat":
        return <AIChat />;
      case "duas":
        return <Duas />;
      case "quran":
        return <Quran />;
      case "prayer":
        return <Prayer />;
      case "settings":
        return <Settings />;
      default:
        return <AIChat />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 overflow-hidden">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;