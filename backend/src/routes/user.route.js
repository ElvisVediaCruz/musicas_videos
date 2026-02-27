import express from "express";
import { createUser, updateUser, firstUSer, getUsers } from "../controllers/user.controller.js";
import {verificarToken} from "../middlewares/tokenjwt.js";
import {soloAdmin} from "../middlewares/validations/user.validator.js"


const route = express.Router();


//estas api si funcionan

route.post("/firstUser", firstUSer);

route.post("/createUser", verificarToken, soloAdmin, createUser);
route.put("/updateUser", verificarToken, soloAdmin, updateUser);
route.get("/obtenerUsers", verificarToken, soloAdmin, getUsers);
route.get("/obtenerUsers/:id", verificarToken, soloAdmin, getUsers);

//apis

export default route;