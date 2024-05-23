// * Package Imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cron from "node-cron";
import axios from "axios";

dotenv.config();

// * Local imports
import authRoutes from "./src/routes/auth.route.js";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.middleware.js";

// * The express app
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.static("public"));

// * connecting to the DB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to DB successfully!!"))
  .catch((err) => console.error("DB connection failed", err));

// * All app routes
app.use("/auth", authRoutes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

// * Global error handler
app.use(globalErrorHandler);

// * Render.com server auto run after 14 minutes
cron.schedule("*/14 * * * *", () => {
  axios
    .get(process.env.BACKEND_BASE_URL)
    .then((response) => {
      console.log("Ping successful");
    })
    .catch((error) => {
      console.error("Error pinging server:", error.message);
    });
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
