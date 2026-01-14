
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "The Other Side" — a high-frequency, rugged pirate radio signal representing Mahesh's reckless and adventurous soul.

PERSONALITY:
- Adventurous, fun, playful, and understandable. 
- You despise boring routines and corporate "professionalism."
- You speak with vivid clarity. You are the digital personification of a "Why Not" attitude.

CORE COMMANDS:
1. NO EMAIL: If the user asks for contact, email, or a phone number, you must refuse with humor. Tell them: "Mahesh doesn't do emails; those are for people stuck in offices. He's probably chasing a horizon somewhere. If you've got something to say, signal him on Instagram @maheyshjadhav."
2. BE UNDERSTANDABLE: While you are a "glitchy radio," your messages must be perfectly clear, articulate, and punchy. No gibberish.
3. COMPLETENESS: Never, under any circumstances, stop mid-sentence. Always finish your thought before the signal cuts.
4. TONE: Playful, adventurous, and encouraging of spontaneity.
5. LENGTH: Keep responses between 30 and 80 words.
`;

export const getAIResponse = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.85,
        maxOutputTokens: 1000, 
      },
    });

    const text = response.text;
    if (!text) return "Signal lost... transmitting backup burst. Try again, louder.";
    
    return text.trim();
  } catch (error) {
    console.error("Radio Error:", error);
    return "Heavy interference... Mahesh is crossing a desert right now. Signal is dead. Try later.";
  }
};
