const MascotaCard = ({ mascota, onOpenModal }) => {
  // Obtenemos la URL base pero le quitamos el '/api' para las fotos
  const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');
  
  const estadoClase = mascota.estado.toLowerCase().replace(/\s+/g, '-');

  // Construimos la URL final asegurándonos de que haya una barra entre ellas
  const fullImageUrl = mascota.imagen_url?.startsWith('http') 
    ? mascota.imagen_url 
    : `${BASE_URL}/${mascota.imagen_url}`.replace(/\/+/g, '/').replace('http:/', 'http://');

  return (
    <div className="card">
      <div className="card-image-container">
        <img 
          src={fullImageUrl} 
          alt={mascota.nombre} 
          onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'}
        />
        <div className={`status-tag ${estadoClase}`}>
          {mascota.estado}
        </div>
      </div>

      <div className="card-divider"></div>

      <div className="card-info">
        <div className="card-header-info">
          <h3>{mascota.nombre}</h3>
          <span className="species-tag">{mascota.especie}</span>
        </div>
        
        <div className="pet-details-grid">
          <div className="detail-item">
            <span className="detail-label">Tamaño</span>
            <span className="detail-value">{mascota.tamano}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Edad</span>
            <span className="detail-value">{mascota.edad} años</span>
          </div>
        </div>

        <button className="btn-details-card" onClick={onOpenModal}>
        Conocer más
      </button>
      </div>
    </div>
  );
};

export default MascotaCard;