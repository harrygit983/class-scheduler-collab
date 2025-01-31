import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// 📌 Get all courses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 📌 Get a specific course by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM courses WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Course not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 📌 Add a new course
router.post("/", async (req, res) => {
  const { name, department, credits } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO courses (name, department, credits) VALUES ($1, $2, $3) RETURNING *",
      [name, department, credits]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error adding course:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 📌 Delete a course by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM courses WHERE id = $1", [id]);
    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;