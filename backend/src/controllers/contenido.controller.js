import Contenido from "../models/contenido.model";

export const createContenido = async (req, res) => {
    //emcriptar el id del usuario solo en el backend no en la bd
    const { nombre, genero, ruta, tipo} = req.body;
    const {userId} = req.params;
    try {
        const contenido = await Contenido.create({
            nombre, genero, ruta, tipo, userId
        });
        res.status(201).json({message: "se creo el producto"});
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}