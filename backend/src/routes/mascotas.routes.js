const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // <-- NUEVO: Importar middleware
const { 
  obtenerMascotas, 
  crearMascota, 
  actualizarMascota, 
  eliminarMascota 
} = require('../controllers/mascotas.controller');

router.get('/', obtenerMascotas);

router.post('/', upload.single('imagen'), crearMascota);

router.put('/:id', upload.single('imagen'), actualizarMascota);

router.delete('/:id', eliminarMascota);

module.exports = router;