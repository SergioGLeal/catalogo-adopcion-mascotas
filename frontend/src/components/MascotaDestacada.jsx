const MascotaDestacada = ({ mascota }) => {
  // 1. Limpiamos el '/api' y nos aseguramos de usar el puerto correcto (3000)
  const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace('/api', '');
  
  // 2. Construimos la URL evitando errores de barras diagonales
  const fullImageUrl = mascota.imagen_url?.startsWith('http') 
    ? mascota.imagen_url 
    : `${BASE_URL}/${mascota.imagen_url}`.replace(/\/+/g, '/').replace('http:/', 'http://');

  return (
    <div className="mini-destacado-item">
      <div className="mini-avatar-wrapper">
        <img 
          src={fullImageUrl} 
          alt={mascota.nombre} 
          onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=No+Image'}
        />
        <div className="mini-badge">★</div>
      </div>
      <h4>{mascota.nombre}</h4>
    </div>
  );
};

export default MascotaDestacada;