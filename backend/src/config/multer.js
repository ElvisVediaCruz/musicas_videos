
// src/middlewares/multer.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let tipo = file.mimetype.startsWith("audio")? "audio" : "video";
    cb(null, "uploads/"+tipo);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now().toString() + ext);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("audio/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Tipo no permitido"), false);
  }
};

export const uploadMiddleware = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024
    }
});