import Contenido from "../models/contenido.model.js";
import { parseFile } from "music-metadata";


export const createContenido = async (req, res) => {
    //emcriptar el id del usuario solo en el backend no en la bd
    const { nombre, genero, ruta, tipo} = req.body;
    const {userId} = req.params;
    console.log(req.file)
     const metadata = await parseFile(req.file.path);
     console.log(metadata.common)
    //agregar metadatos a nuestra musica
    //recibira algunos datos como
    //redefinir los datos de mi bd, la tabla actual no cumple con lo deseado
    //se agregara otra tabla para musica y video
    /*
      titulo: metadata.common.title,
      artista: metadata.common.artist,
      album: metadata.common.album,
      genero: metadata.common.genre,
      duracion: metadata.format.duration,
      formato: metadata.format.container
    */
    try {
        /*const p = await Contenido.create({
            nombre, genero, ruta: "prueba de la ruta", tipo, userId
        });*/
        //console.log(p)
        res.status(201).json({message: "se creo el producto", metadata});
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