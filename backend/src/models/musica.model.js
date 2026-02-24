import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Musica = sequelize.define("Musica", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artista: {
        type: DataTypes.STRING
    },
    albun: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    },
    duracion: {
        type: DataTypes.STRING
    }
});

export default Musica;
