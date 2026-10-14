const express = require("express");
const path = require("path");
const generateRoutes = require("./routes/generate.routes");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(generateRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

module.exports = app;
