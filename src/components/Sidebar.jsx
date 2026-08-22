import React, { useState } from 'react';
import { Hexagon, ChevronRight, ChevronDown, Folder, FolderOpen, FileText } from 'lucide-react';

const vocabularyData = [
  {
    id: 1,
    name: "Vocabulary",
    children: [
      { id: 2, name: "Word meaning" },
      { id: 3, name: "Sentence completion" }
    ]
  },
  {
    id: 4,
    name: "Grammar & correct usage",
    children: [
      { id: 5, name: "Error recognition" },
      { id: 6, name: "Sentence structure" }
    ]
  },
  {
    id: 7,
    name: "Correct/logical reasoning of thought processes",
    children: [
      { id: 8, name: "Paragraph organization" },
      { id: 9, name: "Reading comprehension" }
    ]
  }
];

const numericalData = [
  { id: 101, name: "Number sequence" },
  { id: 102, name: "Basic operation" },
  { id: 103, name: "Word problem" }
];

const analyticalData = [
  { id: 201, name: "Word analogy" },
  { 
    id: 202, 
    name: "Logical reasoning",
    children: [
      { id: 203, name: "Identifying assumption" },
      { id: 204, name: "Drawing conclusion" },
      { id: 205, name: "Logic" },
      { id: 206, name: "Data Interpretation" }
    ]
  }
];

const TreeNode = ({ node, currentView, setCurrentView, setSelectedWord }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLeaf = !node.children || node.children.length === 0;

  const handleClick = () => {
    if (!isLeaf) {
      setIsOpen(!isOpen);
    } else {
      setCurrentView('verbal');
      if (setSelectedWord) setSelectedWord(node);
    }
  };

  return (
    <div className="tree-node" style={{ marginLeft: '1rem', paddingLeft: '0' }}>
      <div 
        className={`tree-node-content ${isLeaf ? 'leaf' : ''}`}
        onClick={handleClick}
      >
        {!isLeaf && (
          <div className="tree-icon">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
        
        <div className="tree-icon">
          {isLeaf ? (
            <FileText size={16} style={{ color: 'var(--text-muted)' }} />
          ) : isOpen ? (
            <FolderOpen size={16} />
          ) : (
            <Folder size={16} />
          )}
        </div>
        
        <span style={{ 
          color: isLeaf ? 'var(--text-primary)' : 'inherit', 
          fontWeight: isLeaf ? 400 : 500,
          fontSize: '0.875rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {isLeaf ? node.name.split(' - ')[0] : node.name}
        </span>
      </div>

      {isOpen && !isLeaf && (
        <div className="tree-children">
          {node.children.map(child => (
            <TreeNode 
              key={child.id} 
              node={child} 
              currentView={currentView}
              setCurrentView={setCurrentView}
              setSelectedWord={setSelectedWord}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({ currentView, setCurrentView, setSelectedWord }) {
  return (
    <aside className="sidebar" style={{ overflowY: 'auto' }}>
      <div className="sidebar-logo">
        <Hexagon className="icon" size={28} />
        <span>Vortex.</span>
      </div>
      
      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
        Verbal Ability
      </div>

      <nav className="sidebar-nav" style={{ marginBottom: '2rem' }}>
        {vocabularyData.map(node => (
          <TreeNode 
            key={node.id} 
            node={node} 
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSelectedWord={setSelectedWord}
          />
        ))}
      </nav>

      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
        Numerical Ability
      </div>

      <nav className="sidebar-nav" style={{ marginBottom: '2rem' }}>
        {numericalData.map(node => (
          <TreeNode 
            key={node.id} 
            node={node} 
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSelectedWord={setSelectedWord}
          />
        ))}
      </nav>
      
      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
        Analytical Ability
      </div>

      <nav className="sidebar-nav">
        {analyticalData.map(node => (
          <TreeNode 
            key={node.id} 
            node={node} 
            currentView={currentView}
            setCurrentView={setCurrentView}
            setSelectedWord={setSelectedWord}
          />
        ))}
      </nav>
    </aside>
  );
}
