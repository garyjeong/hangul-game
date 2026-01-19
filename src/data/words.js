export const categories = [
  {
    id: 'animals',
    name: '동물',
    icon: '🐶',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'fruits',
    name: '과일',
    icon: '🍎',
    color: 'from-red-400 to-pink-500',
  },
  {
    id: 'vehicles',
    name: '탈것',
    icon: '🚗',
    color: 'from-blue-400 to-cyan-500',
  },
]

export const words = {
  animals: [
    { word: '강아지', emoji: '🐶' },
    { word: '고양이', emoji: '🐱' },
    { word: '토끼', emoji: '🐰' },
    { word: '새', emoji: '🐦' },
    { word: '물고기', emoji: '🐟' },
    { word: '곰', emoji: '🐻' },
    { word: '사자', emoji: '🦁' },
    { word: '코끼리', emoji: '🐘' },
  ],
  fruits: [
    { word: '사과', emoji: '🍎' },
    { word: '바나나', emoji: '🍌' },
    { word: '포도', emoji: '🍇' },
    { word: '수박', emoji: '🍉' },
    { word: '딸기', emoji: '🍓' },
    { word: '오렌지', emoji: '🍊' },
    { word: '복숭아', emoji: '🍑' },
    { word: '체리', emoji: '🍒' },
  ],
  vehicles: [
    { word: '자동차', emoji: '🚗' },
    { word: '버스', emoji: '🚌' },
    { word: '비행기', emoji: '✈️' },
    { word: '배', emoji: '🚢' },
    { word: '자전거', emoji: '🚲' },
    { word: '기차', emoji: '🚂' },
    { word: '헬리콥터', emoji: '🚁' },
    { word: '오토바이', emoji: '🏍️' },
  ],
}

export const getAllWords = () => {
  return Object.values(words).flat()
}

export const getWordsByCategory = (categoryId) => {
  return words[categoryId] || []
}

export const getRandomWords = (count, excludeWord = null) => {
  const allWords = getAllWords().filter(w => w.word !== excludeWord)
  const shuffled = [...allWords].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
