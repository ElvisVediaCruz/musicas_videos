import express from "express";
import { loginUser } from "../controllers/login.controller.js";
import { validateCreateUser } from "../middlewares/validations/user.validator.js"

const route = express.Router();

route.post("/", validateCreateUser,loginUser);

export default route;