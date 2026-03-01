import { body, validationResult } from "express-validator";
import { AppError } from "../../utils/AppError.js";
import jwt from "jsonwebtoken";

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

export const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    throw new AppError("Errores de validacion", 400, errores.array());
  }
  next();
}

export const soloAdmin = (req, res, next) => {
  if (req.usuario.rol !== "administrador") {
    throw new AppError("Solo admin", 403);
  }
  next();
};

export const verificarToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError("No autorizado", 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
      throw new AppError("Token inválido", 401);
    }
};