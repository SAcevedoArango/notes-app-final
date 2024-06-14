import express from "express";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js"; // Import routes

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/notes", noteRoutes);

app.listen(5000, () => {
  console.log("Server running on localhost:5000");
});
