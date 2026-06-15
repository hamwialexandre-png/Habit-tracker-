import { getLastNDays, getWeekNumber } from './dateUtils'

export const getDailyCompletionRate = (habits) => {
  const lastNDays = getLastNDays(30)
  const dailyStats = {}

  lastNDays.forEach((date) => {
    const dateStr = date.toISOString().split('T')[0]
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
    dailyStats[dateStr] = {
      date: dateStr,
      day: dayName.substring(0, 1),
      completed: 0,
      total: habits.length,
      rate: 0,
    }
  })

  habits.forEach((habit) => {
    habit.completedDates.forEach((dateStr) => {
      if (dailyStats[dateStr]) {
        dailyStats[dateStr].completed++
      }
    })
  })

  return Object.values(dailyStats)
    .map((stat) => ({
      ...stat,
      rate: stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0,
    }))
    .slice(0, 14) // Last 14 days
}

export const getCompletionRateByWeek = (habits) => {
  const weekStats = {}

  habits.forEach((habit) => {
    habit.completedDates.forEach((dateStr) => {
      const date = new Date(dateStr)
      const weekNum = getWeekNumber(date)
      const yearWeek = `${date.getFullYear()}-W${weekNum}`

      if (!weekStats[yearWeek]) {
        weekStats[yearWeek] = {
          week: `W${weekNum}`,
          completed: 0,
          total: 0,
        }
      }
      weekStats[yearWeek].completed++
    })
  })

  return Object.values(weekStats).slice(-12) // Last 12 weeks
}

export const getMonthlyProgress = (objectives) => {
  return objectives.map((obj) => ({
    name: obj.name,
    progress: obj.progress,
    category: obj.category,
  }))
}
