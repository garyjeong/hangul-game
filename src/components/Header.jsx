import { useNavigate } from 'react-router-dom'

export function Header({ title, showBack = true, showSound = false, isMuted, onToggleMute }) {
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xl"
          >
            ←
          </button>
        )}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      {showSound && (
        <button
          onClick={onToggleMute}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-xl"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      )}
    </header>
  )
}
