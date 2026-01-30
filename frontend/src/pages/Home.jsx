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
    <div className="home-fade-in"> {/* Clase para animación suave al entrar */}
      <header className="hero">
        <div className="hero-content">
          <h1>Adopta un amigo para toda la vida</h1>
          <p className="hero-subtitle">
            Encuentra a tu compañero ideal entre nuestros rescatados
          </p>
          
          <div className="filter-container">
            <button 
              onClick={() => setFiltro('')} 
              className={filtro === '' ? 'active' : ''}
            >
              ✨ Todos
            </button>
            <button 
              onClick={() => setFiltro('Perro')} 
              className={filtro === 'Perro' ? 'active' : ''}
            >
              🐶 Perros
            </button>
            <button 
              onClick={() => setFiltro('Gato')} 
              className={filtro === 'Gato' ? 'active' : ''}
            >
              🐱 Gatos
            </button>
            <button 
              onClick={() => setFiltro('Ave')} 
              className={filtro === 'Ave' ? 'active' : ''}
            >
              🦜 Aves
            </button>
          </div>
        </div>
      </header>

      <div className="content-wrapper"> {/* Nuevo contenedor para control de ancho */}
        <main className="grid">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Buscando nuevos amigos...</p>
            </div>
          ) : mascotas.length > 0 ? (
            mascotas.map(pet => (
              <MascotaCard key={pet.id} mascota={pet} />
            ))
          ) : (
            <div className="empty-state">
              <p>No hay mascotas disponibles en esta categoría por ahora.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;