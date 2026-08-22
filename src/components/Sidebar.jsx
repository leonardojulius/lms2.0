import React from 'react';
import { LayoutDashboard, Database, Hexagon } from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Hexagon className="icon" size={28} />
        <span>Vortex.</span>
      </div>
      
      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentView('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>
        
        <button 
          className={`nav-item ${currentView === 'banks' ? 'active' : ''}`}
          onClick={() => setCurrentView('banks')}
        >
          <Database size={20} />
          <span>Question Banks</span>
        </button>
        

      </nav>
    </aside>
  );
}
