import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Save, Trash2, Mail, Layout } from 'lucide-react';

const LeadModal = ({ lead, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({ status: '', notes: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lead) setFormData({ status: lead.status || 'new', notes: lead.notes || '' });
  }, [lead]);

  if (!lead) return null;
  const { status, notes } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      const res = await axios.put(`http://localhost:5000/api/leads/${lead._id}`, formData, config);
      onUpdate(res.data);
    } catch (err) {
      alert('Error updating lead');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Delete this lead?')) {
      try {
        await axios.delete(`http://localhost:5000/api/leads/${lead._id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
        onDelete(lead._id);
      } catch (err) {
        alert('Error deleting lead');
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{ padding: '2rem' }}>
        <button className="modal-close" onClick={onClose}><X /></button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>Lead Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--surface)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Name</div>
            <div style={{ fontWeight: '500' }}>{lead.name}</div>
          </div>
          <div style={{ backgroundColor: 'var(--surface)', padding: '1rem', borderRadius: '8px', gridColumn: 'span 2' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email Contact</div>
            <div style={{ fontWeight: '500' }}>{lead.email}</div>
          </div>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select name="status" value={status} onChange={onChange} className="form-select">
              <option value="new">New Lead</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Follow-up Notes</label>
            <textarea name="notes" value={notes} onChange={onChange} className="form-textarea" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button type="button" className="btn btn-secondary" onClick={handleDelete} style={{ color: 'var(--danger)' }}><Trash2 size={16}/> Delete</button>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}><Save size={16}/> Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LeadModal;
