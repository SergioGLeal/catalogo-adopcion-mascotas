const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- NUEVO: Para manejar rutas de carpetas
const authRoutes = require('./routes/auth.routes');
const mascotasRoutes = require('./routes/mascotas.routes');

const app = express();

// Middlewares Globales
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/mascotas', mascotasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de adopción funcionando 🚀' });
});

module.exports = app;