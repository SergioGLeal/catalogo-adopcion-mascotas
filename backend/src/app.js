const express = require('express');
const cors = require('cors');

const mascotasRoutes = require('./routes/mascotas.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de adopción funcionando 🚀' });
});

app.use('/api/mascotas', mascotasRoutes);

module.exports = app;
