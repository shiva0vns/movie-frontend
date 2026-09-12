
import './css/App.css'
import Home from './Pages/Home';
import {Routes,Route} from 'react-router-dom'
import Favorites from './Pages/Favorites';
import NavBar from './components/Navbar';
import { MovieProvider } from './contexts/MovieContext';
function App() {
  return (
    <MovieProvider>
      <NavBar></NavBar>
    <main className="main-content">
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/favorites" element={<Favorites/>}></Route>
    </Routes>
    </main>
    </MovieProvider>
    
    );
}

export default App
