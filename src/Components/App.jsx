import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard'); // Redirige al dashboard después del login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirige al login después del logout
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Login onLogin={handleLogin} />}
      />
      <Route
        path="/dashboard/*"
        element={<Dashboard onLogout={handleLogout} />}
      />
    </Routes>
  );
}

export default App;
