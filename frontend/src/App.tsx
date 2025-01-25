
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login.tsx'
import Register from './pages/register.tsx'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App