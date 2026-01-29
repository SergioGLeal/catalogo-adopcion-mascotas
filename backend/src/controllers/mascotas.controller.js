const mascotas = require('../data/mascotas.data');

const obtenerMascotas = (req, res) => {
  const { especie, estado } = req.query;

  let resultado = mascotas;

  if (especie) {
    resultado = resultado.filter(m =>
      m.especie.toLowerCase() === especie.toLowerCase()
    );
  }

  if (estado) {
    resultado = resultado.filter(m =>
      m.estado.toLowerCase() === estado.toLowerCase()
    );
  }

  res.json(resultado);
};

module.exports = {
  obtenerMascotas
};
