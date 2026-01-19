import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Celebration } from '../components/Celebration'
import { useSpeech } from '../hooks/useSpeech'
import { useProgress } from '../hooks/useProgress'
import { getAllWords } from '../data/words'

const PAIRS_COUNT = 6

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function MemoryGame() {
  const navigate = useNavigate()
  const { speak } = useSpeech()
  const { updateMemoryScore } = useProgress()

  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const initGame = useCallback(() => {
    const allWords = shuffleArray(getAllWords()).slice(0, PAIRS_COUNT)

    const cardPairs = allWords.flatMap((word, index) => [
      { id: index * 2, pairId: index, type: 'emoji', content: word.emoji, word: word.word },
      { id: index * 2 + 1, pairId: index, type: 'word', content: word.word, word: word.word },
    ])

    setCards(shuffleArray(cardPairs))
    setFlipped([])
    setMatched([])
    setMoves(0)
    setStartTime(Date.now())
    setElapsedTime(0)
    setGameOver(false)
    setShowCelebration(false)
    setIsChecking(false)
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  useEffect(() => {
    if (!startTime || gameOver) return

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime, gameOver])

  useEffect(() => {
    if (matched.length === PAIRS_COUNT) {
      setShowCelebration(true)
      setTimeout(() => {
        const score = Math.max(100 - moves * 2, 10)
        updateMemoryScore(score, elapsedTime)
        setGameOver(true)
      }, 1500)
    }
  }, [matched, moves, elapsedTime, updateMemoryScore])

  const handleCardClick = (card) => {
    if (isChecking) return
    if (flipped.includes(card.id)) return
    if (matched.some(m => m.pairId === card.pairId)) return

    speak(card.word)

    const newFlipped = [...flipped, card.id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      setMoves(prev => prev + 1)

      const [first, second] = newFlipped.map(id => cards.find(c => c.id === id))

      if (first.pairId === second.pairId) {
        setTimeout(() => {
          setMatched(prev => [...prev, { pairId: first.pairId }])
          setFlipped([])
          setIsChecking(false)
        }, 500)
      } else {
        setTimeout(() => {
          setFlipped([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Game Over Screen
  if (gameOver) {
    const score = Math.max(100 - moves * 2, 10)
    const stars = score >= 80 ? 3 : score >= 50 ? 2 : 1

    return (
      <div className="game-container">
        <header className="game-header">
          <button onClick={() => navigate('/')} className="btn-circle">🏠</button>
          <div className="flex-1" />
          <div className="w-12" />
        </header>

        <main className="game-content">
          <div className="result-card animate-bounce-in">
            <div className="emoji-xl mb-3">🎊</div>
            <h2 className="title-lg mb-3">완료!</h2>

            <div className="stars-row mb-3">
              {[1, 2, 3].map((s) => (
                <span key={s} className={`star ${s <= stars ? 'earned' : ''}`}>⭐</span>
              ))}
            </div>

            <div className="result-score">{score}점</div>

            <div className="flex justify-center gap-4 mt-3">
              <div className="text-center">
                <div className="emoji-md">⏱️</div>
                <div className="title-md" style={{ color: 'var(--sky-dark)' }}>{formatTime(elapsedTime)}</div>
                <div className="text-body">시간</div>
              </div>
              <div className="text-center">
                <div className="emoji-md">🎯</div>
                <div className="title-md" style={{ color: 'var(--lavender)' }}>{moves}번</div>
                <div className="text-body">시도</div>
              </div>
            </div>

            <p className="title-md mt-3" style={{ color: 'var(--mint-dark)' }}>
              {score >= 80 && '완벽해요! 기억력 천재! 🧠'}
              {score >= 50 && score < 80 && '잘했어요! 대단해요! 👏'}
              {score < 50 && '좋아요! 다시 해봐요! 💪'}
            </p>

            <div className="flex gap-2 mt-4 justify-center flex-wrap">
              <button onClick={initGame} className="btn-toy btn-sky">
                다시 🔄
              </button>
              <button onClick={() => navigate('/')} className="btn-toy btn-sunny">
                홈 🏠
              </button>
            </div>
          </div>
        </main>

        <footer className="game-footer" />
      </div>
    )
  }

  return (
    <div className="game-container">
      <Celebration show={showCelebration} />

      {/* Header */}
      <header className="game-header">
        <button onClick={() => navigate('/')} className="btn-circle">🏠</button>

        <div className="stats-pill">
          <span>🐻</span>
          <span className="title-md">카드 뒤집기</span>
        </div>

        <div className="stats-pill">
          <span>🎯</span>
          <span className="title-md" style={{ color: 'var(--lavender)' }}>{moves}</span>
          <span>⏱️</span>
          <span className="title-md" style={{ color: 'var(--sky-dark)' }}>{formatTime(elapsedTime)}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="game-content">
        {/* Helper */}
        <div className="stats-pill">
          <span className="mascot-sm mascot">🐻</span>
          <span className="title-md">같은 짝을 찾아봐요!</span>
        </div>

        {/* Cards Grid */}
        <div className="memory-grid px-2">
          {cards.map((card) => {
            const isFlipped = flipped.includes(card.id)
            const isMatched = matched.some(m => m.pairId === card.pairId)

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`flip-card memory-card ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
              >
                <div className="flip-card-inner">
                  {/* Back (question mark) */}
                  <div className="flip-card-front">
                    <span>?</span>
                  </div>

                  {/* Front (content) */}
                  <div className={`flip-card-back ${isMatched ? 'matched-card' : ''}`}>
                    {card.type === 'emoji' ? (
                      <span className="card-emoji">{card.content}</span>
                    ) : (
                      <span className="card-word">{card.content}</span>
                    )}
                    {isMatched && <span className="match-check">✅</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Footer - Progress */}
      <footer className="game-footer">
        <div className="flex gap-1">
          {[...Array(PAIRS_COUNT)].map((_, i) => (
            <div key={i} className={`progress-dot ${i < matched.length ? 'filled' : ''}`}>
              {i < matched.length ? '⭐' : '○'}
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}
