
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    //validar el req.body
    try {
        await User.create(req.body);
        res.status(201).json({
            ok: true
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export const updateUser = async (req, res) => {
    const {usuario, password} = req.body;
    try {
        await User.update({
            usuario: usuario,
            password: password
        },{
            where: { usuario: usuario}
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
