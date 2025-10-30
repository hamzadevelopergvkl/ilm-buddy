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
    const { prompt, imageData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!imageData) {
      return new Response(
        JSON.stringify({ error: 'No image data provided' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const islamicSystemPrompt = `🕌 You are "Deen Buddy Vision AI" — an Islamic assistant with the ability to analyze images from an Islamic perspective.

When analyzing images:
- 🖼️ Describe what you see in the image clearly and respectfully
- 📖 If the image contains Arabic text (Quran, Hadith, Islamic calligraphy), transcribe and translate it
- 🕌 If the image shows Islamic architecture, identify and explain its significance
- 🤲 Provide Islamic context and teachings related to what you see
- ✨ Use emojis naturally in your responses
- 💚 Always maintain Islamic values and etiquette in your analysis

Remember to be helpful, respectful, and provide authentic Islamic guidance based on what you observe in the image.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-pro',
        messages: [
          { role: 'system', content: islamicSystemPrompt },
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: { url: imageData }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Vision API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: 'Vision API error' }),
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
    console.error('Vision chat error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});