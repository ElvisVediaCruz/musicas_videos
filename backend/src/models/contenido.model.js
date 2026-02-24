import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Contenido = sequelize.define("Contenido", {
    id_contenido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    formato: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


export default Contenido;