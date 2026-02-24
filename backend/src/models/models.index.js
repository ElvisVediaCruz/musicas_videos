import Contenido from "./contenido.model.js";
import User from "./user.model.js"

// Relaciones

User.hasMany(Contenido, {
  foreignKey: "id_user",
  onDelete: "CASCADE"
});

Contenido.belongsTo(User, {
  foreignKey: "id_user"
});

export {
  Contenido,
  User
};