import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";

const IslamicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hijriDate, setHijriDate] = useState("");
  const [islamicEvents, setIslamicEvents] = useState<string[]>([]);

  const hijriMonths = [
    "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
    "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhul Qi'dah", "Dhul Hijjah"
  ];

  const importantDates = [
    { month: 1, day: 1, event: "🎊 Islamic New Year" },
    { month: 1, day: 10, event: "🕌 Day of Ashura" },
    { month: 3, day: 12, event: "🎂 Mawlid al-Nabi (Prophet's Birthday)" },
    { month: 7, day: 27, event: "✨ Isra and Mi'raj" },
    { month: 8, day: 15, event: "🌙 Mid-Sha'ban" },
    { month: 9, day: 1, event: "🌙 Start of Ramadan" },
    { month: 9, day: 21, event: "⭐ Last 10 Nights of Ramadan" },
    { month: 9, day: 27, event: "✨ Laylat al-Qadr (Night of Power)" },
    { month: 10, day: 1, event: "🎉 Eid al-Fitr" },
    { month: 12, day: 9, event: "⛰️ Day of Arafah" },
    { month: 12, day: 10, event: "🎊 Eid al-Adha" },
  ];

  // Simple Hijri conversion (approximate)
  const convertToHijri = (gregorianDate: Date) => {
    const gregorianYear = gregorianDate.getFullYear();
    const gregorianMonth = gregorianDate.getMonth() + 1;
    const gregorianDay = gregorianDate.getDate();

    // Approximate conversion formula
    const hijriYear = Math.floor(((gregorianYear - 622) * 1.030684) + 0.5);
    const hijriMonth = Math.floor((gregorianMonth + (hijriYear * 12.368)) % 12) + 1;
    const hijriDay = Math.floor(gregorianDay * 0.967);

    return {
      year: hijriYear,
      month: hijriMonth,
      day: hijriDay > 0 ? hijriDay : 1,
    };
  };

  useEffect(() => {
    const hijri = convertToHijri(selectedDate);
    setHijriDate(`${hijri.day} ${hijriMonths[hijri.month - 1]} ${hijri.year} AH`);

    // Check for Islamic events
    const events = importantDates
      .filter(date => date.month === hijri.month && Math.abs(date.day - hijri.day) <= 2)
      .map(date => date.event);
    
    setIslamicEvents(events);
  }, [selectedDate]);

  const today = new Date();
  const todayHijri = convertToHijri(today);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 sm:p-6 border-b border-border bg-card">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
          📅 Islamic Calendar
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Hijri and Gregorian dates</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Current Date Card */}
        <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/10 to-background">
          <div className="text-center space-y-2">
            <div className="text-4xl sm:text-5xl mb-2">🌙</div>
            <h3 className="text-base sm:text-lg font-semibold text-primary">Today's Date</h3>
            <div className="space-y-1">
              <p className="text-lg sm:text-xl font-bold text-foreground">
                {todayHijri.day} {hijriMonths[todayHijri.month - 1]} {todayHijri.year} AH
              </p>
              <p className="text-sm text-muted-foreground">
                {today.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </Card>

        {/* Calendar */}
        <Card className="p-4 sm:p-6">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border-0"
            />
          </div>
          
          {selectedDate && (
            <div className="mt-6 p-4 bg-primary/5 rounded-lg space-y-2">
              <p className="text-sm font-medium text-foreground">Selected Date:</p>
              <p className="text-base font-bold text-primary">{hijriDate}</p>
              <p className="text-sm text-muted-foreground">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          )}
        </Card>

        {/* Islamic Events */}
        {islamicEvents.length > 0 && (
          <Card className="p-4 sm:p-6 space-y-3">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">🎉 Nearby Events</h3>
            {islamicEvents.map((event, index) => (
              <div key={index} className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium text-foreground">{event}</p>
              </div>
            ))}
          </Card>
        )}

        {/* Important Dates Reference */}
        <Card className="p-4 sm:p-6 space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">📋 Important Islamic Dates</h3>
          <div className="space-y-2">
            {importantDates.map((date, index) => (
              <div key={index} className="flex items-start gap-3 p-2 hover:bg-primary/5 rounded-lg transition-colors">
                <span className="text-xs font-medium text-primary whitespace-nowrap">
                  {date.day} {hijriMonths[date.month - 1]}
                </span>
                <span className="text-xs text-foreground">{date.event}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Hijri Months Info */}
        <Card className="p-4 sm:p-6 space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">🌙 Hijri Months</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {hijriMonths.map((month, index) => (
              <div key={index} className="p-2 bg-primary/5 rounded text-center">
                <p className="text-xs font-medium text-primary">{index + 1}</p>
                <p className="text-xs text-foreground">{month}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IslamicCalendar;
