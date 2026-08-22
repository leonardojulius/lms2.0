import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function Header({ currentView }) {
  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Dashboard Overview';
      case 'banks': return 'Question Banks Manager';
      default: return 'Overview';
    }
  };

  return (
    <header className="header">
      <div className="header-title">
        {getTitle()}
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="glass-input" 
            style={{ paddingLeft: '2.5rem', width: '250px' }}
          />
        </div>
        
        <button className="glass-button" style={{ padding: '0.5rem', borderRadius: '50%' }}>
          <Bell size={20} />
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={18} />
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Admin</span>
        </div>
      </div>
    </header>
  );
}
