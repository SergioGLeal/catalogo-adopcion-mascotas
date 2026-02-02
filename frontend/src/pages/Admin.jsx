import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../api/axios';
import '../desing/Admin.css';

const Admin = () => {
  const [mascotas, setMascotas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [editId, setEditId] = useState(null);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [preview, setPreview] = useState(null);
  
  const BASE_URL = import.meta.env.VITE_API_URL;

  const estadoInicial = {
    nombre: '', 
    especie_id: '1', 
    edad: '', 
    tamano: 'Mediano', 
    estado: 'Disponible',
    imagen_url: ''
  };

  const [form, setForm] = useState(estadoInicial);
  const navigate = useNavigate();

  const refrescarLista = async () => {
    try {
      const { data } = await api.get('/mascotas');
      
      // ORDENAR: De la más antigua a la más nueva (ID menor a mayor)
      const sortedMascotas = [...data].sort((a, b) => a.id - b.id);
      
      setMascotas(sortedMascotas);
    } catch (err) { 
      console.error("Error al refrescar la lista:", err); 
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'admin') { navigate('/'); return; }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refrescarLista();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivoSeleccionado(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  
  // Forzamos que los nombres coincidan exactamente con lo que el modelo espera
  formData.append('nombre', form.nombre);
  formData.append('edad', form.edad);
  formData.append('especie_id', form.especie_id);
  formData.append('tamano', form.tamano);
  formData.append('estado', form.estado);
  
  if (archivoSeleccionado) {
    formData.append('imagen', archivoSeleccionado);
  }

  try {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    if (modoEdicion) {
      // Verifica que editId sea el número correcto
      await api.put(`/mascotas/${editId}`, formData, config);
      Swal.fire('Actualizado', 'Mascota actualizada con éxito', 'success');
    } else {
      await api.post('/mascotas', formData, config);
      Swal.fire('Registrado', 'Mascota creada correctamente', 'success');
    }
    cancelarEdicion();
    refrescarLista();
  } catch (err) {
    console.error("Error en el envío:", err.response?.data || err.message);
    Swal.fire('Error', 'No se pudo procesar la solicitud', 'error');
  }
};

  const prepararEdicion = (m) => {
  setModoEdicion(true);
  setEditId(m.id);

  // LOG de control para que veas en la consola del navegador qué llega
  console.log("Mascota a editar:", m);

  setForm({
    nombre: m.nombre,
    // IMPORTANTE: m.especie_id debe venir de la consulta GET del backend
    // Si tu backend devuelve el nombre como 'especie', asegúrate de tener el ID
    especie_id: m.especie_id ? String(m.especie_id) : '1', 
    edad: m.edad,
    tamano: m.tamano || 'Mediano',
    estado: m.estado || 'Disponible',
    imagen_url: m.imagen_url
  });

  setPreview(m.imagen_url ? `${BASE_URL}${m.imagen_url}` : null);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

  const cancelarEdicion = () => {
    setForm(estadoInicial);
    setModoEdicion(false);
    setEditId(null);
    setArchivoSeleccionado(null);
    setPreview(null);
    if (document.getElementById('fileInput')) {
      document.getElementById('fileInput').value = "";
    }
  };

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4757',
      confirmButtonText: 'Sí, eliminar'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/mascotas/${id}`);
        refrescarLista();
        Swal.fire('Eliminado', 'La mascota ha sido borrada.', 'success');
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>{modoEdicion ? '📝 Editando Mascota' : '⚙️ Panel Administrativo'}</h1>
        <p>Gestiona el inventario de adopciones de Huellitas</p>
      </header>

      <section className="form-section">
  <h2>{modoEdicion ? 'Actualizar Datos' : 'Registrar Nueva Mascota'}</h2>
  <form onSubmit={handleSubmit} className="admin-form">
    
    {/* Grupo 1: Datos básicos */}
    <div className="form-grid">
      <div className="input-group">
        <label>Nombre de la mascota</label>
        <input name="nombre" placeholder="Ej: Max" value={form.nombre} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>Edad (en años)</label>
        <input name="edad" type="number" placeholder="Ej: 2" value={form.edad} onChange={handleChange} required />
      </div>

      <div className="input-group">
        <label>Especie</label>
        <select name="especie_id" value={form.especie_id} onChange={handleChange}>
          <option value="1">Perro</option>
          <option value="2">Gato</option>
          <option value="3">Ave</option>
        </select>
      </div>

      <div className="input-group">
        <label>Tamaño</label>
        <select name="tamano" value={form.tamano} onChange={handleChange}>
          <option value="Pequeño">Pequeño</option>
          <option value="Mediano">Mediano</option>
          <option value="Grande">Grande</option>
        </select>
      </div>

      <div className="input-group">
        <label>Estado de adopción</label>
        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="Disponible">Disponible</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Adoptado">Adoptado</option>
        </select>
      </div>

      <div className="input-group">
        <label>Fotografía</label>
        <input 
          id="fileInput"
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          required={!modoEdicion}
          className="file-input"
        />
      </div>
    </div>

    {/* Vista previa fuera de la grilla para que no rompa el diseño */}
    {preview && (
      <div className="preview-container">
        <img src={preview} alt="Vista previa" className="img-preview" />
        <p>Vista previa del archivo seleccionado</p>
      </div>
    )}

    <div className="form-actions">
      <button type="submit" className="btn-add">
        {modoEdicion ? '💾 Guardar Cambios' : '➕ Registrar Mascota'}
      </button>
      {modoEdicion && (
        <button type="button" className="btn-cancel" onClick={cancelarEdicion}>
          Cancelar
        </button>
      )}
    </div>
  </form>
      </section>

      <section className="table-section">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Edad</th>
              <th>Tamaño</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.map(m => (
              <tr key={m.id}>
                <td><strong>{m.nombre}</strong></td>
                <td>{m.especie || (m.especie_id == 1 ? 'Perro' : m.especie_id == 2 ? 'Gato' : 'Ave')}</td>
                <td>{m.edad} años</td>
                <td>{m.tamano}</td>
                <td>
                <span className={`badge-tabla status-${m.estado.toLowerCase().replace(/\s+/g, '-')}`}>
                    {m.estado}
                </span>
                </td>
                <td>
                  <button className="btn-admin" style={{ backgroundColor: '#f1c40f', marginRight: '5px' }} onClick={() => prepararEdicion(m)}>Editar</button>
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