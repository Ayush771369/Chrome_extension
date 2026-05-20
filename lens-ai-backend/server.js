require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.post("/api/ai", async (req, res) => {
  try {

    const { text, actionType } = req.body;

    let prompt = "";

    switch (actionType) {

      case "summarize":
        prompt =
          `Summarize this text clearly:\n\n${text}`;
        break;

      case "explain":
        prompt =
          `Explain this text in beginner-friendly words:\n\n${text}`;
        break;

      case "notes":
        prompt =
          `Convert this into organized study notes:\n\n${text}`;
        break;

      case "keypoints":
        prompt =
          `Extract key takeaways as bullet points:\n\n${text}`;
        break;

      default:
        prompt =
          `Summarize this text:\n\n${text}`;
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result =
      await model.generateContent(prompt);

    const response =
      result.response.text();

    res.json({
      success: true,
      result: response,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: "AI generation failed",
    });

  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});