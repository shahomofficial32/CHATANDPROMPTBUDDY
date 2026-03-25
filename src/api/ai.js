import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

// UPGRADED: Now uses a Stream to return text chunk-by-chunk
export const getGeminiResponseStream = async (chatHistory, newPrompt) => {
  try {
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    formattedHistory.push({
      role: 'user',
      parts: [{ text: newPrompt }]
    });

    // Notice the "Stream" at the end here!
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
    });

    return responseStream;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to get response from AI. Please try again.");
  }
};

export const generateChatTitle = async (userPrompt) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are a helpful assistant. Generate a short, concise title (maximum 4 words) for a chat session that starts with this prompt: "${userPrompt}". Reply ONLY with the title. Do not use quotes, periods, or conversational filler.`,
    });
    
    return response.text.replace(/["']/g, "").trim();
  } catch (error) {
    console.error("Failed to generate title:", error);
    return "New Conversation";
  }
};