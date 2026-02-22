import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";


const Contenido = sequelize.define("musica_video", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
    },
    ruta: {
        type:DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.hasMany(Contenido, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});
Contenido.belongsTo(User, {
    foreignKey: "userId"
});

export default Contenido;