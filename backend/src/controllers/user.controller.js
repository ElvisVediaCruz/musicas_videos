import User from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const roles = {
    administrador: "administrador",
    consumidor: "consumidor"};
const estados = {
    activo: "activo",
    inactivo: "inactivo"
}


export const firstUSer = asyncHandler( async (req, res) => {
    const {user, password} = req.body
    const usuarios = await User.findAll();
    if(usuarios.length != 0) throw new AppError("ruta no encontrada", 400);
    const userResult = await User.create({
        usuario: user,
        password: password,
        estado: estados.activo,
        rol: roles.administrador
    })
    res.status(201).json({
        okey: true,
        message: "Se creo el primer usuario",
        userResult
    })
})

export const createUser =asyncHandler( async (req, res) => {
    const {usuario, password} = req.body;
        const user = await buscar({usuario: usuario}, User);
        if(user) throw new AppError("el usuario ya existe", 400)
        
        const userResult = await User.create({
            usuario: usuario,
            password: password,
            estado: estados.inactivo,
            rol: roles.consumidor
        });
        res.status(201).json({
            okey: true,
            message: "Se creo el usuario"
        })
})
export const updateUser = asyncHandler( async (req, res) => {
    const {id} = req.body;
    const user = await User.findByPk(id);
    if (!user) throw new AppError("usuario no encontrado", 409);
    const camposPermitidos = ["password", "estado"];
    const datosActualizar = {};
    camposPermitidos.forEach(campo => {
        if (req.body[campo] !== undefined) {
            datosActualizar[campo] = req.body[campo];
        }
    });
    if(Object.hasOwn(datosActualizar, "estado")){
        datosActualizar.estado = datosActualizar.estado === true ? estados.activo : estados.inactivo;
    }
    await user.update(datosActualizar);
    res.status(200).json({
        okey: true,
        message: "se actualizo el usuario"
    });
})
//realizar el get Users solo si se logeo
export const getUsers = asyncHandler( async (req, res) => {
    const {id} = req.params;
    let usuarios = null;
    if (!id) {
        usuarios = await User.findAll({
            attributes: { exclude: ["password"] }
    });
    } else {
        usuarios = await User.findOne({
            where: { id_user: id },
            attributes: { exclude: ["password"] }
        });
        if (!usuarios) throw new AppError("Usuario no encontrado", 404);
    }
    return res.status(200).json({
        ok: true,
        usuarios
    });
})

async function buscar(where, modelo){
    const result = await modelo.findOne({where})
    return result
}