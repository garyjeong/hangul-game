import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'hangul-game-progress'

const defaultProgress = {
  matching: {
    highScore: 0,
    totalPlayed: 0,
    correctAnswers: 0,
  },
  memory: {
    highScore: 0,
    totalPlayed: 0,
    bestTime: null,
  },
  lastPlayed: null,
}

export function useProgress() {
  const [progress, setProgress] = useState(defaultProgress)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch (e) {
      console.warn('Failed to load progress:', e)
    }
  }, [])

  const saveProgress = useCallback((newProgress) => {
    const updated = { ...newProgress, lastPlayed: new Date().toISOString() }
    setProgress(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.warn('Failed to save progress:', e)
    }
  }, [])

  const updateMatchingScore = useCallback((score, correct) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        matching: {
          highScore: Math.max(prev.matching.highScore, score),
          totalPlayed: prev.matching.totalPlayed + 1,
          correctAnswers: prev.matching.correctAnswers + correct,
        },
        lastPlayed: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const updateMemoryScore = useCallback((score, time) => {
    setProgress(prev => {
      const bestTime = prev.memory.bestTime === null
        ? time
        : Math.min(prev.memory.bestTime, time)

      const updated = {
        ...prev,
        memory: {
          highScore: Math.max(prev.memory.highScore, score),
          totalPlayed: prev.memory.totalPlayed + 1,
          bestTime,
        },
        lastPlayed: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    progress,
    updateMatchingScore,
    updateMemoryScore,
    resetProgress,
  }
}
