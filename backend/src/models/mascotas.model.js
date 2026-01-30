const db = require('../config/db');

const Mascota = {
  getAll: async (especieNombre, estado) => {
    let sql = `
      SELECT m.id, m.nombre, m.edad, m.tamano, m.estado, m.imagen_url, e.nombre AS especie 
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
    const [result] = await db.query(sql, [nombre, edad, tamano, estado, imagen_url, especie_id]);
    return result.insertId;
  },

  update: async (id, datos) => {
    const { nombre, edad, tamano, estado, imagen_url, especie_id } = datos;
    const sql = `UPDATE mascotas SET nombre=?, edad=?, tamano=?, estado=?, imagen_url=?, especie_id=? WHERE id=?`;
    const [result] = await db.query(sql, [nombre, edad, tamano, estado, imagen_url, especie_id, id]);
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM mascotas WHERE id = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Mascota;