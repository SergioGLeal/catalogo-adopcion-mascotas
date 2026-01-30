const db = require('../config/db');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  console.log("Intentando login para:", nombre_usuario);

  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
    
    if (rows.length === 0) {
      console.log("Usuario no encontrado en la DB");
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    const usuario = rows[0];
    console.log("Usuario encontrado:", usuario.nombre_usuario);
    console.log("Hash en DB:", usuario.contrasena);
    console.log("Longitud del hash en DB:", usuario.contrasena.length);

    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);
    console.log("¿Es válida según Bcrypt?:", esValida);

    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
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