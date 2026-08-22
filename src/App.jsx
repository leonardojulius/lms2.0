import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import VerbalAbility from './components/VerbalAbility'

import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('verbal')
  const [selectedWord, setSelectedWord] = useState(null)

  return (
    <div className="app-container">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        setSelectedWord={setSelectedWord}
      />
      
      <main className="main-wrapper">
        <Header currentView={currentView} />
        
        <div className="main-content">
          {currentView === 'verbal' && <VerbalAbility selectedWord={selectedWord} />}
        </div>
      </main>
    </div>
  )
}

export default App
