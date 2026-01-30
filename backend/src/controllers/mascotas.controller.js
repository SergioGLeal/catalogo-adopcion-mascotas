const Mascota = require('../models/mascotas.model');

const obtenerMascotas = async (req, res) => {
  try {
    const { especie, estado } = req.query;
    const resultado = await Mascota.getAll(especie, estado);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearMascota = async (req, res) => {
  try {
    const id = await Mascota.create(req.body);
    res.status(201).json({ mensaje: 'Mascota creada', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await Mascota.update(id, req.body);
    if (filasAfectadas === 0) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    res.json({ mensaje: 'Mascota actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await Mascota.delete(id);
    if (filasAfectadas === 0) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
    res.json({ mensaje: 'Mascota eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { obtenerMascotas, crearMascota, actualizarMascota, eliminarMascota };