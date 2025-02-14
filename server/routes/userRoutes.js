const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken");
const pool = require("../utils/db");
const router = express.Router();

// Get user profile (authenticated)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, username FROM users WHERE id = $1",
      [req.user.userId] // Use userId from the token
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

// Get specific user profile by ID (public)
router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

module.exports = router;
