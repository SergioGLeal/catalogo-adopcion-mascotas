const Mascota = require('../models/mascotas.model');
const db = require('../config/db');

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
    // Extraemos especie_id del body
    const { nombre, edad, tamano, estado, imagen_url, especie_id } = req.body;
    
    // SQL con los nombres exactos de tu tabla
    const query = `
      INSERT INTO mascotas (nombre, edad, tamano, estado, imagen_url, especie_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    await db.query(query, [
  nombre, 
  Number(edad), 
  tamano, 
  estado, 
  imagen_url, 
  Number(especie_id) 
]);
    
    res.json({ mensaje: 'Mascota creada exitosamente' });
  } catch (error) {
    console.error("Error en el Backend:", error);
    res.status(500).json({ error: 'Fallo al insertar mascota' });
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