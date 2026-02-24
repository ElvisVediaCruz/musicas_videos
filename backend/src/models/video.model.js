import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Video = sequelize.define("Video", {
    idVideo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING
    },
    director: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    },
    anio: {
        type: DataTypes.STRING
    },
    duracion: {
        type: DataTypes.STRING
    },
    ruta: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Video;