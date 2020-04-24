const express = require('express');
const app = express();
const { emojis } = require('./data.js');

  
// Allow cross-origin requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/emojis", (req, res) => {
  return res.json(emojis);
});

app.get("/emoji/:id", (req, res) => {
  // To prevent the ID "0" we'll simply subtract by one. This way we can query for id = 2 which will serve us 1, etc.
  const id = req.params.id - 1;

  if (!emojis[id]) {
    return res.status(404).json({ error: "Emoji not found" });
  }

  return res.json(emojis[id]);
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});