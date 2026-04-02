import { useState } from 'react';
import { Mail, Clock, FileText, ChevronRight } from 'lucide-react';

const LeadCard = ({ lead, onClick }) => {
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getBadgeClass = (status) => {
    switch(status) {
      case 'new': return 'badge-new';
      case 'contacted': return 'badge-contacted';
      case 'converted': return 'badge-converted';
      default: return 'badge-new';
    }
  };

  return (
    <div 
      className="glass-panel" 
      onClick={() => onClick(lead)}
      style={{ 
        padding: '1.5rem', 
        cursor: 'pointer', 
        transition: 'all 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem' }}>{lead.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <Mail style={{ width: '14px', height: '14px' }} />
            <span>{lead.email}</span>
          </div>
        </div>
        <span className={`badge ${getBadgeClass(lead.status)}`}>
          {lead.status}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
        {lead.notes && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.875rem', backgroundColor: 'var(--surface)', padding: '0.75rem', borderRadius: '8px' }}>
            <FileText style={{ width: '14px', height: '14px', flexShrink: 0, marginTop: '2px', color: 'var(--text-muted)' }} />
            <span style={{ 
              display: '-webkit-box', 
              WebkitLineClamp: 2, 
              WebkitBoxOrient: 'vertical', 
              overflow: 'hidden',
              textOverflow: 'ellipsis' 
            }}>
              {lead.notes}
            </span>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            <Clock style={{ width: '12px', height: '12px' }} />
            <span>{formatDate(lead.createdAt)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '500' }}>
            View Details <ChevronRight style={{ width: '16px', height: '16px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
