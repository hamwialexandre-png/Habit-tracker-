export const getStreak = (completedDates) => {
  if (completedDates.length === 0) return 0

  const sortedDates = completedDates
    .map((d) => new Date(d))
    .sort((a, b) => b - a)

  let streak = 1
  let currentDate = new Date(sortedDates[0])
  currentDate.setHours(0, 0, 0, 0)

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i])
    prevDate.setHours(0, 0, 0, 0)

    const daysDiff = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24))

    if (daysDiff === 1) {
      streak++
      currentDate = prevDate
    } else {
      break
    }
  }

  return streak
}

export const getCompletionRate = (completedDates, totalDays) => {
  if (totalDays === 0) return 0
  return Math.round((completedDates.length / totalDays) * 100)
}

export const getCompletionRateByDate = (completedDates, targetDate) => {
  const dateStr = targetDate.toISOString().split('T')[0]
  return completedDates.includes(dateStr) ? 100 : 0
}
