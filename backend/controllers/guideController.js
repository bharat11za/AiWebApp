import axios from "axios";
import { GoogleGenAI } from "@google/genai";
export const getGuideInfo = async (req, res) => {
  const { city, date } = req.body;

  try {
    const prompt = `
      You are a friendly city guide.
      For city: ${city}, date: ${date}
      1. Suggest 3 upcoming events.
      2. Suggest 3 top recommendations (cafes, parks, attractions).
      3. Provide 2-3 quick tips (emergency numbers, transport advice).
      Keep responses short, clear, and conversational.
    `;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ parts: [{ text: prompt }] }],
      });
      console.log(response.text);
      res.json({ data: response.text })
    }

    main();
    // const response = await axios.post(
    //  `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}` ,

    //   {
    //     contents: [{ parts: [{ text: prompt }] }]
    //   }
    // );

    // const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No data found";
    // res.json({ result: aiText });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching guide info" });
  }
};




// The client gets the API key from the environment variable `GEMINI_API_KEY`.
