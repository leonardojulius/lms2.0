import React, { useEffect, useState } from 'react';
import { getQuestionBanks } from '../utils/storage';
import { BookOpen, Database, Activity, Users } from 'lucide-react';

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalBanks: 0,
    totalQuestions: 0,
  });

  useEffect(() => {
    const banks = getQuestionBanks();
    const totalQ = banks.reduce((acc, bank) => acc + (bank.questions ? bank.questions.length : 0), 0);
    setStats({
      totalBanks: banks.length,
      totalQuestions: totalQ
    });
  }, []);

  return (
    <div className="dashboard-home">
      <div className="dashboard-grid">
        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="stat-title">Total Question Banks</span>
            <div style={{ padding: '8px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', color: 'var(--accent-primary)' }}>
              <Database size={20} />
            </div>
          </div>
          <span className="stat-value">{stats.totalBanks}</span>
        </div>
        
        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="stat-title">Total Questions</span>
            <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '8px', color: 'var(--accent-secondary)' }}>
              <BookOpen size={20} />
            </div>
          </div>
          <span className="stat-value">{stats.totalQuestions}</span>
        </div>
        
        <div className="glass-panel stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="stat-title">System Status</span>
            <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', color: '#10b981' }}>
              <Activity size={20} />
            </div>
          </div>
          <span className="stat-value" style={{ background: 'none', WebkitTextFillColor: 'initial', color: '#10b981', fontSize: '1.5rem', marginTop: 'auto' }}>All Systems Operational</span>
        </div>
      </div>
      
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Recent Activity</h3>
        {stats.totalBanks === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No activity yet. Go to Question Banks to add some data.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-glass)', borderRadius: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
              <span style={{ color: 'var(--text-secondary)' }}>System synchronized locally via localStorage.</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Just now</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
