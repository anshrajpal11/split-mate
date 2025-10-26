import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import groupRoute from "./routes/group.route.js"
import {createServer} from "http";
import {Server} from "socket.io"


const app = express();
dotenv.config();

const port = process.env.PORT;

const FRONTEND_URL = process.env.FRONTEND_URL || "https://split-mate-five.vercel.app";

// List of allowed origins (production + local dev)
const allowedOrigins = [FRONTEND_URL, "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/group", groupRoute);

connectDb();

const httpServer = createServer(app);
const io = new Server(httpServer,{
   cors: {
    origin: [FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  },
})


io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});


app.set("io", io);


httpServer.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

