const MascotaCard = ({ mascota }) => {
  // Obtenemos la URL del backend desde el .env
  const BASE_URL = import.meta.env.VITE_API_URL;

  // Normalizar el estado para el CSS
  const estadoClase = mascota.estado.toLowerCase().replace(/\s+/g, '-');

  // Lógica para la imagen:
  // Si empieza con http, es una URL externa. 
  // Si no, le concatenamos la dirección de nuestro servidor.
  const fullImageUrl = mascota.imagen_url?.startsWith('http') 
    ? mascota.imagen_url 
    : `${BASE_URL}${mascota.imagen_url}`;

  return (
    <div className="card">
      <img 
        src={fullImageUrl} 
        alt={mascota.nombre} 
        onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}
      />
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