require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // ✅ Import bcrypt

const app = express();

app.use(cors());
app.use(bodyParser.json()); // ✅ Use bodyParser to parse JSON requests

const PORT = process.env.PORT || 5000;

const users = [];

// Welcome route
app.get("/api", (req, res) => {
  res.send("Welcome to The Root Hub");
});

// Fetch posts
app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, title: "First Post", content: "Hello Allen" },
    { id: 2, title: "Second Post", content: "Hello James" },
  ]);
});

// Register a new user
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the user with the hashed password
  users.push({ username, password: hashedPassword });

  res.json({ message: "User registered successfully" });
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
