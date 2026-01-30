import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Admin = () => {
  const [mascotas, setMascotas] = useState([]);
  
  // CORRECCIÓN 1: El estado inicial debe tener 'especie_id'
  const [form, setForm] = useState({
    nombre: '', 
    especie_id: '1', // Valor inicial (1 = Perro)
    edad: '', 
    tamano: 'Mediano', 
    estado: 'Disponible', 
    imagen_url: ''
  });
  
  const navigate = useNavigate();

  const refrescarLista = async () => {
    try {
      const { data } = await api.get('/mascotas');
      setMascotas(data);
    } catch (err) {
      console.error("Error al refrescar:", err);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') {
      navigate('/');
      return;
    }

    const cargarInicial = async () => {
      try {
        const { data } = await api.get('/mascotas');
        setMascotas(data);
      } catch (err) {
        console.error("Error inicial:", err);
      }
    };

    cargarInicial();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // CORRECCIÓN 2: Aseguramos que los datos vayan correctos al Backend
      await api.post('/mascotas', form);
      alert('¡Mascota registrada!');
      
      // CORRECCIÓN 3: Limpiamos el formulario usando los nombres correctos
      setForm({ 
        nombre: '', 
        especie_id: '1', 
        edad: '', 
        tamano: 'Mediano', 
        estado: 'Disponible', 
        imagen_url: '' 
      });
      
      refrescarLista();
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("Hubo un error al guardar la mascota");
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Eliminar mascota?')) {
      try {
        await api.delete(`/mascotas/${id}`);
        setMascotas(prev => prev.filter(m => m.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="admin-container">
      <h1>Panel Administrativo</h1>
      <section className="form-section">
        <h2>Nueva Mascota</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input name="edad" type="number" placeholder="Edad" value={form.edad} onChange={handleChange} required />
          
          {/* El 'name' debe ser igual a la llave del objeto 'form' */}
          <select name="especie_id" value={form.especie_id} onChange={handleChange}>
            <option value="1">Perro</option>
            <option value="2">Gato</option>
            <option value="3">Ave</option>
          </select>

          <input name="imagen_url" placeholder="URL Imagen" value={form.imagen_url} onChange={handleChange} required />
          <button type="submit" className="btn-add">Guardar</button>
        </form>
      </section>

      <section className="table-section">
        <table>
          <thead>
            <tr><th>Nombre</th><th>ID Especie</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {mascotas.map(m => (
              <tr key={m.id}>
                <td>{m.nombre}</td>
                {/* Mostramos el ID de la especie por ahora */}
                <td>{m.especie_id}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleEliminar(m.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;