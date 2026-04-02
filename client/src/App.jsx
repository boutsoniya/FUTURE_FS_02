import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PublicForm from './pages/PublicForm';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicForm />} />
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={login} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard logout={logout} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
