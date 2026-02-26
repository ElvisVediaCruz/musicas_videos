import express from "express";
import { createUser, updateUser, firstUSer } from "../controllers/user.controller.js";
import {verificarToken} from "../middlewares/tokenjwt.js";
import {soloAdmin} from "../middlewares/validations/user.validator.js"


const route = express.Router();


route.post("/firstUser", firstUSer);

route.post("/createUser", verificarToken, soloAdmin, createUser);
route.put("/updateUser", updateUser);





export default route;