import { useState } from "react";
import { Search, Volume2 } from "lucide-react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";

interface Dua {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
}

const duasList: Dua[] = [
  {
    id: 1,
    title: "Morning Dua",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal-mulku lillah",
    translation: "We have entered the morning and the sovereignty belongs to Allah",
    reference: "Muslim 2723"
  },
  {
    id: 2,
    title: "Before Eating",
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillah",
    translation: "In the name of Allah",
    reference: "Abu Dawud 3767"
  },
  {
    id: 3,
    title: "After Eating",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
    translation: "Praise be to Allah who has fed us and given us drink and made us Muslims",
    reference: "Abu Dawud 3850"
  },
  {
    id: 4,
    title: "Before Sleep",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translation: "In Your name, O Allah, I die and I live",
    reference: "Bukhari 6312"
  },
  {
    id: 5,
    title: "When Waking Up",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    translation: "Praise is to Allah who gave us life after having taken it from us and unto Him is the resurrection",
    reference: "Bukhari 6312"
  }
];

const Duas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDuas, setFilteredDuas] = useState(duasList);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = duasList.filter(dua =>
      dua.title.toLowerCase().includes(term.toLowerCase()) ||
      dua.translation.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredDuas(filtered);
  };

  const playAudio = (arabicText: string) => {
    // Using Google Translate TTS for Arabic pronunciation
    const utterance = new SpeechSynthesisUtterance(arabicText);
    utterance.lang = 'ar-SA';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          🤲 Duas
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Islamic Supplications</p>
      </div>

      {/* Search */}
      <div className="p-6 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search duas..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Duas List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {filteredDuas.map((dua) => (
          <Card key={dua.id} className="p-6 hover:shadow-glow transition-all animate-fade-in">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-primary">{dua.title}</h3>
              <button
                onClick={() => playAudio(dua.arabic)}
                className="p-2 hover:bg-accent rounded-full transition-colors"
                aria-label="Play audio"
              >
                <Volume2 className="w-5 h-5 text-accent-foreground" />
              </button>
            </div>
            
            <div className="space-y-3">
              <p className="text-2xl arabic-text text-foreground leading-loose">
                {dua.arabic}
              </p>
              
              <p className="text-sm text-muted-foreground italic">
                {dua.transliteration}
              </p>
              
              <p className="text-base text-foreground">
                {dua.translation}
              </p>
              
              <p className="text-xs text-muted-foreground">
                Reference: {dua.reference}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Duas;