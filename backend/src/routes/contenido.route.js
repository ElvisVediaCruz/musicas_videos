import express from "express";
import {createContenido, updateContenido, deleteContenido} from "../controllers/contenido.controller.js";
import upload from "../config/multer.js";
import route from "./user.route.js";

const router = express.Router();

router.post("/upload", upload.single("archivo"), createContenido);
route.put("updateContenido", updateContenido);
route.delete("/deleteContenido", deleteContenido);

export default router;