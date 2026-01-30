const db = require('../config/db');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { nombre_usuario, contrasena } = req.body;
    
    // 1. Buscar al usuario
    const [rows] = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
    
    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    const usuario = rows[0];

    // 2. Comparar contraseña con bcrypt
    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!esValida) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    // 3. Respuesta exitosa
    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre_usuario,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { login };