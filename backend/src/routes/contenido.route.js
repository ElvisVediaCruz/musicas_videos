import express from "express";
import {createContenido, updateContenido, deleteContenido} from "../controllers/contenido.controller.js";
import { crearMusica, crearPelicula } from "../controllers/musicVideo.controller.js";
import upload from "../config/multer.js";

const route = express.Router();

route.post("/upload/:userId", upload.single("archivo"), createContenido);
route.post("/uploadMusica", upload.single("archivo"), crearMusica);
route.post("/uploadVideo", upload.single("archivo"), crearPelicula);

route.put("updateContenido", updateContenido);
route.delete("/deleteContenido", deleteContenido);

export default route;