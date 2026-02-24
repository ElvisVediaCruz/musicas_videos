
import { use } from "react";
import User from "../models/user.model.js";

export const createUser = async (req, res) => {
    const {usuario, password, rol} = req.body;
    const roles = ["administrador", "consumidor"]
    try {
        if (roles.includes(rol)){
            return res.status(400).json({
                message: "Rol inválido"
            });
        }
        const user = await buscar({usuario: usuario}, User);
        if(user) return res.status(409).json({message: "ya existe"});
        if(rol === roles[0]){
        const userRol = await buscar({rol: rol}, User);
        if(userRol) return res.status(409).json({message: "solo puede existir un administrador"});
        }
        const userResult = await User.create({
            usuario: usuario,
            password: password,
            estado: "inactivo",
            rol: rol
        })
        if(!userResult) return res.status(500).json({ message: "ocurrio un error al crear el usuario"});
        res.status(201).json({
            okey: true,
            message: "Se creo el usuario"
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export const updateUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(409).json({message: "usuario no encontrado"});
        const camposPermitidos = ["usuario", "password", "estado"];
        const datosActualizar = {};
        camposPermitidos.forEach(campo => {
        if (req.body[campo] !== undefined) {
            datosActualizar[campo] = req.body[campo];
        }
        });
        await user.update(data);
        res.status(201).json({
            okey: true,
            message: "se actualizo el usuario"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
export const getUsers = async (req, res) => {
    const {rol} = req.params;//la validacion se optendra de JWT
    //SOLO ES UNA PRUEBA PARA QUE NO SE PERMITA A CUALQUIER USUARIO OBTENER LOS DATOS
    const {id} = req.params;
    let usuarios = null;
    try {
        //validar si la peticion la realizo un administrador
        const administrador = await buscar({rol: rol}, User);
        if(!administrador) return res.status(409).json({message: "no tienes los permisos necesarios"});
        if (!id) {
            usuarios = await User.findAll({
                attributes: { exclude: ["password"] }
        });
        } else {
            usuarios = await User.findOne({
                where: { id_user: id },
                attributes: { exclude: ["password"] }
            });

            if (!usuarios) {
                return res.status(404).json({
                message: "Usuario no encontrado"
                });
            }
        }
        return res.status(200).json({
        ok: true,
        usuarios
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}


async function permisos(){
    //funcio para validar si el usuario tiene los suficientes permisos para
    //realizar algun cambio
}

async function buscar(where, modelo){
    const result = await modelo.findOne({where})
    return result
}