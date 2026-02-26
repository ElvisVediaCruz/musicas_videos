import jwt from "jsonwebtoken";

export const generarToken = (usuario) => {
  const token = jwt.sign(
  { id: usuario.id_user, rol: usuario.rol },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
return token;
};
export const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({ message: "No autorizado" });
    }
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("el decode", decoded);
    req.usuario = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Token inválido" });
  }
}