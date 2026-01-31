import { useEffect, useState } from 'react';
import api from '../api/axios';
import '../App.css';
import MascotaCard from '../components/MascotaCard';

function Home() {
  const [mascotas, setMascotas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMascotas = async () => {
      try {
        setLoading(true);
        const url = filtro ? `/mascotas?especie=${filtro}` : '/mascotas';
        const response = await api.get(url);
        setMascotas(response.data);
      } catch (error) {
        console.error("Error al obtener mascotas:", error);
      } finally {
        setLoading(false);
      }
    };
    getMascotas();
  }, [filtro]);

  return (
    <div className="home-container">
      {/* SECCIÓN HERO CON IMAGEN DE FONDO */}
      <header className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-tag">🐾 Encuentra a tu mejor amigo</span>
            <h1>Adopta un amigo para toda la vida</h1>
            <p>
              Cientos de rescatados esperan un hogar lleno de amor. 
              Filtra por especie y conoce a tu próximo compañero.
            </p>

            {/* FILTROS TIPO CHIPS */}
            <div className="filter-chips">
              <button 
                onClick={() => setFiltro('')} 
                className={filtro === '' ? 'chip active' : 'chip'}
              >
                ✨ Todos
              </button>
              <button 
                onClick={() => setFiltro('Perro')} 
                className={filtro === 'Perro' ? 'chip active' : 'chip'}
              >
                🐶 Perros
              </button>
              <button 
                onClick={() => setFiltro('Gato')} 
                className={filtro === 'Gato' ? 'chip active' : 'chip'}
              >
                🐱 Gatos
              </button>
              <button 
                onClick={() => setFiltro('Ave')} 
                className={filtro === 'Ave' ? 'chip active' : 'chip'}
              >
                🦜 Aves
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SECCIÓN DE GRILLA */}
      <main className="main-content">
        <div className="section-header">
          <h2>{filtro ? `Resultados para: ${filtro}s` : 'Nuestras mascotas disponibles'}</h2>
          <div className="underline"></div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Buscando nuevos amigos...</p>
          </div>
        ) : mascotas.length > 0 ? (
          <div className="grid">
            {mascotas.map(pet => (
              <MascotaCard key={pet.id} mascota={pet} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔎</div>
            <h3>No encontramos resultados</h3>
            <p>Intenta con otra categoría o vuelve más tarde.</p>
            <button onClick={() => setFiltro('')} className="btn-add">Ver todos</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;