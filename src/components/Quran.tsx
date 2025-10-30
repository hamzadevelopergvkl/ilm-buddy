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
  { number: 11, name: "Hud", arabicName: "هود", englishName: "Hud", revelationType: "Meccan", numberOfAyahs: 123 },
  { number: 12, name: "Yusuf", arabicName: "يوسف", englishName: "Joseph", revelationType: "Meccan", numberOfAyahs: 111 },
  { number: 13, name: "Ar-Ra'd", arabicName: "الرعد", englishName: "The Thunder", revelationType: "Medinan", numberOfAyahs: 43 },
  { number: 14, name: "Ibrahim", arabicName: "ابراهيم", englishName: "Abraham", revelationType: "Meccan", numberOfAyahs: 52 },
  { number: 15, name: "Al-Hijr", arabicName: "الحجر", englishName: "The Rocky Tract", revelationType: "Meccan", numberOfAyahs: 99 },
  { number: 16, name: "An-Nahl", arabicName: "النحل", englishName: "The Bee", revelationType: "Meccan", numberOfAyahs: 128 },
  { number: 17, name: "Al-Isra", arabicName: "الإسراء", englishName: "The Night Journey", revelationType: "Meccan", numberOfAyahs: 111 },
  { number: 18, name: "Al-Kahf", arabicName: "الكهف", englishName: "The Cave", revelationType: "Meccan", numberOfAyahs: 110 },
  { number: 19, name: "Maryam", arabicName: "مريم", englishName: "Mary", revelationType: "Meccan", numberOfAyahs: 98 },
  { number: 20, name: "Ta-Ha", arabicName: "طه", englishName: "Ta-Ha", revelationType: "Meccan", numberOfAyahs: 135 },
  { number: 21, name: "Al-Anbiya", arabicName: "الأنبياء", englishName: "The Prophets", revelationType: "Meccan", numberOfAyahs: 112 },
  { number: 22, name: "Al-Hajj", arabicName: "الحج", englishName: "The Pilgrimage", revelationType: "Medinan", numberOfAyahs: 78 },
  { number: 23, name: "Al-Mu'minun", arabicName: "المؤمنون", englishName: "The Believers", revelationType: "Meccan", numberOfAyahs: 118 },
  { number: 24, name: "An-Nur", arabicName: "النور", englishName: "The Light", revelationType: "Medinan", numberOfAyahs: 64 },
  { number: 25, name: "Al-Furqan", arabicName: "الفرقان", englishName: "The Criterion", revelationType: "Meccan", numberOfAyahs: 77 },
  { number: 26, name: "Ash-Shu'ara", arabicName: "الشعراء", englishName: "The Poets", revelationType: "Meccan", numberOfAyahs: 227 },
  { number: 27, name: "An-Naml", arabicName: "النمل", englishName: "The Ant", revelationType: "Meccan", numberOfAyahs: 93 },
  { number: 28, name: "Al-Qasas", arabicName: "القصص", englishName: "The Stories", revelationType: "Meccan", numberOfAyahs: 88 },
  { number: 29, name: "Al-Ankabut", arabicName: "العنكبوت", englishName: "The Spider", revelationType: "Meccan", numberOfAyahs: 69 },
  { number: 30, name: "Ar-Rum", arabicName: "الروم", englishName: "The Romans", revelationType: "Meccan", numberOfAyahs: 60 },
  { number: 31, name: "Luqman", arabicName: "لقمان", englishName: "Luqman", revelationType: "Meccan", numberOfAyahs: 34 },
  { number: 32, name: "As-Sajdah", arabicName: "السجدة", englishName: "The Prostration", revelationType: "Meccan", numberOfAyahs: 30 },
  { number: 33, name: "Al-Ahzab", arabicName: "الأحزاب", englishName: "The Combined Forces", revelationType: "Medinan", numberOfAyahs: 73 },
  { number: 34, name: "Saba", arabicName: "سبإ", englishName: "Sheba", revelationType: "Meccan", numberOfAyahs: 54 },
  { number: 35, name: "Fatir", arabicName: "فاطر", englishName: "Originator", revelationType: "Meccan", numberOfAyahs: 45 },
  { number: 36, name: "Ya-Sin", arabicName: "يس", englishName: "Ya Sin", revelationType: "Meccan", numberOfAyahs: 83 },
  { number: 37, name: "As-Saffat", arabicName: "الصافات", englishName: "Those Ranges in Ranks", revelationType: "Meccan", numberOfAyahs: 182 },
  { number: 38, name: "Sad", arabicName: "ص", englishName: "The Letter Sad", revelationType: "Meccan", numberOfAyahs: 88 },
  { number: 39, name: "Az-Zumar", arabicName: "الزمر", englishName: "The Troops", revelationType: "Meccan", numberOfAyahs: 75 },
  { number: 40, name: "Ghafir", arabicName: "غافر", englishName: "The Forgiver", revelationType: "Meccan", numberOfAyahs: 85 },
  { number: 41, name: "Fussilat", arabicName: "فصلت", englishName: "Explained in Detail", revelationType: "Meccan", numberOfAyahs: 54 },
  { number: 42, name: "Ash-Shuraa", arabicName: "الشورى", englishName: "The Consultation", revelationType: "Meccan", numberOfAyahs: 53 },
  { number: 43, name: "Az-Zukhruf", arabicName: "الزخرف", englishName: "The Ornaments of Gold", revelationType: "Meccan", numberOfAyahs: 89 },
  { number: 44, name: "Ad-Dukhan", arabicName: "الدخان", englishName: "The Smoke", revelationType: "Meccan", numberOfAyahs: 59 },
  { number: 45, name: "Al-Jathiyah", arabicName: "الجاثية", englishName: "The Crouching", revelationType: "Meccan", numberOfAyahs: 37 },
  { number: 46, name: "Al-Ahqaf", arabicName: "الأحقاف", englishName: "The Wind-Curved Sandhills", revelationType: "Meccan", numberOfAyahs: 35 },
  { number: 47, name: "Muhammad", arabicName: "محمد", englishName: "Muhammad", revelationType: "Medinan", numberOfAyahs: 38 },
  { number: 48, name: "Al-Fath", arabicName: "الفتح", englishName: "The Victory", revelationType: "Medinan", numberOfAyahs: 29 },
  { number: 49, name: "Al-Hujurat", arabicName: "الحجرات", englishName: "The Rooms", revelationType: "Medinan", numberOfAyahs: 18 },
  { number: 50, name: "Qaf", arabicName: "ق", englishName: "The Letter Qaf", revelationType: "Meccan", numberOfAyahs: 45 },
  { number: 51, name: "Adh-Dhariyat", arabicName: "الذاريات", englishName: "The Winnowing Winds", revelationType: "Meccan", numberOfAyahs: 60 },
  { number: 52, name: "At-Tur", arabicName: "الطور", englishName: "The Mount", revelationType: "Meccan", numberOfAyahs: 49 },
  { number: 53, name: "An-Najm", arabicName: "النجم", englishName: "The Star", revelationType: "Meccan", numberOfAyahs: 62 },
  { number: 54, name: "Al-Qamar", arabicName: "القمر", englishName: "The Moon", revelationType: "Meccan", numberOfAyahs: 55 },
  { number: 55, name: "Ar-Rahman", arabicName: "الرحمن", englishName: "The Beneficent", revelationType: "Medinan", numberOfAyahs: 78 },
  { number: 56, name: "Al-Waqi'ah", arabicName: "الواقعة", englishName: "The Inevitable", revelationType: "Meccan", numberOfAyahs: 96 },
  { number: 57, name: "Al-Hadid", arabicName: "الحديد", englishName: "The Iron", revelationType: "Medinan", numberOfAyahs: 29 },
  { number: 58, name: "Al-Mujadila", arabicName: "المجادلة", englishName: "The Pleading Woman", revelationType: "Medinan", numberOfAyahs: 22 },
  { number: 59, name: "Al-Hashr", arabicName: "الحشر", englishName: "The Exile", revelationType: "Medinan", numberOfAyahs: 24 },
  { number: 60, name: "Al-Mumtahanah", arabicName: "الممتحنة", englishName: "She that is to be examined", revelationType: "Medinan", numberOfAyahs: 13 },
  { number: 61, name: "As-Saf", arabicName: "الصف", englishName: "The Ranks", revelationType: "Medinan", numberOfAyahs: 14 },
  { number: 62, name: "Al-Jumu'ah", arabicName: "الجمعة", englishName: "The Congregation", revelationType: "Medinan", numberOfAyahs: 11 },
  { number: 63, name: "Al-Munafiqun", arabicName: "المنافقون", englishName: "The Hypocrites", revelationType: "Medinan", numberOfAyahs: 11 },
  { number: 64, name: "At-Taghabun", arabicName: "التغابن", englishName: "The Mutual Disillusion", revelationType: "Medinan", numberOfAyahs: 18 },
  { number: 65, name: "At-Talaq", arabicName: "الطلاق", englishName: "The Divorce", revelationType: "Medinan", numberOfAyahs: 12 },
  { number: 66, name: "At-Tahrim", arabicName: "التحريم", englishName: "The Prohibition", revelationType: "Medinan", numberOfAyahs: 12 },
  { number: 67, name: "Al-Mulk", arabicName: "الملك", englishName: "The Sovereignty", revelationType: "Meccan", numberOfAyahs: 30 },
  { number: 68, name: "Al-Qalam", arabicName: "القلم", englishName: "The Pen", revelationType: "Meccan", numberOfAyahs: 52 },
  { number: 69, name: "Al-Haqqah", arabicName: "الحاقة", englishName: "The Reality", revelationType: "Meccan", numberOfAyahs: 52 },
  { number: 70, name: "Al-Ma'arij", arabicName: "المعارج", englishName: "The Ascending Stairways", revelationType: "Meccan", numberOfAyahs: 44 },
  { number: 71, name: "Nuh", arabicName: "نوح", englishName: "Noah", revelationType: "Meccan", numberOfAyahs: 28 },
  { number: 72, name: "Al-Jinn", arabicName: "الجن", englishName: "The Jinn", revelationType: "Meccan", numberOfAyahs: 28 },
  { number: 73, name: "Al-Muzzammil", arabicName: "المزمل", englishName: "The Enshrouded One", revelationType: "Meccan", numberOfAyahs: 20 },
  { number: 74, name: "Al-Muddaththir", arabicName: "المدثر", englishName: "The Cloaked One", revelationType: "Meccan", numberOfAyahs: 56 },
  { number: 75, name: "Al-Qiyamah", arabicName: "القيامة", englishName: "The Resurrection", revelationType: "Meccan", numberOfAyahs: 40 },
  { number: 76, name: "Al-Insan", arabicName: "الانسان", englishName: "The Man", revelationType: "Medinan", numberOfAyahs: 31 },
  { number: 77, name: "Al-Mursalat", arabicName: "المرسلات", englishName: "The Emissaries", revelationType: "Meccan", numberOfAyahs: 50 },
  { number: 78, name: "An-Naba", arabicName: "النبإ", englishName: "The Tidings", revelationType: "Meccan", numberOfAyahs: 40 },
  { number: 79, name: "An-Nazi'at", arabicName: "النازعات", englishName: "Those who drag forth", revelationType: "Meccan", numberOfAyahs: 46 },
  { number: 80, name: "Abasa", arabicName: "عبس", englishName: "He Frowned", revelationType: "Meccan", numberOfAyahs: 42 },
  { number: 81, name: "At-Takwir", arabicName: "التكوير", englishName: "The Overthrowing", revelationType: "Meccan", numberOfAyahs: 29 },
  { number: 82, name: "Al-Infitar", arabicName: "الإنفطار", englishName: "The Cleaving", revelationType: "Meccan", numberOfAyahs: 19 },
  { number: 83, name: "Al-Mutaffifin", arabicName: "المطففين", englishName: "The Defrauding", revelationType: "Meccan", numberOfAyahs: 36 },
  { number: 84, name: "Al-Inshiqaq", arabicName: "الإنشقاق", englishName: "The Sundering", revelationType: "Meccan", numberOfAyahs: 25 },
  { number: 85, name: "Al-Buruj", arabicName: "البروج", englishName: "The Mansions of the Stars", revelationType: "Meccan", numberOfAyahs: 22 },
  { number: 86, name: "At-Tariq", arabicName: "الطارق", englishName: "The Nightcommer", revelationType: "Meccan", numberOfAyahs: 17 },
  { number: 87, name: "Al-A'la", arabicName: "الأعلى", englishName: "The Most High", revelationType: "Meccan", numberOfAyahs: 19 },
  { number: 88, name: "Al-Ghashiyah", arabicName: "الغاشية", englishName: "The Overwhelming", revelationType: "Meccan", numberOfAyahs: 26 },
  { number: 89, name: "Al-Fajr", arabicName: "الفجر", englishName: "The Dawn", revelationType: "Meccan", numberOfAyahs: 30 },
  { number: 90, name: "Al-Balad", arabicName: "البلد", englishName: "The City", revelationType: "Meccan", numberOfAyahs: 20 },
  { number: 91, name: "Ash-Shams", arabicName: "الشمس", englishName: "The Sun", revelationType: "Meccan", numberOfAyahs: 15 },
  { number: 92, name: "Al-Layl", arabicName: "الليل", englishName: "The Night", revelationType: "Meccan", numberOfAyahs: 21 },
  { number: 93, name: "Ad-Duhaa", arabicName: "الضحى", englishName: "The Morning Hours", revelationType: "Meccan", numberOfAyahs: 11 },
  { number: 94, name: "Ash-Sharh", arabicName: "الشرح", englishName: "The Relief", revelationType: "Meccan", numberOfAyahs: 8 },
  { number: 95, name: "At-Tin", arabicName: "التين", englishName: "The Fig", revelationType: "Meccan", numberOfAyahs: 8 },
  { number: 96, name: "Al-Alaq", arabicName: "العلق", englishName: "The Clot", revelationType: "Meccan", numberOfAyahs: 19 },
  { number: 97, name: "Al-Qadr", arabicName: "القدر", englishName: "The Power", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 98, name: "Al-Bayyinah", arabicName: "البينة", englishName: "The Clear Proof", revelationType: "Medinan", numberOfAyahs: 8 },
  { number: 99, name: "Az-Zalzalah", arabicName: "الزلزلة", englishName: "The Earthquake", revelationType: "Medinan", numberOfAyahs: 8 },
  { number: 100, name: "Al-Adiyat", arabicName: "العاديات", englishName: "The Courser", revelationType: "Meccan", numberOfAyahs: 11 },
  { number: 101, name: "Al-Qari'ah", arabicName: "القارعة", englishName: "The Calamity", revelationType: "Meccan", numberOfAyahs: 11 },
  { number: 102, name: "At-Takathur", arabicName: "التكاثر", englishName: "The Rivalry in world increase", revelationType: "Meccan", numberOfAyahs: 8 },
  { number: 103, name: "Al-Asr", arabicName: "العصر", englishName: "The Declining Day", revelationType: "Meccan", numberOfAyahs: 3 },
  { number: 104, name: "Al-Humazah", arabicName: "الهمزة", englishName: "The Traducer", revelationType: "Meccan", numberOfAyahs: 9 },
  { number: 105, name: "Al-Fil", arabicName: "الفيل", englishName: "The Elephant", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 106, name: "Quraysh", arabicName: "قريش", englishName: "Quraysh", revelationType: "Meccan", numberOfAyahs: 4 },
  { number: 107, name: "Al-Ma'un", arabicName: "الماعون", englishName: "The Small kindnesses", revelationType: "Meccan", numberOfAyahs: 7 },
  { number: 108, name: "Al-Kawthar", arabicName: "الكوثر", englishName: "The Abundance", revelationType: "Meccan", numberOfAyahs: 3 },
  { number: 109, name: "Al-Kafirun", arabicName: "الكافرون", englishName: "The Disbelievers", revelationType: "Meccan", numberOfAyahs: 6 },
  { number: 110, name: "An-Nasr", arabicName: "النصر", englishName: "The Divine Support", revelationType: "Medinan", numberOfAyahs: 3 },
  { number: 111, name: "Al-Masad", arabicName: "المسد", englishName: "The Palm Fiber", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", englishName: "The Sincerity", revelationType: "Meccan", numberOfAyahs: 4 },
  { number: 113, name: "Al-Falaq", arabicName: "الفلق", englishName: "The Daybreak", revelationType: "Meccan", numberOfAyahs: 5 },
  { number: 114, name: "An-Nas", arabicName: "الناس", englishName: "Mankind", revelationType: "Meccan", numberOfAyahs: 6 },
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