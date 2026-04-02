import { Mail, Clock, FileText, ChevronRight } from 'lucide-react';

const LeadCard = ({ lead, onClick }) => {
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
  const getBadgeClass = (status) => {
    switch(status) {
      case 'new': return 'badge-new';
      case 'contacted': return 'badge-contacted';
      case 'converted': return 'badge-converted';
      default: return 'badge-new';
    }
  };

  return (
    <div className="glass-panel" onClick={() => onClick(lead)} style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{lead.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}><Mail style={{ width: '14px', height: '14px' }} /> <span>{lead.email}</span></div>
        </div>
        <span className={`badge ${getBadgeClass(lead.status)}`}>{lead.status}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
        {lead.notes && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', backgroundColor: 'var(--surface)', padding: '0.75rem', borderRadius: '8px' }}>
            <FileText style={{ width: '14px', height: '14px', flexShrink: 0, color: 'var(--text-muted)' }} />
            <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{lead.notes}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}><Clock style={{ width: '12px', height: '12px' }} /> <span>{formatDate(lead.createdAt)}</span></div>
        </div>
      </div>
    </div>
  );
};
export default LeadCard;
