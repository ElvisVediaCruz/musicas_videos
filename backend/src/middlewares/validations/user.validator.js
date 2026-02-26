import { body } from "express-validator";

export const validateCreateUser = [
  body("usuario")
    .notEmpty().withMessage("El usuario es obligatorio")
    .isLength({ min: 3 }).withMessage("Mínimo 3 caracteres"),

  body("password")
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("Mínimo 6 caracteres"),

  body("rol")
    .isIn(["administrador", "consumidor"])
    .withMessage("Rol inválido")
];

export const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== "administrador") {
    return res.status(403).json({ message: "Solo admin" });
  }
  next();
};