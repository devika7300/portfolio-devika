const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const portfolioRoutes = require("./routes/portfolioRoutes");

app.use(express.json());
app.use("/api/portfolio", portfolioRoutes);

const port = process.env.PORT || 5000;
const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    req.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
