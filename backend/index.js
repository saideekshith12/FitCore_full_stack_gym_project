import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet";
import db from "./db.js";
import router from "./route/User.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

db();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: 'https://fit-core-full-stack-gym-project.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet())

const port = process.env.PORT || 5000


app.use("/api/users", router);



app.get('/',(req,res)=>{
    res.send("Server is started")
})

app.listen(port,()=>{
    console.log("server is started at port 5000")
})