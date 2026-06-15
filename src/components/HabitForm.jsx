import React, { useState } from 'react'

const HabitForm = ({ onAdd, onCancel }) => {
  const [habitName, setHabitName] = useState('')
  const [category, setCategory] = useState('Personal')
  const [selectedColor, setSelectedColor] = useState('#00ff88')

  const colors = ['#00ff88', '#00d4ff', '#a78bfa', '#ff006e', '#ffa500']
  const categories = ['Personal', 'Health', 'Productivity', 'Learning', 'Fitness', 'Social']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (habitName.trim()) {
      onAdd(habitName, selectedColor)
      setHabitName('')
    }
  }

  return (
    <div className="bg-dark-card border border-neon-green/30 rounded-lg p-6 animate-slide-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-neon-green">Habit Name</label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="e.g., Morning Meditation, Exercise, Read"
            className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2 text-dark-text focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/30"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-neon-green">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-dark-bg border border-dark-border rounded px-4 py-2 text-dark-text focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/30"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-dark-card">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-neon-green">Color</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded transition-all ${
                  selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-dark-bg' : ''
                }`}
                style={{
                  backgroundColor: color,
                  boxShadow: selectedColor === color ? `0 0 15px ${color}` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-neon-green to-neon-blue text-dark-bg font-semibold py-2 rounded-lg hover:shadow-neon-glow transition-all"
          >
            Add Habit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-dark-border text-dark-text py-2 rounded-lg hover:bg-dark-bg transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default HabitForm
