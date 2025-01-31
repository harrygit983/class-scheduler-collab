import express from "express";
import pool from "../db.js";

const router = express.Router();

// 📌 Get all courses
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM course");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// 📌 Get a single course by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM course WHERE id = $1", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

// 📌 Add a new course
router.post("/", async (req, res) => {
  const { code, name, credits, term, prerequisites } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO course (code, name, credits, term, prerequisites) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [code, name, credits, term, prerequisites || []]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to add course" });
  }
});

// 📌 Update a course
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { code, name, credits, term, prerequisites } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE course SET code = $1, name = $2, credits = $3, term = $4, prerequisites = $5 WHERE id = $6 RETURNING *",
      [code, name, credits, term, prerequisites || [], id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to update course" });
  }
});

// 📌 Delete a course
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query("DELETE FROM course WHERE id = $1", [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

export default router;
