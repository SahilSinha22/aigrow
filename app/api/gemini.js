import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      // Initialize Google Generative AI client
      const genAI = new GoogleGenerativeAI("AIzaSyDfce-RAFNX_g_VdXfD-Nod-NMAactLGGQ");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate content using the provided prompt
      const result = await model.generateContent(prompt);

      // Send success response with the generated content
      res.status(200).json({
        message: "Prompt shared successfully",
        generatedContent: result.response.text,
      });
    } catch (error) {
      console.error("Error generating content:", error);
      res.status(500).json({ message: "Failed to generate content", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
