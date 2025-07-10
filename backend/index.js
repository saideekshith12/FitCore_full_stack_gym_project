import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import db from "./db.js";
import router from "./route/User.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

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

app.use(cors(corsOptions)); // ✅ Correct

app.use("/api/users", router);

app.get('/', (req, res) => {
  res.send("Server is started");
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await db(); // WAIT for DB connection first
    app.listen(port, () => {
      console.log(`Server is started at port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB, server not started", error);
  }
}

startServer();
