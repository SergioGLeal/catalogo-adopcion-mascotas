const express = require('express');
const router = express.Router();
const { obtenerMascotas } = require('../controllers/mascotas.controller');

router.get('/', obtenerMascotas);

module.exports = router;
