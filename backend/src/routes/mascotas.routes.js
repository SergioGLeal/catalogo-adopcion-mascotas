const express = require('express');
const router = express.Router();
const { 
  obtenerMascotas, 
  crearMascota, 
  actualizarMascota, 
  eliminarMascota 
} = require('../controllers/mascotas.controller');

router.get('/', obtenerMascotas);
router.post('/', crearMascota);
router.put('/:id', actualizarMascota);
router.delete('/:id', eliminarMascota);

module.exports = router;