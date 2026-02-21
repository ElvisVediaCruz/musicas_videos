import express from "express";
import cors from "cors";
import Contenido from "./routes/contenido.route.js";
import Login from "./routes/login.route.js";
import User from "./routes/user.route.js";


const app = express();

app.use("", Login);
app.use("/User", User);
app.use("/contenido", Contenido);

export default app;