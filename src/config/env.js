const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  port: process.env.PORT || 8080,
  openAIApiKey: process.env.OPENAI_API_KEY
};
