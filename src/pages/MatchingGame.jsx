import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Celebration, CorrectFeedback, WrongFeedback } from '../components/Celebration'
import { useSpeech } from '../hooks/useSpeech'
import { useProgress } from '../hooks/useProgress'
import { getAllWords, getRandomWords } from '../data/words'

const TOTAL_QUESTIONS = 10

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const optionColors = [
  'bg-gradient-to-br from-pink-400 to-rose-500',
  'bg-gradient-to-br from-sky-400 to-blue-500',
  'bg-gradient-to-br from-amber-400 to-orange-500',
]

export function MatchingGame() {
  const navigate = useNavigate()
  const { speak } = useSpeech()
  const { updateMatchingScore } = useProgress()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [question, setQuestion] = useState(null)
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null)
  const [showCorrect, setShowCorrect] = useState(false)
  const [showWrong, setShowWrong] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const generateQuestion = useCallback(() => {
    const allWords = getAllWords()
    const correctWord = allWords[Math.floor(Math.random() * allWords.length)]
    const wrongOptions = getRandomWords(2, correctWord.word)
    const allOptions = shuffleArray([correctWord, ...wrongOptions])

    setQuestion(correctWord)
    setOptions(allOptions)
    setSelected(null)
    setShowCorrect(false)
    setShowWrong(false)
  }, [])

  useEffect(() => {
    generateQuestion()
  }, [generateQuestion])

  useEffect(() => {
    if (question) {
      speak(question.word)
    }
  }, [question, speak])

  const handleSelect = (option) => {
    if (selected !== null) return

    setSelected(option.word)

    if (option.word === question.word) {
      setShowCorrect(true)
      setScore(prev => prev + 10)
      setCorrectCount(prev => prev + 1)

      setTimeout(() => {
        setShowCorrect(false)
        if (currentQuestion + 1 >= TOTAL_QUESTIONS) {
          setShowCelebration(true)
          setTimeout(() => {
            updateMatchingScore(score + 10, correctCount + 1)
            setGameOver(true)
          }, 1500)
        } else {
          setCurrentQuestion(prev => prev + 1)
          generateQuestion()
        }
      }, 1000)
    } else {
      setShowWrong(true)
      setTimeout(() => {
        setShowWrong(false)
        setSelected(null)
      }, 1000)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setCorrectCount(0)
    setGameOver(false)
    setShowCelebration(false)
    generateQuestion()
  }

  const handleSpeak = () => {
    if (question) {
      speak(question.word)
    }
  }

  // Game Over Screen
  if (gameOver) {
    const stars = correctCount >= 8 ? 3 : correctCount >= 5 ? 2 : 1
    return (
      <div className="game-container">
        <header className="game-header">
          <button onClick={() => navigate('/')} className="btn-circle">🏠</button>
          <div className="flex-1" />
          <div className="w-12" />
        </header>

        <main className="game-content">
          <div className="result-card animate-bounce-in">
            <div className="emoji-xl mb-3">🏆</div>
            <h2 className="title-lg mb-3">잘했어요!</h2>

            <div className="stars-row mb-3">
              {[1, 2, 3].map((s) => (
                <span key={s} className={`star ${s <= stars ? 'earned' : ''}`}>⭐</span>
              ))}
            </div>

            <div className="result-score">{score}점</div>
            <p className="text-body mt-2">
              {TOTAL_QUESTIONS}문제 중 {correctCount}문제 정답!
            </p>

            <p className="title-md mt-3" style={{ color: 'var(--mint-dark)' }}>
              {correctCount >= 8 && '대단해요! 최고예요! 🌟'}
              {correctCount >= 5 && correctCount < 8 && '잘했어요! 훌륭해요! 👏'}
              {correctCount < 5 && '좋아요! 다시 해봐요! 💪'}
            </p>

            <div className="flex gap-2 mt-4 justify-center flex-wrap">
              <button onClick={handleRestart} className="btn-toy btn-mint">
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

  if (!question) return null

  return (
    <div className="game-container">
      <CorrectFeedback show={showCorrect} />
      <WrongFeedback show={showWrong} />
      <Celebration show={showCelebration} />

      {/* Header */}
      <header className="game-header">
        <button onClick={() => navigate('/')} className="btn-circle">🏠</button>

        <div className="stats-pill">
          <span>🐰</span>
          <span className="title-md">그림 맞추기</span>
        </div>

        <div className="stats-pill">
          <span className="title-md" style={{ color: 'var(--coral)' }}>{score}점</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="game-content">
        {/* Progress */}
        <div className="w-full max-w-sm px-4">
          <div className="flex items-center gap-2">
            <span className="text-body" style={{ color: 'var(--lavender)' }}>
              {currentQuestion + 1}/{TOTAL_QUESTIONS}
            </span>
            <div className="flex-1 progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestion + 1) / TOTAL_QUESTIONS) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="question-display" onClick={handleSpeak}>
          <div className="question-emoji">{question.emoji}</div>
          <div className="flex items-center justify-center gap-1 mt-2 text-body">
            <span className="emoji-md">🔊</span>
            <span>터치해서 듣기</span>
          </div>
        </div>

        {/* Helper */}
        <div className="stats-pill">
          <span className="mascot-sm mascot">🐰</span>
          <span className="title-md">이건 뭘까요?</span>
        </div>

        {/* Options */}
        <div className="options-grid px-4">
          {options.map((option, index) => {
            const isSelected = selected === option.word
            const isCorrect = isSelected && option.word === question.word
            const isWrong = isSelected && option.word !== question.word

            return (
              <button
                key={option.word}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
                className={`
                  option-btn
                  ${optionColors[index]}
                  ${isCorrect ? 'correct' : ''}
                  ${isWrong ? 'wrong' : ''}
                `}
              >
                {option.word}
              </button>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="game-footer">
        <div className="flex gap-1">
          {[...Array(Math.min(correctCount, 5))].map((_, i) => (
            <span key={i} className="emoji-md animate-pop-in" style={{ animationDelay: `${i * 0.1}s` }}>⭐</span>
          ))}
        </div>
      </footer>
    </div>
  )
}
