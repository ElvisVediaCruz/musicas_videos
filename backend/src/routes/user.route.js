import express from "express";
import { createUser, updateUser } from "../controllers/user.controller.js";

const route = express.Router();

route.post("/createUser", createUser);
route.put("/updateUser", updateUser);

export default route;