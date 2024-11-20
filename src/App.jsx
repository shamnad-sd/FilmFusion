import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavAPi from './components/NavAPi'
import MovieDetails from './components/MovieDetails'
import Banner from './components/Banner'
import Footer from './components/Footer'

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<NavAPi />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
    <Footer/>
    </div>
  )
}

export default App