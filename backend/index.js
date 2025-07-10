import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import db from "./db.js";
import router from "./route/User.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
db();

const app = express();

// ✅ Load middlewares first
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ Setup CORS options
const allowedOrigins = ['https://fit-core-full-stack-gym-project.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// ✅ Use CORS (must come before routes)
app.use(cors(corsOptions));

// ✅ Explicitly handle preflight requests (only needed in some edge cases)
app.options('*', cors(corsOptions));  // Don't just pass cors() here!

// ✅ Routes
app.use("/api/users", router);

// ✅ Root route
app.get('/', (req, res) => {
  res.send("Server is started");
});

// ✅ Listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is started at port", port);
});
