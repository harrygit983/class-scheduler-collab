import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true, // Required for Neon SSL connections
    rejectUnauthorized: false, // Required for Neon SSL connections
  },// FORCES SSL CONNECTION
});

export { pool };

// Local Development
/*
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "class_scheduler",
  password: "Hjerfxqljdu100!",
  port: 5432,
});

export default pool;
*/