import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Sidebar from "@/components/Sidebar";
import AIChat from "@/components/AIChat";
import Duas from "@/components/Duas";
import Quran from "@/components/Quran";
import Prayer from "@/components/Prayer";
import Quiz from "@/components/Quiz";
import QiblaFinder from "@/components/QiblaFinder";
import IslamicCalendar from "@/components/IslamicCalendar";
import Settings from "@/components/Settings";

const Index = () => {
  const [activeSection, setActiveSection] = useState("ai-chat");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "ai-chat":
        return <AIChat user={user} />;
      case "duas":
        return <Duas />;
      case "quran":
        return <Quran />;
      case "prayer":
        return <Prayer />;
      case "quiz":
        return <Quiz />;
      case "qibla":
        return <QiblaFinder />;
      case "calendar":
        return <IslamicCalendar />;
      case "settings":
        return <Settings user={user} />;
      default:
        return <AIChat user={user} />;
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