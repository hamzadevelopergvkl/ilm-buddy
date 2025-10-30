import { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  completed: boolean;
}

const Prayer = () => {
  const [prayers, setPrayers] = useState<PrayerTime[]>([
    { name: "Fajr", arabicName: "الفجر", time: "05:30 AM", completed: false },
    { name: "Dhuhr", arabicName: "الظهر", time: "12:45 PM", completed: false },
    { name: "Asr", arabicName: "العصر", time: "04:15 PM", completed: false },
    { name: "Maghrib", arabicName: "المغرب", time: "06:30 PM", completed: false },
    { name: "Isha", arabicName: "العشاء", time: "08:00 PM", completed: false },
  ]);

  const togglePrayer = (index: number) => {
    setPrayers(prev =>
      prev.map((prayer, i) =>
        i === index ? { ...prayer, completed: !prayer.completed } : prayer
      )
    );
  };

  const completedCount = prayers.filter(p => p.completed).length;
  const progressPercentage = (completedCount / prayers.length) * 100;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🕌 Prayer Times
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Track your daily prayers</p>
      </div>

      {/* Progress */}
      <div className="p-6 border-b border-border">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted-foreground">Today's Progress</span>
          <span className="text-foreground font-medium">{completedCount}/5</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-islamic transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Prayer Times */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {prayers.map((prayer, index) => (
          <Card
            key={index}
            onClick={() => togglePrayer(index)}
            className={cn(
              "p-5 cursor-pointer transition-all hover:shadow-glow animate-fade-in",
              prayer.completed && "bg-accent/20 border-primary"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    prayer.completed
                      ? "bg-gradient-islamic"
                      : "bg-muted"
                  )}
                >
                  {prayer.completed ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span className="text-xl">{index + 1}</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{prayer.name}</h3>
                    <span className="text-lg arabic-text text-muted-foreground">{prayer.arabicName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{prayer.time}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quranic Verse */}
      <div className="p-6 border-t border-border bg-card">
        <Card className="p-4 bg-gradient-islamic text-white">
          <p className="text-center arabic-text text-lg mb-2 leading-loose">
            حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ
          </p>
          <p className="text-center text-sm opacity-90">
            "Maintain with care the prayers and the middle prayer and stand before Allah, devoutly obedient."
          </p>
          <p className="text-center text-xs opacity-75 mt-2">
            Quran 2:238
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Prayer;