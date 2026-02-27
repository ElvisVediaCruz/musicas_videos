import Contenido from "../models/contenido.model.js";
import {getMediaMetadata} from "../services/media.service.js";

export const createContenido = async (req, res) => {
    const archivo = req.file;
    const {
        titulo,
        artista, 
        albun, 
        genero, 
        director } = req.body;
    const { userId } = req.params;
    try {
        if(!archivo){
            return res.status(400).json({ message: "No se envió archivo" });
        }
        const metadata = await getMediaMetadata(archivo.path);
        const formato = metadata.metadata.format;
        console.log("archivo", archivo)
        console.log(metadata.metadata)
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
            tipo: formato.format_name,
            id_user: userId
        }
        console.log(datos)
        await Contenido.create({
            ...datos
        });
        res.status(201).json({message: "se creo el contenido"});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
}
export const updateContenido = async (req, res) => {
    const {nombre, genero, idContenido} = req.body;
    try {
        await Contenido.update({
            nombre: nombre,
            genero: genero
        },{
            where: {
                idContenido: idContenido
            }
        });
        res.status(201).json({
            ok: true
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
export const deleteContenido = async (req, res) => {
    const {idContenido} = req.params;
    try {
        //eliminar del servidor
        await Contenido.destroy({
            where: { idContenido: idContenido}
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

