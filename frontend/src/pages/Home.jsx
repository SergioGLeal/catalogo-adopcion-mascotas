import { useEffect, useState } from 'react';
import api from '../api/axios';
import '../App.css';
import MascotaCard from '../components/MascotaCard';

function Home() { // Cambiado de App a Home
  const [mascotas, setMascotas] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const getMascotas = async () => {
      try {
        const url = filtro ? `/mascotas?especie=${filtro}` : '/mascotas';
        const response = await api.get(url);
        setMascotas(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getMascotas();
  }, [filtro]);

  return (
    <> {/* Usamos un fragmento porque el Navbar ya está en App.jsx */}
      <header className="hero">
        <h1>Adopta un amigo para toda la vida</h1>
        <div className="filter-container">
          <button onClick={() => setFiltro('')} className={filtro === '' ? 'active' : ''}>Todos</button>
          <button onClick={() => setFiltro('Perro')} className={filtro === 'Perro' ? 'active' : ''}>Perros</button>
          <button onClick={() => setFiltro('Gato')} className={filtro === 'Gato' ? 'active' : ''}>Gatos</button>
          <button onClick={() => setFiltro('Ave')} className={filtro === 'Ave' ? 'active' : ''}>Aves</button>
        </div>
      </header>

      <main className="grid">
        {mascotas.map(pet => (
          <MascotaCard key={pet.id} mascota={pet} />
        ))}
      </main>
    </>
  );
}

export default Home;