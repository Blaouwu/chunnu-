import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './components/index'

function App() {
  return (
    <BrowserRouter basename="/chunnu">
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
