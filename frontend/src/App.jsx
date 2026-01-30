import { Link, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Home from './pages/Home'; // Mueve tu lógica actual de App.jsx a este nuevo archivo
import Login from './pages/Login';

function App() {
  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>🐾 Huellitas</Link>
        <div className="auth-buttons">
          <Link to="/login">
            <button className="btn-login">Admin Login</button>
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <footer className="footer">
  <p>&copy; 2024 Huellitas Adopciones. Todos los derechos reservados.</p>
  <p>Contacto: info@huellitas.com | Tel: +52 846 115 38 51</p>
  </footer>
    </div>
  );
}

export default App;