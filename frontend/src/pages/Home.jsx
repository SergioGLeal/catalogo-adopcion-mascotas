import { useEffect, useState } from 'react';
import api from '../api/axios';
import '../App.css';
import MascotaCard from '../components/MascotaCard';
import Modal from '../components/Modal'; // Importamos el nuevo componente

/**
 * Componente interno para los destacados: 
 * Ahora con capacidad de abrir el modal al hacer clic
 */
const MascotaProfile = ({ mascota, onOpen }) => {
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const fullImageUrl = mascota.imagen_url?.startsWith('http') 
    ? mascota.imagen_url 
    : `${BASE_URL}${mascota.imagen_url}`;

  return (
    <div className="mini-profile-item" onClick={onOpen} style={{ cursor: 'pointer' }}>
      <div className="mini-photo-wrapper">
        <img src={fullImageUrl} alt={mascota.nombre} />
        <div className="mini-label">DESTACADO</div>
      </div>
      <h4>{mascota.nombre}</h4>
    </div>
  );
};

function Home() {
  const [mascotas, setMascotas] = useState([]);
  const [destacadas, setDestacadas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  
  // ESTADO PARA EL MODAL: Guarda la mascota seleccionada
  const [selectedPet, setSelectedPet] = useState(null);

  // ... dentro de function Home() ...

useEffect(() => {
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  // Seleccionamos todos los elementos con la clase .reveal
  const elements = document.querySelectorAll('.reveal');
  elements.forEach(el => observer.observe(el));

  return () => observer.disconnect();
}, [mascotas, loading]); // Se reinicia cuando las mascotas cargan

  useEffect(() => {
  const getMascotas = async () => {
    try {
      setLoading(true);
      const [allRes, destRes] = await Promise.all([
        api.get(filtro ? `/mascotas?especie=${filtro}` : '/mascotas'),
        api.get('/mascotas?destacada=true') 
      ]);

      // ORDENAR: De la más antigua a la más nueva (ID menor a mayor)
      const sortedAll = [...allRes.data].sort((a, b) => a.id - b.id);
      
      // Ordenar destacadas también de la más antigua a la más nueva
      const sortedDest = [...destRes.data].sort((a, b) => a.id - b.id);

      setMascotas(sortedAll);
      setDestacadas(sortedDest.slice(0, 4)); // Toma las 4 primeras (las 4 más antiguas registradas)
      
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };
  getMascotas();
}, [filtro]);

  return (
    <div className="home-container">
      
      {/* 1. SECCIÓN HERO */}
      <header className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-tag">🐾 Adopta con amor</span>
            <h1>Encuentra a tu compañero ideal</h1>
            <p>Miles de rescatados esperan un hogar. Conoce a quien podría ser tu nuevo mejor amigo.</p>

            <div className="filter-chips">
              <button onClick={() => setFiltro('')} className={filtro === '' ? 'chip active' : 'chip'}>
                ✨ Todos
              </button>
              <button onClick={() => setFiltro('Perro')} className={filtro === 'Perro' ? 'chip active' : 'chip'}>
                🐶 Perros
              </button>
              <button onClick={() => setFiltro('Gato')} className={filtro === 'Gato' ? 'chip active' : 'chip'}>
                🐱 Gatos
              </button>
              <button onClick={() => setFiltro('Ave')} className={filtro === 'Ave' ? 'chip active' : 'chip'}>
                🦜 Aves
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. GRILLA PRINCIPAL */}
      <main className="main-content">
        <div className="section-header">
          <h2>{filtro ? `${filtro}s` : 'Nuestros rescatados'}</h2>
          <div className="underline"></div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Buscando mascotas...</p>
          </div>
        ) : mascotas.length > 0 ? (
          <div className="grid">
  {mascotas.map((pet, index) => (
    <div key={pet.id} className={`reveal delay-${(index % 3) + 1}`}>
      <MascotaCard mascota={pet} onOpenModal={() => setSelectedPet(pet)} />
    </div>
  ))}
</div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔎</div>
            <h3>No encontramos resultados</h3>
            <p>Prueba con otra categoría o limpia los filtros.</p>
            <button onClick={() => setFiltro('')} className="btn-premium">Ver todas</button>
          </div>
        )}
      </main>

      {/* 3. SECCIÓN DESTACADOS */}
      {!loading && destacadas.length > 0 && (
        <section className="featured-mini-section">
          <div className="section-header">
            <h2>Mascotas Populares</h2>
            <div className="underline"></div>
            <p className="featured-subtitle">Ellos han recibido muchas visitas esta semana</p>
          </div>
          
          <div className="featured-horizontal-container">
            {destacadas.map(pet => (
              <MascotaProfile 
                key={pet.id} 
                mascota={pet} 
                onOpen={() => setSelectedPet(pet)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. SECCIÓN ESTADÍSTICAS */}
<section className="stats-section reveal">
  <div className="section-header white-text">
    <h2>Algunos de nuestros datos</h2>
    <div className="underline"></div>
    <p>Transparencia y compromiso en cada rescate</p>
  </div>

  <div className="stats-grid">
    <div className="stat-item">
      <div className="stat-circle">+500</div>
      <h3>Rescatados</h3>
      <p className="stat-description">
        En lo que llevamos operando hemos conseguido rescatar a cientos de animales en situación de riesgo.
      </p>
    </div>

    <div className="stat-item">
      <div className="stat-circle">320+</div>
      <h3>Familias</h3>
      <p className="stat-description">
        Personas con corazones enormes que han decidido dar una segunda oportunidad y un hogar lleno de amor.
      </p>
    </div>

    <div className="stat-item">
      <div className="stat-circle">98%</div>
      <h3>Éxito</h3>
      <p className="stat-description">
        De efectividad en nuestros procesos de adopción, asegurando que cada mascota llegue al hogar ideal.
      </p>
    </div>
  </div>
</section>

      {/* 5. EL MODAL (Solo se renderiza si hay una mascota seleccionada) */}
      {selectedPet && (
        <Modal 
          mascota={selectedPet} 
          onClose={() => setSelectedPet(null)} 
        />
      )}

    </div>
  );
}

export default Home;