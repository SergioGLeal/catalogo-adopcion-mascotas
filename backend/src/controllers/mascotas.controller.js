const Mascota = require('../models/mascotas.model');

const obtenerMascotas = async (req, res) => {
  try {
    const { especie, estado } = req.query;
    const resultado = await Mascota.getAll(especie, estado);
    res.json(resultado);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

const crearMascota = async (req, res) => {
  try {
    // Los datos de texto vienen en req.body
    const datosMascota = { ...req.body };

    // Si Multer procesó una imagen, la ruta estará en req.file
    // Guardamos la ruta relativa que configuramos en app.js (/uploads/nombre.jpg)
    if (req.file) {
      datosMascota.imagen_url = `/uploads/${req.file.filename}`;
    }

    const id = await Mascota.create(datosMascota);
    res.json({ mensaje: 'Mascota creada exitosamente', id, imagen_url: datosMascota.imagen_url });
  } catch (error) {
    console.error("Error al crear:", error);
    res.status(500).json({ error: 'Fallo al insertar mascota' });
  }
};

const actualizarMascota = async (req, res) => {
  console.log("--- PETICIÓN DE ACTUALIZACIÓN RECIBIDA ---");
  console.log("ID:", req.params.id);
  console.log("BODY:", req.body);
  console.log("ARCHIVO:", req.file ? req.file.filename : "Sin archivo nuevo");

  try {
    const { id } = req.params;
    // Creamos un objeto limpio para el modelo
    const datosActualizar = {
      nombre: req.body.nombre,
      edad: req.body.edad,
      especie_id: req.body.especie_id,
      tamano: req.body.tamano,
      estado: req.body.estado
    };

    if (req.file) {
      datosActualizar.imagen_url = `/uploads/${req.file.filename}`;
    }

    const filasAfectadas = await Mascota.update(id, datosActualizar);
    
    console.log("Filas afectadas:", filasAfectadas);
    res.json({ mensaje: 'Actualizado' });
  } catch (error) {
    console.error("ERROR CRÍTICO EN ACTUALIZAR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const eliminarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await Mascota.delete(id);
    if (filasAfectadas === 0) return res.status(404).json({ mensaje: 'No encontrada' });
    res.json({ mensaje: 'Mascota eliminada correctamente' });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { obtenerMascotas, crearMascota, actualizarMascota, eliminarMascota };