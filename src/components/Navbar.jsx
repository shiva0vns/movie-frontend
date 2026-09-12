import { Link } from "react-router-dom";
import '../css/navbar.css'
import { useMovieContext } from "../contexts/MovieContext";

function NavBar(){
    const {favLength}=useMovieContext();
    return(
        <nav className="navbar">
            <div className="navbar-brand">
            <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <span>{favLength}</span>
            <Link to="/favorites" className="nav-link">❤️</Link>
            
            </div>
        </nav>
    )
}

export default NavBar