import User from "../models/user.model";

export const loginUser = async (req, res) =>{
    const {usuario, password} = req.body;
    try {
        const user = await User.findOne({
            where: {usuario}
        });
        if(!user) return res.status(500).json({message: "usuario no encontrado"});
        const comparePassword = await User.comparePassword(password);
        if(!comparePassword) return res.status(500).json({ message: "algun dato fue incorrecto"});
        res.status(201).json({message: "ususario logeado"});
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}