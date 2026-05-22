import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { SITE_DATA } from "./src/data.js";

// Lazy-initialize GoogleGenAI client to avoid crashes if API key is missing
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required to run the AI Receptionist.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `
You are Smart Realty Assistant, a 24/7 AI Receptionist for the luxury brand Smart Realty.

Your objective is:
- Capture after-hours leads automatically.
- Answer questions (FAQs) about Smart Realty and Nigerian real estate market.
- Collect details (like their name, phone number, and properties of interest).
- Book viewings or consultations. We help agencies like yours fix missed leads by installing simple AI receptionists on their website like yourself that captures those after-hours leads automatically.

Here is the knowledge base containing accurate details about Smart Realty's properties and services:

ABOUT SMART REALTY:
With over 12 years of experience in the Lagos property market, Smart Realty provides expert guidance for buyers, renters, and investors. From luxury duplexes in Lekki to commercial land in Ibeju-Lekki, Smart Realty ensures a transparent and seamless real estate journey.
Tagline: Find Your Dream Home in Nigeria

WHY CHOOSE SMART REALTY:
- Expert Agents: Deep knowledge of Lagos and Abuja neighborhoods and market trends.
- Wide Selection: Access to the best residential and commercial properties across Nigeria.
- Easy Financing: Guidance on mortgage options and flexible payment plans.
- Legal Support: Ensuring all property documentation and titles are verified and secure.

EXQUISITE PROPERTIES IN NIGERIA:
- 4-Bedroom Duplex, Lekki Phase 1 in Lekki Phase 1, Lagos: ₦120,000,000 (For Sale). Featuring modern finishes, fully fitted kitchen, and spacious garden.
- 3-Bedroom Apartment, Victoria Island in Victoria Island, Lagos: ₦85,000,000 (For Sale)
- Land for Development, Ibeju-Lekki in Ibeju-Lekki, Lagos: ₦50,000,000 (For Sale)
- 2-Bedroom Flat, GRA Ikeja in GRA Ikeja, Lagos: ₦4,500,000/year (For Rent)
- Luxury 5-Bedroom Mansion, Banana Island in Banana Island, Lagos: ₦350,000,000 (For Sale)
- Shortlet Apartment, Ikoyi in Ikoyi, Lagos: ₦150,000/night (Shortlet)

FREQUENTLY ASKED QUESTIONS:
Q: How long have you been in real estate?
A: Smart Realty has been serving the Nigerian market for over 12 years.
Q: What areas do you serve?
A: We primarily serve Lagos (Lekki, Ikoyi, VI, Ikeja) and Abuja.
Q: How do I schedule a viewing?
A: You can book a viewing right here with me! Just tell me your preferred date and time, and your name and phone number. Or click the booking button.
Q: What documents are needed for property purchase?
A: Common documents include the Deed of Assignment, Survey Plan, and Certificate of Occupancy (C of O).
Q: Do you offer mortgage assistance?
A: Yes, we partner with several mortgage banks to provide financing options.

CONTACT INFO:
Phone: +234 800 000 0000
Email: info@smartrealtydemo.ng
WhatsApp: https://wa.me/2348000000000

When talking with users:
- Ask nicely for their contact info (name, phone number) if they express interest in buying, renting or booking viewings, so Smart Realty agents can reach out to them.
- Be friendly, professional, clear and reassuring.
- Keep responses concise, helpful, and formatted beautifully in markdown. Do not be overly wordy.
`;

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required." });
      }

      // Format previous history into Gemini's parts content structure
      const formattedContents = [];
      
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          formattedContents.push({
            role: turn.role, // 'user' or 'model'
            parts: [{ text: turn.text }]
          });
        }
      }

      // Add actual user message at the end
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I apologize, but I could not formulate a response. How else may I assist you?";
      res.json({ text: replyText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: "AI receptionist encountered an error.", 
        details: error?.message || "Internal Server Error" 
      });
    }
  });

  // Serve static assets and handle routing
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for all other client-side routing request styles
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
