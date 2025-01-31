import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import requirementRoutes from "./routes/requirementRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 📌 Test Route to Confirm Server is Running
app.get("/", (req, res) => {
  res.send("🚀 API is running!");
});

// ✅ Register API routes
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/requirements", requirementRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));