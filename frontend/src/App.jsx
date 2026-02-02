import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Vista para usuarios no logueados
  if (!userRole) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          🐾 Huellitas
        </Link>
        
        {/* Botón Hamburguesa - Z-index alto para estar sobre todo */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>

        {/* Overlay: Se coloca fuera del contenedor de botones para que no interfiera */}
        {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}

        {/* Contenedor de botones (Menú Lateral en móvil) */}
        <div className={`auth-buttons ${isMenuOpen ? 'open' : ''}`}>
          {userRole === 'admin' && (
            <Link 
              to="/admin" 
              onClick={() => setIsMenuOpen(false)} 
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <button className="btn-admin">
                <i className="fas fa-cog"></i> Administrar Mascotas
              </button>
            </Link>
          )}
          
          <button className="btn-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido Principal */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Navigate to="/" />} />
      </Routes>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🐾 Huellitas</h3>
            <p>Transformando vidas, una huellita a la vez.</p>
          </div>
          
          <div className="footer-section">
            <h4>Contacto</h4>
            <p><i className="fas fa-envelope"></i> info@huellitas.com</p>
            <p><i className="fas fa-phone"></i> +52 846 115 38 51</p>
          </div>

          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://wa.me/528461153851" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Huellitas Adopciones. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;