const MascotaDestacada = ({ mascota }) => {
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const fullImageUrl = mascota.imagen_url?.startsWith('http') 
    ? mascota.imagen_url 
    : `${BASE_URL}${mascota.imagen_url}`;

  return (
    <div className="mini-destacado-item">
      <div className="mini-avatar-wrapper">
        <img src={fullImageUrl} alt={mascota.nombre} />
        <div className="mini-badge">★</div>
      </div>
      <h4>{mascota.nombre}</h4>
    </div>
  );
};

export default MascotaDestacada;