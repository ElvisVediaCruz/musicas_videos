import multer from "multer";
import path from "path";
import fs from "fs";

// Crear carpetas si no existen
const crearCarpeta = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/";

    if (file.mimetype.startsWith("audio/")) {
      folder = "uploads/audio/";
    } else if (file.mimetype.startsWith("video/")) {
      folder = "uploads/video/";
    }

    crearCarpeta(folder);
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombreUnico = Date.now() + ext;
    cb(null, nombreUnico);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("audio/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos de audio o video"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024 // 200MB máximo
  }
});

export default upload;