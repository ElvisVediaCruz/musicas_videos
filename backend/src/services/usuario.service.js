const { where } = require("sequelize");

// services/usuario.service.js
function crearUsuarioService({ Usuario }) {
  return {

    async crear(datos) {
      return await Usuario.create(datos);
    },

    async obtenerTodos() {
      return await Usuario.findAll();
    },

    async obtenerUsuario(datos) {
        return await Usuario.findOne({
            where : {}
        })
    }

  };
}

module.exports = crearUsuarioService;