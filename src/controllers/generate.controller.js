const { generateContent } = require("../services/openai.service");

async function generate(req, res, next) {
  try {
    const {
      inputText,
      persona,
      model = "gpt-4o-mini",
      audience,
      length = 60,
      context = []
    } = req.body;

    if (!inputText || !persona || !audience) {
      return res.status(400).json({
        error: "inputText, persona, and audience are required."
      });
    }

    const normalizedContext = Array.isArray(context)
      ? context
      : String(context)
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

    const normalizedLength = Number(length);

    if (!Number.isFinite(normalizedLength) || normalizedLength <= 0) {
      return res.status(400).json({
        error: "length must be a positive number."
      });
    }

    const result = await generateContent({
      inputText,
      persona,
      model,
      audience,
      length: normalizedLength,
      context: normalizedContext
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  generate
};
