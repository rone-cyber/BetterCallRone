const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const crypto = require("crypto");

const API_KEY = crypto
  .createHash("sha256")
  .update("secret_key_for_galaxycity")
  .digest("hex");

function apiKeyAuth(req, res, next) {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({ error: "API key missing" });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
}
app.get("/api/start", (req, res) => {
  res.send(Buffer.from(`TOKEN=${API_KEY}`).toString("base64"));
});
app.get("/api/thanks", apiKeyAuth, (req, res) => {
  res.json({
    message: "Thank you"
  });
});
app.get('/',(req,res)=>{
    res.send({message:"Better call Rone"})
});


app.listen(PORT, () =>
  console.log(`API running on port ${PORT}`)
);
