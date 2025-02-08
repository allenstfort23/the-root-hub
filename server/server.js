require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Connect to PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Create users table if none
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
  );`;

pool
  .query(createTableQuery)
  .then(() => console.log("Users table is ready"))
  .catch((err) => console.error("Error creating table", err));

// Welcome route
app.get("/api", (req, res) => {
  res.send("Welcome to The Root Hub");
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT id, username FROM users");
    res.json(users.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(403).json({ message: "Acces denied" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    console.log("Decoded user:", user); // Log the user object to check payload
    req.user = user;
    next();
  });
};

app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, username FROM users WHERE id = $1",
      [req.user.userId]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fecthing profile" });
  }
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

  try {
    // Check if user exists
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);
    res.json({ message: "Users registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login a user
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.rows[0].id, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
