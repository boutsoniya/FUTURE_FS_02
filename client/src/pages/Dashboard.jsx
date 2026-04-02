import { useState, useEffect } from 'react';
import axios from 'axios';
import { LogOut, Users, RefreshCw } from 'lucide-react';
import LeadCard from '../components/LeadCard';
import LeadModal from '../components/LeadModal';

const Dashboard = ({ logout }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/leads', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setLeads(res.data);
    } catch (err) {
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleUpdateLead = (updatedLead) => {
    setLeads(leads.map(lead => lead._id === updatedLead._id ? updatedLead : lead));
    setSelectedLead(null);
  };
  const handleDeleteLead = (id) => {
    setLeads(leads.filter(lead => lead._id !== id));
    setSelectedLead(null);
  };

  const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length
  };

  return (
    <div className="app-container" style={{ backgroundColor: 'transparent' }}>
      <aside className="glass-panel" style={{ width: '260px', margin: '1.5rem', display: 'flex', flexDirection: 'column', padding: '1.5rem', borderRadius: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users style={{ color: 'white' }} /></div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Mini CRM</h1>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {Object.keys(stats).map(key => (
            <button key={key} className={`btn ${filter === key ? 'btn-primary' : 'btn-secondary'}`} style={{ justifyContent: 'space-between', border: filter === key ? 'none' : '1px solid transparent' }} onClick={() => setFilter(key)}>
              <span style={{textTransform:'capitalize'}}>{key === 'all' ? 'All Leads' : key}</span>
              <span style={{ backgroundColor: filter === key ? 'rgba(255,255,255,0.2)' : 'var(--surface)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>{stats[key]}</span>
            </button>
          ))}
        </nav>
        <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'auto', borderColor: 'rgba(239, 68, 68, 0.3)', color: 'var(--danger)' }} onClick={logout}><LogOut size={18}/> Sign Out</button>
      </aside>
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div><h2 style={{ fontSize: '1.875rem', fontWeight: '700' }}>Dashboard</h2><p style={{ color: 'var(--text-muted)' }}>Manage leads</p></div>
          <button className="btn btn-secondary" onClick={fetchLeads} disabled={loading}><RefreshCw size={16}/> Refresh</button>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {[
            { label: 'Total Leads', value: stats.total, color: 'var(--primary)' },
            { label: 'New', value: stats.new, color: '#818cf8' },
            { label: 'Contacted', value: stats.contacted, color: '#fbbf24' },
            { label: 'Converted', value: stats.converted, color: '#34d399' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel" style={{ padding: '1.5rem', borderLeft: `4px solid ${stat.color}` }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>{stat.label}</div>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>{stat.value}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {loading ? <div>Loading...</div> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filteredLeads.map(lead => <LeadCard key={lead._id} lead={lead} onClick={setSelectedLead} />)}
            </div>
          )}
        </div>
      </main>
      {selectedLead && <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} onUpdate={handleUpdateLead} onDelete={handleDeleteLead} />}
    </div>
  );
};
export default Dashboard;
