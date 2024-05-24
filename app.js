// * Package Imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cron from "node-cron";
import axios from "axios";

// * Configure Env
dotenv.config();

// * Local imports
import authRoutes from "./src/routes/auth.route.js";
// import userRoutes from "./src/routes/user.route.js";
import profileRoutes from "./src/routes/profile.route.js";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.middleware.js";

// * The express app
const app = express();

// * Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// * connecting to the DB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to DB successfully!!"))
  .catch((err) => console.error("DB connection failed", err));

// * All app routes
app.use("/auth", authRoutes);
// app.use("/user", userRoutes);
app.use("/profile", profileRoutes);

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
