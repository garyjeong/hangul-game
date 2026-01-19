import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'

const games = [
  {
    id: 'matching',
    title: '그림 맞추기',
    description: '그림을 보고 맞는 단어를 찾아요!',
    mascot: '🐰',
    icon: '🎨',
    path: '/matching',
  },
  {
    id: 'memory',
    title: '카드 뒤집기',
    description: '같은 짝을 찾아 카드를 뒤집어요!',
    mascot: '🐻',
    icon: '🃏',
    path: '/memory',
  },
]

const bgDecorations = [
  { emoji: '⭐', top: '8%', left: '5%', delay: '0s' },
  { emoji: '🌟', top: '15%', right: '8%', delay: '1s' },
  { emoji: '☁️', top: '5%', left: '30%', delay: '2s' },
  { emoji: '🌈', bottom: '25%', left: '3%', delay: '0.5s' },
  { emoji: '🎈', bottom: '15%', right: '5%', delay: '1.5s' },
]

function GameCard({ game, onClick }) {
  return (
    <button onClick={onClick} className="card-base card-game w-full">
      <div className="mascot mascot-md">{game.mascot}</div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="emoji-md">{game.icon}</span>
          <h2 className="title-lg truncate">{game.title}</h2>
        </div>
        <p className="text-body">{game.description}</p>
      </div>
      <div className="emoji-md animate-wiggle flex-shrink-0">👉</div>
    </button>
  )
}

export function Home() {
  const navigate = useNavigate()
  const { progress } = useProgress()

  const totalPlayed = progress.matching.totalPlayed + progress.memory.totalPlayed
  const totalCorrect = progress.matching.correctAnswers

  return (
    <div className="game-container">
      {/* Background decorations */}
      {bgDecorations.map((d, i) => (
        <div
          key={i}
          className="bg-decoration"
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            bottom: d.bottom,
            animationDelay: d.delay,
          }}
        >
          {d.emoji}
        </div>
      ))}

      {/* Header */}
      <header className="game-header">
        <div className="w-12" />
        <div className="flex-1" />
        {totalPlayed > 0 && (
          <div className="stats-pill">
            <span>🎮 {totalPlayed}</span>
            <span>🎯 {totalCorrect}</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="game-content">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mascot mascot-lg">🦊</div>
          <h1 className="title-xl mt-2">한글 놀이</h1>
          <p className="text-body mt-1">
            재미있게 한글을 배워요! <span className="inline-block animate-wiggle">🎉</span>
          </p>
        </div>

        {/* Game Cards */}
        <div className="w-full max-w-sm px-2 space-y-3">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => navigate(game.path)}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="game-footer">
        <div className="flex items-center gap-2">
          <span className="mascot-sm mascot" style={{ animationDelay: '0s' }}>🐥</span>
          <span className="mascot-sm mascot" style={{ animationDelay: '0.15s' }}>🐣</span>
          <span className="mascot-sm mascot" style={{ animationDelay: '0.3s' }}>🐤</span>
        </div>
      </footer>
    </div>
  )
}
