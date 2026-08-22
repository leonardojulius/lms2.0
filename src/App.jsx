import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import DashboardHome from './components/DashboardHome'
import QuestionBanks from './components/QuestionBanks'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  return (
    <div className="app-container">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="main-wrapper">
        <Header currentView={currentView} />
        
        <div className="main-content">
          {currentView === 'dashboard' && <DashboardHome />}
          {currentView === 'banks' && <QuestionBanks />}
        </div>
      </main>
    </div>
  )
}

export default App
