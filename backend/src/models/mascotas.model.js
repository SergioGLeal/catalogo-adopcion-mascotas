const db = require('../config/db');

const Mascota = {
  getAll: async (especieNombre, estado) => {
  let sql = `
    SELECT m.*, e.nombre AS especie 
    FROM mascotas m
    JOIN especies e ON m.especie_id = e.id
    WHERE 1=1
  `;
    const params = [];
    if (especieNombre) { sql += ' AND e.nombre = ?'; params.push(especieNombre); }
    if (estado) { sql += ' AND m.estado = ?'; params.push(estado); }

    const [rows] = await db.query(sql, params);
    return rows;
  },

  create: async (datos) => {
    const { nombre, edad, tamano, estado, imagen_url, especie_id } = datos;
    const sql = `INSERT INTO mascotas (nombre, edad, tamano, estado, imagen_url, especie_id) VALUES (?, ?, ?, ?, ?, ?)`;
    // Aseguramos que los números sean tratados como tales
    const [result] = await db.query(sql, [nombre, Number(edad), tamano, estado, imagen_url, Number(especie_id)]);
    return result.insertId;
  },

  // mascotas.model.js

update: async (id, datos) => {
  const fields = [];
  const params = [];
  const camposPermitidos = ['nombre', 'edad', 'tamano', 'estado', 'imagen_url', 'especie_id'];

  camposPermitidos.forEach(key => {
    // Solo agregamos el campo si existe en 'datos' y no es undefined/null
    if (datos[key] !== undefined && datos[key] !== null && datos[key] !== 'undefined') {
      
      if (key === 'edad' || key === 'especie_id') {
        const num = Number(datos[key]);
        // Si el resultado es un número válido, lo agregamos
        if (!isNaN(num)) {
          fields.push(`${key} = ?`);
          params.push(num);
        }
      } else {
        fields.push(`${key} = ?`);
        params.push(datos[key]);
      }
    }
  });

  if (fields.length === 0) return 0;

  const sql = `UPDATE mascotas SET ${fields.join(', ')} WHERE id = ?`;
  params.push(id);

  try {
    const [result] = await db.query(sql, params);
    return result.affectedRows;
  } catch (error) {
    console.error("Error en SQL Update:", error);
    throw error;
  }
},

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM mascotas WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Mascota;