import { useEffect, useState } from 'react'; // Importa useEffect
import '../desing/Modal.css';

const Modal = ({ mascota, onClose }) => {
  const [enviado, setEnviado] = useState(false);

  // Bloquear scroll del fondo
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!mascota) return null;

  const handleAdopcion = () => {
    setEnviado(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón de cerrar ahora fuera de modal-body para fijarlo mejor */}
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">&times;</button>
        
        <div className="modal-body">
          <div className="modal-image">
        <img 
            src={mascota.imagen_url?.startsWith('http') 
            ? mascota.imagen_url 
            : `${import.meta.env.VITE_API_URL.replace('/api', '')}/${mascota.imagen_url}`.replace(/\/+/g, '/').replace('http:/', 'http://')} 
            alt={mascota.nombre} 
            onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'}
        />
        </div>
          
          <div className="modal-info">
            {enviado ? (
              <div className="success-container">
                <div className="success-icon">🎉</div>
                <h3>¡Solicitud recibida!</h3>
                <p>
                  Hemos registrado tu interés por <strong>{mascota.nombre}</strong>. 
                  Nuestro equipo revisará tu perfil y te contactará pronto.
                </p>
                <button className="btn-premium" onClick={onClose}>
                  Volver al inicio
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header-info">
                  <span className="modal-tag">{mascota.especie}</span>
                  <h2>Conoce a {mascota.nombre}</h2>
                </div>

                <div className="modal-divider"></div>
                
                <p className="modal-description">
                  {mascota.descripcion || `Hola, soy ${mascota.nombre}. Soy un ${mascota.especie} muy amigable que busca un hogar lleno de amor. Estoy vacunado y listo para conocer a mi nueva familia.`}
                </p>

                <div className="modal-stats-grid">
                  <div className="modal-stat-card">
                    <span className="stat-label">Edad</span>
                    <span className="stat-value">{mascota.edad} años</span>
                  </div>
                  <div className="modal-stat-card">
                    <span className="stat-label">Tamaño</span>
                    <span className="stat-value">{mascota.tamano}</span>
                  </div>
                  <div className="modal-stat-card">
                    <span className="stat-label">Estado</span>
                    <span className={`stat-value status-highlight ${mascota.estado?.toLowerCase().replace(/\s+/g, '-')}`}>
                        {mascota.estado}
                    </span>
                  </div>
                </div>

                <button 
                  className={`btn-premium modal-btn-action ${mascota.estado?.toLowerCase() === 'adoptado' ? 'disabled-btn' : ''}`} 
                  onClick={handleAdopcion}
                  disabled={mascota.estado?.toLowerCase() === 'adoptado'}
                >
                  {mascota.estado?.toLowerCase() === 'adoptado' 
                    ? '¡Ya tiene un hogar feliz!' 
                    : 'Me interesa'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;