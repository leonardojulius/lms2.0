import React, { useState, useEffect, useRef } from 'react';
import { getQuestionBanks, addQuestionBank, deleteQuestionBank } from '../utils/storage';
import { Plus, UploadCloud, FileJson, Trash2, Database, AlertCircle } from 'lucide-react';

export default function QuestionBanks() {
  const [banks, setBanks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    setBanks(getQuestionBanks());
  }, []);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      
      // Basic validation
      if (!parsed.title || !Array.isArray(parsed.questions)) {
        throw new Error('Invalid format: JSON must have a "title" string and "questions" array.');
      }
      
      const newBank = addQuestionBank(parsed);
      setBanks(prev => [...prev, newBank]);
      setIsModalOpen(false);
      setJsonInput('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this question bank?')) {
      const updated = deleteQuestionBank(id);
      setBanks(updated);
    }
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonInput(event.target.result);
      setError(null);
    };
    reader.onerror = () => setError("Error reading file");
    reader.readAsText(file);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setJsonInput(event.target.result);
        setError(null);
      };
      reader.readAsText(file);
    } else {
      setError("Please drop a valid JSON file.");
    }
  };

  return (
    <div className="question-banks-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Your Banks</h2>
        <button className="glass-button primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          New Question Bank
        </button>
      </div>

      {banks.length === 0 ? (
        <div className="glass-panel empty-state">
          <div className="empty-state-icon">
            <Database size={32} />
          </div>
          <h3>No Question Banks Found</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Get started by uploading your first set of questions. You can import them directly from a JSON file.
          </p>
          <button className="glass-button primary" style={{ marginTop: '1rem' }} onClick={() => setIsModalOpen(true)}>
            Import from JSON
          </button>
        </div>
      ) : (
        <div className="banks-grid">
          {banks.map(bank => (
            <div key={bank.id} className="glass-panel bank-card">
              <div className="bank-header">
                <h3 className="bank-title">{bank.title}</h3>
                <button 
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'background 0.2s' }}
                  onClick={() => handleDelete(bank.id)}
                  title="Delete Bank"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileJson size={16} />
                {bank.questions?.length || 0} Questions inside
              </p>
              
              <div className="bank-meta">
                Added: {new Date(bank.createdAt).toLocaleDateString()}
              </div>
              
              <div className="bank-footer">
                <button className="glass-button" style={{ flex: 1, justifyContent: 'center' }}>
                  View Questions
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="glass-panel modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Import Question Bank</h3>
              <button 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.5rem' }}
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileUpload}
            />
            
            <div 
              className={`uploader-area ${isDragging ? 'drag-active' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="uploader-content">
                <UploadCloud size={48} className="upload-icon" />
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Click or drag a JSON file here</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    JSON should contain a `title` and a `questions` array.
                  </p>
                </div>
              </div>
            </div>

            <textarea 
              className="json-textarea"
              placeholder='Or paste your JSON here...&#10;{&#10;  "title": "Math Quiz",&#10;  "questions": [ ... ]&#10;}'
              value={jsonInput}
              onChange={(e) => {
                setJsonInput(e.target.value);
                setError(null);
              }}
            />
            
            {error && (
              <div className="error-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="glass-button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button 
                className="glass-button primary" 
                onClick={handleSave}
                disabled={!jsonInput.trim()}
                style={{ opacity: !jsonInput.trim() ? 0.5 : 1 }}
              >
                Save Bank
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
