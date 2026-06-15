import React, { useState } from 'react'
import { Plus, X, Flame } from 'lucide-react'
import HabitGrid from './HabitGrid'
import HabitForm from './HabitForm'

const DailyHabits = ({ habits, addHabit, removeHabit }) => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Daily Habits</h2>
          <p className="text-dark-text/60">Track your daily progress with a GitHub-style heatmap</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-green to-neon-blue text-dark-bg font-semibold rounded-lg hover:shadow-neon-glow transition-all"
        >
          <Plus size={20} />
          Add Habit
        </button>
      </div>

      {showForm && (
        <HabitForm
          onAdd={(name, color) => {
            addHabit(name, color)
            setShowForm(false)
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {habits.length === 0 ? (
        <div className="bg-dark-card border border-dark-border rounded-lg p-12 text-center">
          <Flame className="mx-auto mb-4 text-neon-green/50" size={48} />
          <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
          <p className="text-dark-text/60 mb-4">Start building your habits by adding your first one</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-dark-border hover:bg-dark-border/80 rounded-lg"
          >
            <Plus size={18} />
            Create Habit
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {habits.map((habit) => (
            <HabitGrid
              key={habit.id}
              habit={habit}
              onRemove={() => removeHabit(habit.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DailyHabits
