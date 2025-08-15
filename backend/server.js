import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import guideRoutes from "./routes/guideRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/guide", guideRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
