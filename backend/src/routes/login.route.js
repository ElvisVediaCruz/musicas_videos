import express from "express";
import { loginUser } from "../controllers/login.controller.js";

const route = express.Router();

route.post("/", loginUser);

export default route;