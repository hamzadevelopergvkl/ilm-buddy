import { Play } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface Surah {
  number: number;
  name: string;
  arabicName: string;
  englishName: string;
  revelationType: string;
  numberOfAyahs: number;
}

const surahs: Surah[] = [
  { number: 1, name: "Al-Fatihah", arabicName: "الفاتحة", englishName: "The Opening", revelationType: "Meccan", numberOfAyahs: 7 },
  { number: 2, name: "Al-Baqarah", arabicName: "البقرة", englishName: "The Cow", revelationType: "Medinan", numberOfAyahs: 286 },
  { number: 3, name: "Ali 'Imran", arabicName: "آل عمران", englishName: "Family of Imran", revelationType: "Medinan", numberOfAyahs: 200 },
  { number: 4, name: "An-Nisa", arabicName: "النساء", englishName: "The Women", revelationType: "Medinan", numberOfAyahs: 176 },
  { number: 5, name: "Al-Ma'idah", arabicName: "المائدة", englishName: "The Table Spread", revelationType: "Medinan", numberOfAyahs: 120 },
  { number: 6, name: "Al-An'am", arabicName: "الأنعام", englishName: "The Cattle", revelationType: "Meccan", numberOfAyahs: 165 },
  { number: 7, name: "Al-A'raf", arabicName: "الأعراف", englishName: "The Heights", revelationType: "Meccan", numberOfAyahs: 206 },
  { number: 8, name: "Al-Anfal", arabicName: "الأنفال", englishName: "The Spoils of War", revelationType: "Medinan", numberOfAyahs: 75 },
  { number: 9, name: "At-Tawbah", arabicName: "التوبة", englishName: "The Repentance", revelationType: "Medinan", numberOfAyahs: 129 },
  { number: 10, name: "Yunus", arabicName: "يونس", englishName: "Jonah", revelationType: "Meccan", numberOfAyahs: 109 },
];

const Quran = () => {
  const { toast } = useToast();

  const handlePlay = (surahNumber: number) => {
    toast({
      title: "Coming Soon",
      description: `Audio playback for Surah ${surahNumber} will be available soon. Please add your audio files.`,
    });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          📖 Quran
        </h2>
        <p className="text-sm text-muted-foreground mt-1">The Holy Book of Allah</p>
      </div>

      {/* Surahs List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {surahs.map((surah) => (
          <Card key={surah.number} className="p-4 hover:shadow-glow transition-all animate-fade-in">
            <div className="flex items-center gap-4">
              {/* Surah Number */}
              <div className="w-12 h-12 rounded-lg bg-gradient-islamic flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">{surah.number}</span>
              </div>

              {/* Surah Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground">{surah.name}</h3>
                  <p className="text-xl arabic-text text-foreground">{surah.arabicName}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{surah.englishName}</span>
                  <span>•</span>
                  <span>{surah.revelationType}</span>
                  <span>•</span>
                  <span>{surah.numberOfAyahs} Ayahs</span>
                </div>
              </div>

              {/* Play Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePlay(surah.number)}
                className="flex-shrink-0 hover:bg-accent"
              >
                <Play className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Quran;