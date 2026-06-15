import React, { useState, useEffect } from 'react'
import { Menu, X, Plus } from 'lucide-react'
import Sidebar from './components/Sidebar'
import DailyHabits from './components/DailyHabits'
import Objectives from './components/Objectives'
import Analytics from './components/Analytics'
import { useStorage } from './hooks/useStorage'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeView, setActiveView] = useState('habits')
  const { habits, objectives, addHabit, removeHabit, addObjective, removeObjective } = useStorage()

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-dark-card rounded-lg"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
              ⟡ Habit Tracker
            </h1>
          </div>
          <div className="text-sm text-dark-text/60">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </header>

      <div className="flex pt-16 h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            {activeView === 'habits' && (
              <DailyHabits habits={habits} addHabit={addHabit} removeHabit={removeHabit} />
            )}
            {activeView === 'objectives' && (
              <Objectives
                objectives={objectives}
                addObjective={addObjective}
                removeObjective={removeObjective}
              />
            )}
            {activeView === 'analytics' && <Analytics habits={habits} objectives={objectives} />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
