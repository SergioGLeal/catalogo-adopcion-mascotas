import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  // Efecto para sincronizar el estado del rol
  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    navigate('/login');
  };

  // FLUJO DE PROTECCIÓN: Si no hay usuario, lo mandamos directo al Login
  if (!userRole) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Cualquier otra ruta redirige a login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Si YA HAY usuario, mostramos la App completa
  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>🐾 Huellitas</Link>
        <div className="auth-buttons">
          {userRole === 'admin' && (
            <Link to="/admin">
              <button className="btn-admin" style={{ marginRight: '10px', backgroundColor: '#3498db' }}>
                ⚙️ Administrar Mascotas
              </button>
            </Link>
          )}
          <button className="btn-logout" onClick={handleLogout} style={{ backgroundColor: '#e74c3c' }}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        {/* Si intentan entrar a login estando logueados, los mandamos al home */}
        <Route path="/login" element={<Navigate to="/" />} />
      </Routes>

      <footer className="footer">
        <p>&copy; 2024 Huellitas Adopciones. Todos los derechos reservados.</p>
        <p>Contacto: info@huellitas.com | Tel: +52 846 115 38 51</p>
      </footer>
    </div>
  );
}

export default App;