import User from "../models/user.model.js";

const roles = {
    administrador: "administrador",
    consumidor: "consumidor"};
const estados = {
    activo: "activo",
    inactivo: "inactivo"
}


export const firstUSer = async (req, res) => {
    const {user, password} = req.body
    try {
        const usuarios = await User.findAll();
        if(usuarios.length != 0){
            return res.status(400).json({
                message: "ya se creo el super usuario"
            })
        }
        const userResult = await User.create({
            usuario: user,
            password: password,
            estado: estado[0],
            rol: roles[0]
        })
        res.status(201).json({
            okey: true,
            message: "Se creo el primer usuario",
            userResult
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const createUser = async (req, res) => {
    const {usuario, password} = req.body;
    try {
        const user = await buscar({usuario: usuario}, User);
        if(user) return res.status(409).json({message: "ya existe"});
        
        const userResult = await User.create({
            usuario: usuario,
            password: password,
            estado: estados.inactivo,
            rol: roles.consumidor
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

        const camposPermitidos = ["password", "estado"];
        const datosActualizar = {};
        camposPermitidos.forEach(campo => {
        if (req.body[campo] !== undefined) {
            datosActualizar[campo] = req.body[campo];
        }
        });
        if(Object.hasOwn(datosActualizar, "estado")){
            datosActualizar.estado = datosActualizar.estado === true ? estado[0] : estado[1];
        }
        await user.update(datosActualizar);
        res.status(200).json({
            okey: true,
            message: "se actualizo el usuario"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}


//realizar el get Users solo si se logeo
export const getUsers = async (req, res) => {
    const {rol} = req.params;//la validacion se optendra de JWT
    //SOLO ES UNA PRUEBA PARA QUE NO SE PERMITA A CUALQUIER USUARIO OBTENER LOS DATOS
    const {id} = req.params;
    let usuarios = null;
    try {
        //validar si la peticion la realizo un administrador
        
        if(!permisos({id_user: id}, User)) return res.status(409).json({message: "no tienes los permisos necesarios"});
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
async function permisos(modelo, where) {
    const administrador = await buscar(where, modelo);
    return administrador;
}

async function buscar(where, modelo){
    const result = await modelo.findOne({where})
    return result
}