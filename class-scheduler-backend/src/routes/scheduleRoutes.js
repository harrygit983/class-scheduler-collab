import express from "express";
import pool from "../db.js";

const router = express.Router();

// 📌 Get all schedules
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM schedule");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
});

// 📌 Get a user's schedule by userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM schedule WHERE userId = $1", [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch schedule" });
  }
});

// 📌 Create a new schedule
router.post("/", async (req, res) => {
  const { userId, plan } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO schedule (userId, plan) VALUES ($1, $2) RETURNING *",
      [userId, plan]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to create schedule" });
  }
});

// 📌 Update an existing schedule
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { plan } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE schedule SET plan = $1 WHERE userId = $2 RETURNING *",
      [plan, userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to update schedule" });
  }
});

// 📌 Delete a schedule
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const { rowCount } = await pool.query("DELETE FROM schedule WHERE userId = $1", [userId]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to delete schedule" });
  }
});

export default router;
