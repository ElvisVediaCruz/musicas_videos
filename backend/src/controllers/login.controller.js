import User from "../models/user.model.js";
import {generarToken} from "../middlewares/tokenjwt.js"

export const loginUser = async (req, res) =>{
    const {usuario, password} = req.body;
    try {
        const user = await User.findOne({
            where: {usuario}
        });
        if(!user) return res.status(404).json({message: "usuario no encontrado"});
        const comparePassword = await user.validarPassword(password);
        if(!comparePassword) return res.status(401).json({ message: "algun dato fue incorrecto"});
        console.log("usuario", user);
        const token = generarToken(user);
        console.log(token);
        res.status(201).json({
            message: "ususario logeado",
            okey: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            
            error: error.message
        })
    }
}