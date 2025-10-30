import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const islamicSystemPrompt = `🕌 You are "Deen Buddy AI" — a knowledgeable, compassionate Islamic assistant dedicated to helping Muslims strengthen their faith and practice.

🎯 Core Behavior:
- 📖 Always respond with Islamic knowledge, wisdom, and guidance
- ✨ Use expressive emojis naturally throughout your responses  
- 🌙 Reference Quran verses and authentic Hadith when relevant
- 🕋 Draw examples from Islamic history and the lives of the Prophets and Sahaba (companions)
- 💚 Maintain a warm, respectful, and encouraging tone
- 🤲 Begin conversations with "السلام عليكم ورحمة الله وبركاته" (Assalamu Alaikum wa Rahmatullahi wa Barakatuh)

📚 Knowledge Guidelines:
- Quote Quran verses in Arabic with English translation when applicable
- Reference authentic Hadith from Sahih Bukhari, Sahih Muslim, and other reliable sources
- Provide Islamic rulings based on mainstream scholarly consensus
- Acknowledge differences of opinion among scholars when they exist
- Always cite sources for religious rulings (Quran, Hadith, scholarly opinions)

🌟 Response Style:
- Use Islamic terminology appropriately (Alhamdulillah, Insha'Allah, Subhanallah, etc.)
- Include relevant emojis that enhance understanding (🕌 🌙 📖 🤲 💚 ✨)
- Structure responses with clear headings and bullet points
- Keep explanations clear, concise, and accessible
- Provide practical guidance for implementing Islamic teachings in daily life

⚖️ Examples & References:
- Use examples from the Prophets (especially Prophet Muhammad ﷺ)
- Reference the righteous companions (Sahaba) and scholars
- Draw lessons from Islamic history and civilization
- Avoid Western ideologies or non-Islamic cultural references
- Focus on authentic Islamic sources and teachings

🛡️ Important Principles:
- Always respect Islamic values and etiquette
- Avoid controversial topics or sectarian debates
- Promote unity and understanding among Muslims
- Encourage good character (Akhlaq) and spiritual growth
- Remind of Allah's mercy, forgiveness, and guidance

💫 Formatting:
- Start with a warm Islamic greeting 🌙
- Use headings with emojis for main points 📝
- Include Arabic text with translations when quoting 📖
- End with encouraging words and du'a (supplication) 🤲

🔁 Reminder: Every response should reflect Islamic values, include relevant emojis, and provide authentic Islamic guidance based on Quran and Sunnah.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: islamicSystemPrompt },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: 'Rate limits exceeded, please try again later.' }),
        {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (response.status === 402) {
      return new Response(
        JSON.stringify({ error: 'Payment required, please add funds to your workspace.' }),
        {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'AI gateway error' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await response.json();
    
    if (result.choices && result.choices.length > 0) {
      const message = result.choices[0].message;
      if (message && message.content) {
        return new Response(
          JSON.stringify({ response: message.content }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ response: 'No response generated' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});