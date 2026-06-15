import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'habit-tracker-data'

const defaultHabits = []
const defaultObjectives = []

const useStorage = () => {
  const [habits, setHabits] = useState(defaultHabits)
  const [objectives, setObjectives] = useState(defaultObjectives)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setHabits(data.habits || [])
        setObjectives(data.objectives || [])
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever habits or objectives change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          habits,
          objectives,
          lastUpdated: new Date().toISOString(),
        })
      )
    }
  }, [habits, objectives, isLoaded])

  const addHabit = (name, color) => {
    const newHabit = {
      id: uuidv4(),
      name,
      color,
      category: 'Personal',
      completedDates: [],
      createdAt: new Date().toISOString(),
    }
    setHabits([...habits, newHabit])
  }

  const removeHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id))
  }

  const toggleHabitDay = (habitId, dateStr) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(dateStr)
          return {
            ...habit,
            completedDates: isCompleted
              ? habit.completedDates.filter((d) => d !== dateStr)
              : [...habit.completedDates, dateStr],
          }
        }
        return habit
      })
    )
  }

  const addObjective = (objectiveData) => {
    const newObjective = {
      id: uuidv4(),
      ...objectiveData,
      createdAt: new Date().toISOString(),
    }
    setObjectives([...objectives, newObjective])
  }

  const removeObjective = (id) => {
    setObjectives(objectives.filter((o) => o.id !== id))
  }

  const updateObjectiveProgress = (id, progress) => {
    setObjectives(
      objectives.map((o) =>
        o.id === id ? { ...o, progress: Math.min(progress, 100) } : o
      )
    )
  }

  return {
    habits,
    objectives,
    addHabit,
    removeHabit,
    toggleHabitDay,
    addObjective,
    removeObjective,
    updateObjectiveProgress,
  }
}

export { useStorage }
