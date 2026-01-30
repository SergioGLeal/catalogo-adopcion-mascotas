const MascotaCard = ({ mascota }) => {
  // Función para normalizar el estado y que coincida con el CSS (ej: "En Proceso" -> "en-proceso")
  const estadoClase = mascota.estado.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="card">
      <img src={mascota.imagen_url} alt={mascota.nombre} />
      <div className="card-info">
        <h3>{mascota.nombre}</h3>
        <p><strong>{mascota.especie}</strong></p>
        <p>Tamaño: {mascota.tamano}</p>
        <p>Edad: {mascota.edad} años</p>
        <span className={`badge ${estadoClase}`}>
          {mascota.estado}
        </span>
      </div>
    </div>
  );
};

export default MascotaCard;