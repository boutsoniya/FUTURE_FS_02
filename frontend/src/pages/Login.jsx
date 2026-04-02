import { useState } from 'react';
import axios from 'axios';
import { Lock, User } from 'lucide-react';

const Login = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      setAuth(res.data.token);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Admin Portal</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to manage your leads</p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)', width: '18px', height: '18px' }} />
              <input
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Enter admin username"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)', width: '18px', height: '18px' }} />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
