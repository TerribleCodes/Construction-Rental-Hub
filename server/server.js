const express = require("express");
const dotenv = require("dotenv");

const app = express(); // create express app
dotenv.config(); // read .env file

const PORT = process.env.PORT; // server port

app.get("/test", (req, res) => {
  res.json({ users: ["tony", "lisa", "michael"] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
