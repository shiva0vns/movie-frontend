
import './css/App.css'
import Home from './Pages/Home';
import {Routes,Route} from 'react-router-dom'
import Favorites from './Pages/Favorites';
import NavBar from './components/Navbar';
import { MovieProvider } from './contexts/MovieContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './Pages/login';
import Register from './Pages/Register';
function App() {
  return (
    <MovieProvider>
      <NavBar></NavBar>
    <main className="main-content">
    <Routes>
    <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
      <Route path="/favorites" element={<ProtectedRoute><Favorites/></ProtectedRoute>}></Route>
    </Routes>
    </main>
    </MovieProvider>
    
    );
}

export default App
