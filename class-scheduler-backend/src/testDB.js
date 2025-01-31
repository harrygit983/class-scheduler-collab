import { pool } from "./db.js";

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to Neon! Server time:", res.rows[0].now);
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    pool.end();
  }
})();