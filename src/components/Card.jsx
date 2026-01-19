import { useState } from 'react'

export function Card({ front, back, isFlipped, onClick, isMatched, disabled }) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`
        relative w-20 h-24 sm:w-24 sm:h-28 cursor-pointer perspective-1000
        ${disabled ? 'cursor-not-allowed' : ''}
        ${isMatched ? 'opacity-60' : ''}
      `}
    >
      <div
        className={`
          relative w-full h-full transition-transform duration-500 transform-style-preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Back of card (question mark) */}
        <div
          className="absolute w-full h-full rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-lg flex items-center justify-center text-4xl text-white font-bold backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          ?
        </div>

        {/* Front of card (content) */}
        <div
          className={`
            absolute w-full h-full rounded-xl shadow-lg flex items-center justify-center text-center p-2
            ${isMatched ? 'bg-gradient-to-br from-green-300 to-emerald-400' : 'bg-white'}
          `}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {front}
        </div>
      </div>
    </div>
  )
}

export function WordCard({ word, emoji, onClick, isSelected, isCorrect, isWrong }) {
  let bgColor = 'bg-white hover:bg-gray-50'
  if (isSelected) bgColor = 'bg-blue-100 ring-4 ring-blue-400'
  if (isCorrect) bgColor = 'bg-green-200 ring-4 ring-green-500'
  if (isWrong) bgColor = 'bg-red-200 ring-4 ring-red-400 animate-shake'

  return (
    <button
      onClick={onClick}
      className={`
        ${bgColor}
        w-full p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-200
        active:scale-95 flex flex-col items-center gap-2
      `}
    >
      {emoji && <span className="text-4xl sm:text-5xl">{emoji}</span>}
      <span className="text-xl sm:text-2xl font-bold text-gray-800">{word}</span>
    </button>
  )
}
