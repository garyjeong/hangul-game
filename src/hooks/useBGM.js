import { useState, useEffect, useRef, useCallback } from 'react'

const MUTE_KEY = 'hangul-game-muted'

export function useBGM(audioSrc = null) {
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!audioSrc) return

    audioRef.current = new Audio(audioSrc)
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [audioSrc])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted
    }
  }, [isMuted])

  const play = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newValue = !prev
      try {
        localStorage.setItem(MUTE_KEY, String(newValue))
      } catch {}
      return newValue
    })
  }, [])

  const playEffect = useCallback((effectSrc) => {
    const effect = new Audio(effectSrc)
    effect.volume = isMuted ? 0 : 0.5
    effect.play().catch(() => {})
  }, [isMuted])

  return {
    play,
    pause,
    toggleMute,
    playEffect,
    isMuted,
    isPlaying,
  }
}
