import Musica from "../models/musica.model.js";
import Video from "../models/video.model.js";
import Contenido from "../models/contenido.model.js";
import { parseFile } from "music-metadata";


//ver como refactorizar la funcion de crear
//musica y peliucula son codigos similares
export const crearMusica = async (req, res) =>{
    const {
        titulo, 
        artista,
        albun,
        genero,
        duracion//ver como obtener la duracion automatica solo se aran pruebas por el momento
    } = req.body;
    try {
        const format = tipo_contenido(req.file);
        if (!format){
            return res.status(500).json({
                message: "foramto no coincide"
            })
        }
        const idFormat = await buscarID(format);
        if (!idFormat){
            return res.status(500).json({
                message: "formato no registrado en la bd"
            })
        }
        const result = await Musica.create({
            titulo, 
            artista,
            albun,
            genero,
            duracion,
            contenidoId: idFormat.id_contenido
        });
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "error interno",
            error: error.message
        });
    }
}
export const crearPelicula = async (req, res) =>{
    const {
        titulo, 
        director,
        genero,
        anio,
        duracion
    } = req.body;
    try {
        const format = tipo_contenido(req.file);
        if (!format){
            return res.status(500).json({
                message: "foramto no coincide"
            })
        }
        const idFormat = await buscarID(format);
        if (!idFormat){
            return res.status(500).json({
                message: "formato no registrado en la bd"
            })
        }
        const result = await Video.create({
            titulo, 
            director,
            genero,
            anio,
            duracion,
            contenidoId: idFormat.id_contenido
        });
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({
            message: "error interno",
            error: error.message
        });
    }
}
// fin del codigo

//funcion para extraer formato
async function buscarID(format){
    const idFormat = await Contenido.findOne({
        attributes: ["id_contenido"],
        where: { formato: format },
        raw: true
    });
    return idFormat;
}
function tipo_contenido(tipo){
    if (tipo.destination === "uploads/audio/") return "mp3";
    if(tipo.destination === "uploads/video/") return "mp4"
    return null;
}
