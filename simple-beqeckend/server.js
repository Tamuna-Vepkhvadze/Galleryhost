import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

// split multiple origins from .env
const allowedOrigins = process.env.CLIENT_URLS.split(',');

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman ან direct request
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "CORS policy does not allow access from this origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/api/auth", authRoutes);

sequelize.sync()
  .then(() => {
    console.log("Database connected and synced");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("Database connection failed:", err));
