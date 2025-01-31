import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// 📌 Fix: Decode URL and make sure major names with spaces work
router.get("/:majorName/:degreeType", async (req, res) => {
  const majorName = decodeURIComponent(req.params.majorName);
  const degreeType = decodeURIComponent(req.params.degreeType);

  try {
    const result = await pool.query(
      `SELECT r.requirement_type, r.description 
       FROM requirements r
       JOIN majors m ON r.major_id = m.id
       WHERE m.name = $1 AND m.degree_type = $2`,
      [majorName, degreeType]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No requirements found for this major." });
    }

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching requirements:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;