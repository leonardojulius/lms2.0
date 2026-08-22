import React from 'react';

export default function VerbalAbility({ selectedWord }) {
  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      {selectedWord ? (
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {selectedWord.name.split(' - ')[0]}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            {selectedWord.name.split(' - ')[1] || 'No definition available.'}
          </p>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2 style={{ color: 'var(--text-muted)' }}>Select a word from the sidebar</h2>
        </div>
      )}
    </div>
  );
}
