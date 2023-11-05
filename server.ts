import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { connectDatabase } from "./database";
import { eventRouter, protectEventRouter } from "./routes/eventsRoute";
import userRoutes from "./routes/user";

connectDatabase();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" })); // JSON için limiti 1MB olarak ayarla
app.use(express.urlencoded({ limit: "1mb", extended: true })); // URL-encoded veri için limiti 1MB olarak ayarla
app.use("/api/publicEvent", eventRouter);
app.use("/api/user", userRoutes);
app.use("/api/event", protectEventRouter);

app.get("/", (req, res) => {
  res.send(`Server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
