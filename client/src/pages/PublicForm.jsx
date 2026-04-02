import { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle2 } from 'lucide-react';

const PublicForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', source: 'Website Contact Form', message: '' });
  const [status, setStatus] = useState('idle');
  const { name, email, message } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await axios.post('http://localhost:5000/api/leads', {
        name, email, source: formData.source, notes: message ? `Initial message: ${message}` : ''
      });
      setStatus('success');
      setFormData({ name: '', email: '', source: 'Website Contact Form', message: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '3rem', textAlign: 'center' }}>
        <CheckCircle2 style={{ width: '64px', height: '64px', color: 'var(--success)', margin: '0 auto 1.5rem auto' }} />
        <h2 style={{ fontSize: '1.875rem', fontWeight: '700', marginBottom: '1rem' }}>Thank You!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We've received your message.</p>
        <button className="btn btn-primary" onClick={() => setStatus('idle')}>Send Another</button>
      </div>
    </div>
  );

  return (
    <div className="app-container" style={{ alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>Contact Us</h1>
        </div>
        {status === 'error' && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>Error submitting.</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group"><label className="form-label">Name</label><input type="text" name="name" value={name} onChange={onChange} className="form-input" required /></div>
          <div className="form-group"><label className="form-label">Email</label><input type="email" name="email" value={email} onChange={onChange} className="form-input" required /></div>
          <div className="form-group"><label className="form-label">Message</label><textarea name="message" value={message} onChange={onChange} className="form-textarea" required /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending...' : <><Send style={{ width: '18px', height: '18px' }}/> Send</>}
          </button>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}><a href="/login" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin</a></div>
      </div>
    </div>
  );
};
export default PublicForm;
