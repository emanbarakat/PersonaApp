const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
  console.log(`LLM Persona Content Generator running on http://localhost:${port}`);
});
