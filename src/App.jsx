import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { MatchingGame } from './pages/MatchingGame'
import { MemoryGame } from './pages/MemoryGame'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matching" element={<MatchingGame />} />
        <Route path="/memory" element={<MemoryGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
