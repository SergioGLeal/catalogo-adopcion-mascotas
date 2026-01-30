import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
  const [usuario, setUsuario] = useState({ nombre_usuario: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', usuario);
      // Guardamos el rol para saber qué mostrar después
      localStorage.setItem('userRole', data.usuario.rol);
      localStorage.setItem('userName', data.usuario.nombre);
      
      if (data.usuario.rol === 'admin') {
        navigate('/admin'); // Aquí irá el CRUD de mascotas
      } else {
        navigate('/'); // Usuario normal vuelve al catálogo
      }
    } catch (error) {
        console.error(error); 
        setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-msg">{error}</p>}
        <input name="nombre_usuario" placeholder="Usuario" onChange={handleChange} required />
        <input name="contrasena" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;