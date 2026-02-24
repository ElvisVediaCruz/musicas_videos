import Contenido from "../models/contenido.model.js";

export const createContenido = async (req, res) => {
    const {
        formato
    } = req.body;
    const {
        idUsuario
    } = req.params;
    //emcriptar el id del usuario solo en el backend no en la bd
    try {
        const result = await Contenido.create({
            formato: formato,
            idUsuario: idUsuario
        })
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

