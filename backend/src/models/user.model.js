import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt, { compare } from "bcrypt";

//buscar validaciones en sequelize

const User = sequelize.define("User", {
    id_user: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    hooks: {
        beforeCreate: async (user) =>{
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },
});
User.prototype.validarPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export default User;