import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MovieDetails from './components/MovieDetails'
import Footer from './components/Footer'
import MovieApi from './components/MovieApi'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
    <Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<MovieApi />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
    <Footer/>
    </div>
  )
}

export default App