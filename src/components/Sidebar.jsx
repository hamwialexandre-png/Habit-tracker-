import React from 'react'
import { BarChart3, CheckSquare, TrendingUp } from 'lucide-react'

const Sidebar = ({ activeView, setActiveView, sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { id: 'habits', label: 'Daily Habits', icon: CheckSquare },
    { id: 'objectives', label: 'Objectives', icon: TrendingUp },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ]

  const handleNavClick = (id) => {
    setActiveView(id)
    setSidebarOpen(false)
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative w-64 h-full bg-dark-card border-r border-dark-border transform transition-transform md:translate-x-0 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border border-neon-green/50 text-neon-green shadow-neon-glow'
                    : 'text-dark-text/60 hover:text-dark-text hover:bg-dark-bg'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 text-xs text-dark-text/40 border-t border-dark-border pt-6">
          <p>v1.0.0</p>
          <p>Dark Mode • Local Storage</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
