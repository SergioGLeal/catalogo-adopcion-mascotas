import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Alertas profesionales
import api from '../api/axios';

const Login = () => {
  const [usuario, setUsuario] = useState({ nombre_usuario: '', contrasena: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Alerta de "Cargando"
    Swal.fire({
      title: 'Verificando credenciales...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      const { data } = await api.post('/auth/login', usuario);
      
      localStorage.setItem('userRole', data.usuario.rol);
      localStorage.setItem('userName', data.usuario.nombre_usuario);
      
      // Alerta de Éxito
      Swal.fire({
        icon: 'success',
        title: `¡Bienvenido, ${data.usuario.nombre_usuario}!`,
        text: 'Acceso concedido al sistema',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate('/');
        window.location.reload();
      });
      
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error de acceso',
          text: 'Usuario o contraseña incorrectos',
          confirmButtonColor: '#ff8c00'
        });
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">
          <div className="login-header">
            <span className="login-icon">🐾</span>
            <h1>Huellitas Login</h1>
            <p>Gestión de Adopciones y Mascotas</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form-premium">
            <div className="input-group">
              <label>Usuario</label>
              <input 
                name="nombre_usuario" 
                type="text"
                placeholder="Ingresa tu usuario" 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input 
                name="contrasena" 
                type="password" 
                placeholder="••••••••" 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="btn-premium">
              Entrar al Portal
            </button>
          </form>
          
          <div className="login-footer">
            <p>© 2026 Huellitas Cloud Systems</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;