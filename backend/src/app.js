import express from "express";
import cors from "cors";
import Contenido from "./routes/contenido.route.js";
import Login from "./routes/login.route.js";
import User from "./routes/user.route.js";


const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use(cors({
  origin: "http://localhost:5173", // frontend
  credentials: true
}));


app.use("/login", Login);
app.use("/User", User);
app.use("/contenido", Contenido);

export default app;