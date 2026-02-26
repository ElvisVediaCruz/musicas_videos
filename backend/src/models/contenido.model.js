import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Contenido = sequelize.define("Contenido", {
    id_contenido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {//m/v
        type: DataTypes.STRING
    },
    artista: {//m
        type: DataTypes.STRING
    },
    albun: {//m
        type: DataTypes.STRING
    },
    genero: {//m/v
        type: DataTypes.STRING
    },
    duracion: {//m/v
        type: DataTypes.STRING
    },
    director:{//v
        type: DataTypes.STRING
    },
    zice:{//m/v
        type: DataTypes.STRING
    },
    extencion:{//m/v
        type: DataTypes.STRING
    },
    rutaAlmacenamiento:{//m/v
        type: DataTypes.STRING
    },
    nombreAlmacenamiento: {//m/v
        type: DataTypes.STRING
    },
    tipo:{//m/v
        type: DataTypes.STRING
    }
});


export default Contenido;