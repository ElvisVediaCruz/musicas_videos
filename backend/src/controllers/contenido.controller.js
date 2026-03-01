import Contenido from "../models/contenido.model.js";
import {getMediaMetadata} from "../services/media.service.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const camposPermitidos = [
    "titulo",
    "artista",
    "albun",
    "genero",
    "director"
]

export const createContenido = asyncHandler (async (req, res) => {
    const archivo = req.file;
    const {
        titulo,
        artista, 
        albun, 
        genero, 
        director } = req.body;
    const { userId } = req.params;
    if(!archivo){
        throw new AppError("no se envio el archivo", 400);
    }
    const metadata = await getMediaMetadata(archivo.path);
    const formato = metadata.metadata.format;
    let tp = archivo.mimetype.startsWith("audio")? "audio" : "video";
    const datos = {
        artista: artista,
        titulo: titulo,
        albun: albun,
        genero: genero,
        duracion: formato.duration,
        director: director,
        zice: formato.size,
        extencion: formato.format_name,
        rutaAlmacenamiento: formato.filename,
        nombreAlmacenamiento: archivo.filename,
        tipo: tp,
        id_user: userId
    }
    await Contenido.create({
        ...datos
    });
    res.status(201).json({message: "se creo el contenido"});
})
export const updateContenido = asyncHandler (async (req, res) => {
    const {id_contenido} = req.params;
    const contenido = await Contenido.findByPk(id_contenido);
    if(!contenido){
        throw new AppError("contenido no encontrado", 404);
    }
    const datosActualizar = {};
    //convertir en una funcion para poder usar en otros controladores
    camposPermitidos.forEach(campo => {
        if (req.body[campo] !== undefined) {
            datosActualizar[campo] = req.body[campo];
        }
    });
    await contenido.update(datosActualizar);
    res.status(200).json({
        ok: true
    })
})
export const getContenido = asyncHandler (async (req, res) => {
    const {tipo, pg} = req.query;
    const pagina = parseInt(pg) || 1;
    const porPagina = 10;
    if(!tipo || (tipo !== "audio" && tipo !== "video")){
        throw new AppError("ocurrio un error en el tipo del contenido", 400)
    }
    const {count, rows} = await Contenido.findAndCountAll(
        {
            limit: porPagina,
            offset: (pagina - 1) * porPagina,
            where: {tipo: tipo}
        }
    );
    res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / porPagina),
        data: rows
    })
})

