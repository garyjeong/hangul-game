import { useEffect, useState } from 'react'

const particles = ['⭐', '🌟', '✨', '💫', '🎉', '🎊', '❤️', '💖', '🌈', '🎀']

function Particle({ emoji, delay, x }) {
  return (
    <div
      className="absolute animate-float-up pointer-events-none"
      style={{
        left: `${x}%`,
        animationDelay: `${delay}ms`,
        top: '100%',
        fontSize: `${Math.random() * 16 + 20}px`,
      }}
    >
      {emoji}
    </div>
  )
}

export function Celebration({ show, onComplete }) {
  const [particleList, setParticleList] = useState([])

  useEffect(() => {
    if (show) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        emoji: particles[Math.floor(Math.random() * particles.length)],
        delay: Math.random() * 600,
        x: Math.random() * 100,
      }))
      setParticleList(newParticles)

      const timer = setTimeout(() => {
        setParticleList([])
        onComplete?.()
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!show && particleList.length === 0) return null

  return (
    <div className="celebration-overlay">
      {particleList.map(p => (
        <Particle key={p.id} {...p} />
      ))}

      {show && (
        <div className="celebration-emoji">🎉</div>
      )}
    </div>
  )
}

export function CorrectFeedback({ show }) {
  if (!show) return null

  return (
    <div className="celebration-overlay">
      <div
        className="btn-toy btn-mint animate-bounce-in"
        style={{ pointerEvents: 'none' }}
      >
        <span className="text-3xl">🎉</span>
        <span className="text-2xl">정답!</span>
        <span className="text-3xl">✨</span>
      </div>
    </div>
  )
}

export function WrongFeedback({ show }) {
  if (!show) return null

  return (
    <div className="celebration-overlay">
      <div
        className="btn-toy btn-sunny animate-shake"
        style={{ pointerEvents: 'none' }}
      >
        <span className="text-3xl">🤔</span>
        <div className="text-center">
          <div className="text-xl">다시 해봐요!</div>
          <div className="text-sm opacity-80">할 수 있어요!</div>
        </div>
        <span className="text-3xl">💪</span>
      </div>
    </div>
  )
}
