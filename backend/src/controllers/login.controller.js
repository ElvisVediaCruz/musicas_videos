import User from "../models/user.model.js";
import {generarToken} from "../middlewares/tokenjwt.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const loginUser = asyncHandler (async (req, res) =>{
    const {usuario, password} = req.body;
        const user = await User.findOne({
            where: {usuario}
        });
        if(!user) throw new AppError("Datos incorrectos", 404);
        const comparePassword = await user.validarPassword(password);
        if(!comparePassword) throw new AppError("Datos incorrectos", 404);
        const token = generarToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 8640000
        })
        res.status(201).json({
            message: "ususario logeado",
            okey: true,
            token
        });
})