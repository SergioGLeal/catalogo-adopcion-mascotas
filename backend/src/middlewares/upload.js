const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Definir la ruta de la carpeta (backend/public/uploads)
const uploadDir = path.join(__dirname, '../../public/uploads');

// Crear la carpeta automáticamente si no existe al arrancar el servidor
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Nombre: mascota-timestamp.jpg para evitar duplicados
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'mascota-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Validar que sea imagen
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: El archivo debe ser una imagen válida"));
  }
});

module.exports = upload;