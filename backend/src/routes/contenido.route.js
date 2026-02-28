import express from "express";
import {createContenido, updateContenido, deleteContenido, getContenido} from "../controllers/contenido.controller.js";
import {verificarToken} from "../middlewares/tokenjwt.js";
import {soloAdmin} from "../middlewares/validations/user.validator.js"


import {uploadMiddleware} from "../config/multer.js";

const route = express.Router();

route.post("/upload/:userId", verificarToken, soloAdmin, uploadMiddleware.single("archivo"), createContenido);
route.put("updateContenido", updateContenido);
route.delete("/deleteContenido", deleteContenido);
route.get("/getContent/:tipo", verificarToken, soloAdmin, getContenido)

export default route;