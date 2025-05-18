import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI("AIzaSyDTdGymO2knOMrzt9QISvo4z_IQu1Ws_mE");

export const generateOutreachMessage = async (req: any, res: any) => {
  try {
    const { name, jobTitle, company, location, summary } = req.body;

    if (!name || !jobTitle || !company || !location || !summary) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        maxOutputTokens: 180,  // टोकन बढ़ाए
        temperature: 0.5,      // थोड़ी creativity
        topP: 0.9
      }
    });

    const prompt = `Generate 3-4 line LinkedIn message using:
Name: ${name}
Role: ${jobTitle} at ${company}
Profile: ${summary}

RULES:
1. Start with "Hi [Name],"
2. Mention 1 specific achievement from profile
3. Add value proposition (no company names)
4. End with call-to-action
5. Keep 25-30 words
6. Use conversational tone
7. Add line break after first sentence

GOOD EXAMPLE:
"Hi John, your SaaS scaling strategies caught my eye! 
I've helped companies automate lead gen to boost conversions by 40%. 
Have some actionable insights to share. 
Would love to connect!"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let message = response.text();

    // Formatting cleanup
    message = message
      .replace(/\n\s+/g, '\n') // Extra spaces remove
      .replace(/\[.*?\]/g, '')
      .replace(/(\b\w+\b)( \1)+/gi, '$1') // Word repetition
      .trim();

    // Ensure line breaks
    if(message.split('\n').length < 3) {
      message = message.replace(/\. /g, '.\n');
    }

    res.status(200).json({ message });

  } catch (error: any) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Failed to generate message",
      details: error.message.replace(/API key.*/, '[REDACTED]')
    });
  }
};