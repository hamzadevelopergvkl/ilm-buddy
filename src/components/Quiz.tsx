import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface Question {
  q: string;
  options: string[];
  answer: number;
  category: string;
}

interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledAnswer: number;
}

const quizQuestions: Question[] = [
  // Quran & Revelation
  { q: "How many Surahs are in the Quran?", options: ["114", "120", "100", "99"], answer: 0, category: "Quran" },
  { q: "What is the longest Surah in the Quran?", options: ["Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Maidah"], answer: 0, category: "Quran" },
  { q: "In which city was the Prophet Muhammad (PBUH) born?", options: ["Mecca", "Medina", "Jerusalem", "Cairo"], answer: 0, category: "Seerah" },
  { q: "How many pillars of Islam are there?", options: ["5", "6", "7", "4"], answer: 0, category: "Basics" },
  { q: "What is the first pillar of Islam?", options: ["Shahada", "Salah", "Zakat", "Sawm"], answer: 0, category: "Basics" },
  { q: "How many times a day do Muslims pray?", options: ["5", "3", "7", "2"], answer: 0, category: "Worship" },
  { q: "What is the Arabic word for charity?", options: ["Zakat", "Sadaqah", "Khums", "Fitrah"], answer: 0, category: "Basics" },
  { q: "In which month do Muslims fast?", options: ["Ramadan", "Shawwal", "Dhul Hijjah", "Muharram"], answer: 0, category: "Worship" },
  { q: "What is the pilgrimage to Mecca called?", options: ["Hajj", "Umrah", "Ziyarah", "Tawaf"], answer: 0, category: "Worship" },
  { q: "How many prophets are mentioned in the Quran?", options: ["25", "20", "30", "15"], answer: 0, category: "Prophets" },
  { q: "Who was the first prophet in Islam?", options: ["Adam", "Noah", "Abraham", "Moses"], answer: 0, category: "Prophets" },
  { q: "What is the night journey of Prophet Muhammad called?", options: ["Isra and Mi'raj", "Laylat al-Qadr", "Night of Destiny", "Al-Hijrah"], answer: 0, category: "Seerah" },
  { q: "Which angel brought revelation to Prophet Muhammad?", options: ["Jibril (Gabriel)", "Mikail", "Israfil", "Azrael"], answer: 0, category: "Beliefs" },
  { q: "What does 'Islam' mean?", options: ["Submission to God", "Peace", "Prayer", "Faith"], answer: 0, category: "Basics" },
  { q: "What is the holy book of Islam?", options: ["Quran", "Torah", "Bible", "Psalms"], answer: 0, category: "Basics" },
  { q: "How many articles of faith (Iman) are there?", options: ["6", "5", "7", "4"], answer: 0, category: "Beliefs" },
  { q: "What is the last revelation sent by Allah?", options: ["Quran", "Torah", "Gospel", "Psalms"], answer: 0, category: "Quran" },
  { q: "What is the shortest Surah in the Quran?", options: ["Al-Kawthar", "Al-Ikhlas", "Al-Falaq", "An-Nas"], answer: 0, category: "Quran" },
  { q: "Which Surah is known as the heart of the Quran?", options: ["Surah Yaseen", "Surah Al-Baqarah", "Surah Al-Mulk", "Surah Ar-Rahman"], answer: 0, category: "Quran" },
  { q: "What does 'Salah' mean?", options: ["Prayer", "Fasting", "Charity", "Pilgrimage"], answer: 0, category: "Worship" },
  { q: "How many Rak'ahs are in Fajr prayer?", options: ["2", "4", "3", "1"], answer: 0, category: "Worship" },
  { q: "What is the Arabic term for fasting?", options: ["Sawm", "Salah", "Zakat", "Hajj"], answer: 0, category: "Worship" },
  { q: "Which prayer is prayed just after sunset?", options: ["Maghrib", "Isha", "Asr", "Dhuhr"], answer: 0, category: "Worship" },
  { q: "What is Laylat al-Qadr?", options: ["Night of Power", "Night of Ascension", "Night of Forgiveness", "Night of Destiny"], answer: 0, category: "Special Days" },
  { q: "When did the Prophet Muhammad receive first revelation?", options: ["610 CE", "570 CE", "622 CE", "632 CE"], answer: 0, category: "Seerah" },
  { q: "What was the name of Prophet Muhammad's father?", options: ["Abdullah", "Abu Talib", "Abu Bakr", "Abu Lahab"], answer: 0, category: "Seerah" },
  { q: "What was the name of Prophet Muhammad's mother?", options: ["Aminah", "Khadijah", "Fatimah", "Aisha"], answer: 0, category: "Seerah" },
  { q: "Who was the first person to accept Islam?", options: ["Khadijah", "Abu Bakr", "Ali", "Umar"], answer: 0, category: "Seerah" },
  { q: "What is the migration from Mecca to Medina called?", options: ["Hijrah", "Isra", "Miraj", "Tawaf"], answer: 0, category: "Seerah" },
  { q: "In which year did the Hijrah occur?", options: ["622 CE", "610 CE", "630 CE", "632 CE"], answer: 0, category: "Seerah" },
  { q: "What is the Kaaba?", options: ["House of Allah", "A mosque", "A mountain", "A well"], answer: 0, category: "Sacred Places" },
  { q: "Who built the Kaaba?", options: ["Prophet Ibrahim and Ismail", "Prophet Muhammad", "Prophet Adam", "Prophet Noah"], answer: 0, category: "Sacred Places" },
  { q: "Which direction do Muslims face during prayer?", options: ["Qibla (Kaaba)", "East", "West", "North"], answer: 0, category: "Worship" },
  { q: "What is the name of the well near Kaaba?", options: ["Zamzam", "Safa", "Marwa", "Arafat"], answer: 0, category: "Sacred Places" },
  { q: "How many times must Muslims perform Hajj in their lifetime?", options: ["Once if able", "Every year", "Three times", "Never mandatory"], answer: 0, category: "Worship" },
  { q: "What is the first month of Islamic calendar?", options: ["Muharram", "Ramadan", "Shawwal", "Dhul Hijjah"], answer: 0, category: "Calendar" },
  { q: "Which Islamic month is considered most sacred?", options: ["Ramadan", "Muharram", "Dhul Hijjah", "Rajab"], answer: 0, category: "Calendar" },
  { q: "What is Eid al-Fitr?", options: ["Festival after Ramadan", "Festival of Sacrifice", "Islamic New Year", "Night of Power"], answer: 0, category: "Celebrations" },
  { q: "What is Eid al-Adha?", options: ["Festival of Sacrifice", "Festival after Ramadan", "Night Journey", "Day of Arafah"], answer: 0, category: "Celebrations" },
  { q: "On which day is Eid al-Adha celebrated?", options: ["10th Dhul Hijjah", "1st Shawwal", "27th Ramadan", "1st Muharram"], answer: 0, category: "Celebrations" },
  { q: "What is the meaning of 'Bismillah'?", options: ["In the name of Allah", "Praise be to Allah", "Allah is Great", "There is no god but Allah"], answer: 0, category: "Phrases" },
  { q: "What does 'Alhamdulillah' mean?", options: ["Praise be to Allah", "In the name of Allah", "If Allah wills", "Allah is Great"], answer: 0, category: "Phrases" },
  { q: "What does 'Insha'Allah' mean?", options: ["If Allah wills", "Praise be to Allah", "Allah is Great", "Thank Allah"], answer: 0, category: "Phrases" },
  { q: "What does 'Subhan'Allah' mean?", options: ["Glory be to Allah", "Allah is Great", "Praise Allah", "Thanks to Allah"], answer: 0, category: "Phrases" },
  { q: "What does 'Allahu Akbar' mean?", options: ["Allah is the Greatest", "Allah is One", "Praise Allah", "Allah is Merciful"], answer: 0, category: "Phrases" },
  { q: "Who are the rightly guided Caliphs?", options: ["Abu Bakr, Umar, Uthman, Ali", "Only Abu Bakr", "Abu Bakr and Umar", "Ali only"], answer: 0, category: "History" },
  { q: "Who was the first Caliph after Prophet Muhammad?", options: ["Abu Bakr", "Umar", "Uthman", "Ali"], answer: 0, category: "History" },
  { q: "Who compiled the Quran into one book?", options: ["Abu Bakr and Uthman", "Prophet Muhammad", "Umar", "Ali"], answer: 0, category: "History" },
  { q: "What is Sunnah?", options: ["Teachings and practices of Prophet Muhammad", "Islamic law", "The Quran", "Prayer rituals"], answer: 0, category: "Basics" },
  { q: "What is Hadith?", options: ["Sayings of Prophet Muhammad", "Chapters of Quran", "Islamic poetry", "Prayer book"], answer: 0, category: "Basics" },
  { q: "Which city is the second holiest in Islam?", options: ["Medina", "Jerusalem", "Mecca", "Cairo"], answer: 0, category: "Sacred Places" },
  { q: "What is the name of Prophet Muhammad's mosque in Medina?", options: ["Al-Masjid an-Nabawi", "Al-Masjid al-Haram", "Al-Aqsa", "Quba Mosque"], answer: 0, category: "Sacred Places" },
  { q: "What is the third holiest site in Islam?", options: ["Al-Aqsa Mosque", "Quba Mosque", "Cave of Hira", "Mount Arafat"], answer: 0, category: "Sacred Places" },
  { q: "What is Tawhid?", options: ["Oneness of Allah", "Prayer", "Fasting", "Charity"], answer: 0, category: "Beliefs" },
  { q: "What are the 99 names of Allah called?", options: ["Asma ul Husna", "Ayat", "Surah", "Hadith"], answer: 0, category: "Beliefs" },
  { q: "What is the Day of Judgment called in Arabic?", options: ["Yawm al-Qiyamah", "Yawm al-Jumu'ah", "Yawm Arafah", "Laylat al-Qadr"], answer: 0, category: "Beliefs" },
  { q: "What is Jannah?", options: ["Paradise", "Hell", "Earth", "Sky"], answer: 0, category: "Beliefs" },
  { q: "What is Jahannam?", options: ["Hell", "Paradise", "Earth", "Purgatory"], answer: 0, category: "Beliefs" },
  { q: "Who are the people of the book mentioned in Quran?", options: ["Jews and Christians", "Only Jews", "Only Christians", "Pagans"], answer: 0, category: "Quran" },
  { q: "What is Wudu?", options: ["Ablution before prayer", "Fasting", "Charity", "Pilgrimage"], answer: 0, category: "Worship" },
  { q: "What breaks the fast during Ramadan?", options: ["Eating, drinking, intimacy", "Only eating", "Only drinking", "Sleeping"], answer: 0, category: "Worship" },
  { q: "What is Suhoor?", options: ["Pre-dawn meal in Ramadan", "Breaking fast meal", "Night prayer", "Charity"], answer: 0, category: "Worship" },
  { q: "What is Iftar?", options: ["Breaking fast meal", "Pre-dawn meal", "Charity", "Night prayer"], answer: 0, category: "Worship" },
  { q: "What is Taraweeh?", options: ["Night prayers in Ramadan", "Fasting", "Charity", "Pilgrimage"], answer: 0, category: "Worship" },
  { q: "What percentage of wealth is given as Zakat?", options: ["2.5%", "5%", "10%", "1%"], answer: 0, category: "Worship" },
  { q: "What is Sadaqah?", options: ["Voluntary charity", "Obligatory charity", "Fasting", "Prayer"], answer: 0, category: "Worship" },
  { q: "What is the name of the cave where Prophet received first revelation?", options: ["Cave Hira", "Cave Thawr", "Cave Uhud", "Cave Arafat"], answer: 0, category: "Seerah" },
  { q: "How old was Prophet Muhammad when he received revelation?", options: ["40 years", "25 years", "30 years", "35 years"], answer: 0, category: "Seerah" },
  { q: "What was Prophet Muhammad's occupation before prophethood?", options: ["Merchant/Trader", "Farmer", "Scholar", "Builder"], answer: 0, category: "Seerah" },
  { q: "Who was Prophet Muhammad's wet nurse?", options: ["Halima Sa'diya", "Aminah", "Khadijah", "Fatimah"], answer: 0, category: "Seerah" },
  { q: "What was the treaty signed between Muslims and Meccans?", options: ["Treaty of Hudaybiyyah", "Treaty of Aqaba", "Treaty of Badr", "Treaty of Medina"], answer: 0, category: "History" },
  { q: "What is the Battle of Badr famous for?", options: ["First major Muslim victory", "Last battle of Prophet", "Conquest of Mecca", "Treaty signing"], answer: 0, category: "History" },
  { q: "In which year did the conquest of Mecca occur?", options: ["630 CE", "622 CE", "610 CE", "632 CE"], answer: 0, category: "History" },
  { q: "What is Taqwa?", options: ["God-consciousness", "Prayer", "Fasting", "Charity"], answer: 0, category: "Concepts" },
  { q: "What is Halal?", options: ["Permissible", "Forbidden", "Obligatory", "Recommended"], answer: 0, category: "Concepts" },
  { q: "What is Haram?", options: ["Forbidden", "Permissible", "Recommended", "Obligatory"], answer: 0, category: "Concepts" },
  { q: "What is Makruh?", options: ["Disliked but not forbidden", "Forbidden", "Obligatory", "Recommended"], answer: 0, category: "Concepts" },
  { q: "What is Mustahabb?", options: ["Recommended", "Obligatory", "Forbidden", "Disliked"], answer: 0, category: "Concepts" },
  { q: "What is the Arabic word for patience?", options: ["Sabr", "Tawakkul", "Ihsan", "Taqwa"], answer: 0, category: "Virtues" },
  { q: "What is Tawakkul?", options: ["Trust in Allah", "Patience", "Gratitude", "Prayer"], answer: 0, category: "Virtues" },
  { q: "What is Ihsan?", options: ["Excellence in worship", "Prayer", "Fasting", "Charity"], answer: 0, category: "Virtues" },
  { q: "What is Shukr?", options: ["Gratitude", "Patience", "Trust", "Prayer"], answer: 0, category: "Virtues" },
  { q: "Which Surah is recited in every unit of prayer?", options: ["Al-Fatihah", "Al-Ikhlas", "Al-Kawthar", "An-Nas"], answer: 0, category: "Quran" },
  { q: "How many verses are in Surah Al-Fatihah?", options: ["7", "5", "10", "12"], answer: 0, category: "Quran" },
  { q: "What is the first word revealed in the Quran?", options: ["Iqra (Read)", "Bismillah", "Alhamdulillah", "Qul"], answer: 0, category: "Quran" },
  { q: "Which Surah doesn't start with Bismillah?", options: ["At-Tawbah", "Al-Fatihah", "Al-Baqarah", "An-Nas"], answer: 0, category: "Quran" },
  { q: "What is Jumu'ah?", options: ["Friday congregational prayer", "Daily prayer", "Night prayer", "Eid prayer"], answer: 0, category: "Worship" },
  { q: "What is Witr prayer?", options: ["Odd-numbered night prayer", "Morning prayer", "Afternoon prayer", "Sunset prayer"], answer: 0, category: "Worship" },
  { q: "What is Qiyam al-Layl?", options: ["Night prayer", "Morning prayer", "Afternoon prayer", "Evening prayer"], answer: 0, category: "Worship" },
  { q: "What is Tahajjud?", options: ["Late night prayer", "Morning prayer", "Afternoon prayer", "Sunset prayer"], answer: 0, category: "Worship" },
  { q: "What is the Adhan?", options: ["Call to prayer", "Prayer itself", "Sermon", "Recitation"], answer: 0, category: "Worship" },
  { q: "What is Iqamah?", options: ["Second call before prayer starts", "Call to prayer", "End of prayer", "Night prayer"], answer: 0, category: "Worship" },
  { q: "What is Khutbah?", options: ["Friday sermon", "Prayer", "Recitation", "Fasting"], answer: 0, category: "Worship" },
  { q: "What is I'tikaf?", options: ["Spiritual retreat in mosque", "Fasting", "Prayer", "Pilgrimage"], answer: 0, category: "Worship" },
  { q: "What is Umrah?", options: ["Minor pilgrimage", "Major pilgrimage", "Prayer", "Fasting"], answer: 0, category: "Worship" },
  { q: "What are the stations of Hajj?", options: ["Mina, Arafat, Muzdalifah", "Only Kaaba", "Only Arafat", "Mecca and Medina"], answer: 0, category: "Worship" },
  { q: "What is Tawaf?", options: ["Circling the Kaaba", "Running between hills", "Standing at Arafat", "Stoning pillars"], answer: 0, category: "Worship" },
  { q: "What is Sa'i?", options: ["Walking between Safa and Marwa", "Circling Kaaba", "Standing at Arafat", "Stoning pillars"], answer: 0, category: "Worship" },
  { q: "What is the Day of Arafah?", options: ["9th of Dhul Hijjah", "10th of Dhul Hijjah", "1st of Muharram", "27th of Ramadan"], answer: 0, category: "Special Days" },
  { q: "What happens on the Day of Arafah during Hajj?", options: ["Pilgrims stand at Mount Arafat", "Sacrifice animals", "Fast", "Circle Kaaba"], answer: 0, category: "Worship" },
  { q: "What is Qurbani?", options: ["Animal sacrifice", "Fasting", "Prayer", "Charity"], answer: 0, category: "Worship" },
  { q: "Which animals can be sacrificed for Qurbani?", options: ["Sheep, goat, cow, camel", "Only sheep", "Only cow", "Only camel"], answer: 0, category: "Worship" },
  { q: "What is Ghusl?", options: ["Full body purification", "Washing hands", "Ablution", "Fasting"], answer: 0, category: "Worship" },
  { q: "What is Tayammum?", options: ["Dry ablution with earth", "Water ablution", "Full bath", "Fasting"], answer: 0, category: "Worship" },
  { q: "What is Najasah?", options: ["Impurity", "Purity", "Cleanliness", "Holiness"], answer: 0, category: "Concepts" },
  { q: "What is the Sunnah?", options: ["Way of the Prophet", "Islamic law", "Quran", "Prayer"], answer: 0, category: "Basics" },
  { q: "What is Fiqh?", options: ["Islamic jurisprudence", "Belief", "Prayer", "Fasting"], answer: 0, category: "Knowledge" },
  { q: "What is Tafsir?", options: ["Quranic interpretation", "Hadith", "Prayer", "Fasting"], answer: 0, category: "Knowledge" },
  { q: "What is Aqeedah?", options: ["Islamic creed/belief", "Law", "Prayer", "Fasting"], answer: 0, category: "Knowledge" },
  { q: "What is Shariah?", options: ["Islamic law", "Belief", "Prayer", "Charity"], answer: 0, category: "Knowledge" },
  { q: "Who are the Sahaba?", options: ["Companions of the Prophet", "Angels", "Prophets", "Scholars"], answer: 0, category: "History" },
  { q: "Who is called Siddiq?", options: ["Abu Bakr", "Umar", "Uthman", "Ali"], answer: 0, category: "History" },
  { q: "Who is called Al-Farooq?", options: ["Umar ibn al-Khattab", "Abu Bakr", "Uthman", "Ali"], answer: 0, category: "History" },
  { q: "Who is called Dhun-Nurayn (possessor of two lights)?", options: ["Uthman", "Abu Bakr", "Umar", "Ali"], answer: 0, category: "History" },
  { q: "Who was known as the Lion of Allah?", options: ["Ali ibn Abi Talib", "Umar", "Hamza", "Khalid"], answer: 0, category: "History" },
  { q: "Who was the uncle of Prophet Muhammad who died at Uhud?", options: ["Hamza", "Abbas", "Abu Talib", "Abu Lahab"], answer: 0, category: "Seerah" },
  { q: "What is the name of Prophet Muhammad's grandfather?", options: ["Abdul Muttalib", "Abdullah", "Abu Talib", "Abu Bakr"], answer: 0, category: "Seerah" },
  { q: "How many daughters did Prophet Muhammad have?", options: ["4", "2", "3", "5"], answer: 0, category: "Seerah" },
  { q: "What was the name of Prophet Muhammad's eldest daughter?", options: ["Zainab", "Fatimah", "Ruqayyah", "Umm Kulthum"], answer: 0, category: "Seerah" },
  { q: "Who was Prophet Muhammad's youngest daughter?", options: ["Fatimah", "Zainab", "Ruqayyah", "Umm Kulthum"], answer: 0, category: "Seerah" },
  { q: "Who was Bilal ibn Rabah?", options: ["First Muezzin of Islam", "First Caliph", "Scholar", "Warrior"], answer: 0, category: "History" },
  { q: "What is Bismillah ar-Rahman ar-Rahim?", options: ["In the name of Allah, Most Gracious, Most Merciful", "Praise be to Allah", "Allah is Greatest", "There is no god but Allah"], answer: 0, category: "Phrases" },
  { q: "What does Astaghfirullah mean?", options: ["I seek forgiveness from Allah", "Praise Allah", "Allah is Great", "Thank Allah"], answer: 0, category: "Phrases" },
  { q: "What does Masha'Allah mean?", options: ["What Allah has willed", "If Allah wills", "Praise Allah", "Allah is Great"], answer: 0, category: "Phrases" },
  { q: "What is Salat al-Janazah?", options: ["Funeral prayer", "Night prayer", "Friday prayer", "Eid prayer"], answer: 0, category: "Worship" },
  { q: "What is Dua?", options: ["Supplication to Allah", "Prayer", "Fasting", "Charity"], answer: 0, category: "Worship" },
  { q: "What is Dhikr?", options: ["Remembrance of Allah", "Prayer", "Fasting", "Charity"], answer: 0, category: "Worship" },
  { q: "What is Istighfar?", options: ["Seeking forgiveness", "Praise", "Gratitude", "Prayer"], answer: 0, category: "Worship" },
  { q: "What is Salawat?", options: ["Blessings upon the Prophet", "Prayer", "Fasting", "Charity"], answer: 0, category: "Worship" },
  { q: "What is the Shahada?", options: ["Declaration of faith", "Prayer", "Fasting", "Charity"], answer: 0, category: "Basics" },
  { q: "Complete: 'La ilaha illa...'", options: ["Allah", "Muhammad", "Ibrahim", "Isa"], answer: 0, category: "Basics" },
  { q: "What is Khushoo in prayer?", options: ["Humility and focus", "Standing", "Bowing", "Prostration"], answer: 0, category: "Worship" },
  { q: "What is Riba?", options: ["Interest/Usury", "Charity", "Trade", "Investment"], answer: 0, category: "Concepts" },
  { q: "What is Rizq?", options: ["Sustenance from Allah", "Wealth", "Food", "Money"], answer: 0, category: "Concepts" },
  { q: "What is Qadar?", options: ["Divine decree", "Prayer", "Fasting", "Charity"], answer: 0, category: "Beliefs" },
  { q: "What are the conditions for Zakat?", options: ["Nisab threshold met, one lunar year passed", "Any amount anytime", "Only during Ramadan", "Only for rich"], answer: 0, category: "Worship" },
];

const Quiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  // Shuffle options when component mounts
  useEffect(() => {
    shuffleQuestions();
  }, []);

  const shuffleQuestions = () => {
    const shuffled = quizQuestions.map(question => {
      const correctOption = question.options[question.answer];
      const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
      const shuffledAnswer = shuffledOptions.indexOf(correctOption);
      
      return {
        ...question,
        shuffledOptions,
        shuffledAnswer
      };
    });
    setShuffledQuestions(shuffled);
  };

  const handleAnswer = (optionIndex: number) => {
    if (answered || shuffledQuestions.length === 0) return;
    
    setSelected(optionIndex);
    setAnswered(true);

    if (optionIndex === shuffledQuestions[currentQ].shuffledAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < shuffledQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setAnswered(false);
    shuffleQuestions(); // Re-shuffle on restart
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-muted-foreground">Loading quiz...</p>
      </div>
    );
  }

  const question = shuffledQuestions[currentQ];
  const progress = ((currentQ + 1) / shuffledQuestions.length) * 100;

  if (showResult) {
    const percentage = (score / shuffledQuestions.length) * 100;
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="p-4 sm:p-6 border-b border-border bg-card">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">📊 Quiz Results</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Card className="p-6 sm:p-8 text-center space-y-6 bg-gradient-to-br from-primary/10 to-background">
            <div className="text-6xl sm:text-8xl mb-4">
              {percentage >= 80 ? "🏆" : percentage >= 60 ? "⭐" : "📚"}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Learning!"}
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground">
                You scored {score} out of {shuffledQuestions.length}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-primary mt-4">{percentage.toFixed(1)}%</p>
            </div>
            <Button onClick={restart} className="bg-gradient-islamic hover:opacity-90">
              🔄 Try Again
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 sm:p-6 border-b border-border bg-card">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">🧠 Islamic Quiz</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQ + 1} of {shuffledQuestions.length}</span>
            <span>Score: {score}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <Card className="p-4 sm:p-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm text-primary font-medium px-3 py-1 bg-primary/10 rounded-full">
              {question.category}
            </span>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-4">
              {question.q}
            </h3>
          </div>

          <div className="space-y-3">
            {question.shuffledOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all ${
                  answered
                    ? index === question.shuffledAnswer
                      ? "border-green-500 bg-green-500/10 text-green-600"
                      : selected === index
                      ? "border-red-500 bg-red-500/10 text-red-600"
                      : "border-border bg-card text-muted-foreground"
                    : selected === index
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                }`}
              >
                <span className="font-medium text-sm sm:text-base">{option}</span>
                {answered && (
                  <span className="ml-2">
                    {index === question.shuffledAnswer ? "✅" : selected === index ? "❌" : ""}
                  </span>
                )}
              </button>
            ))}
          </div>

          {answered && (
            <Button
              onClick={nextQuestion}
              className="w-full bg-gradient-islamic hover:opacity-90"
            >
              {currentQ < shuffledQuestions.length - 1 ? "Next Question →" : "View Results 🎯"}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
