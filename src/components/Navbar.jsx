import { Link, useNavigate } from "react-router-dom";
import '../css/navbar.css'
import { useMovieContext } from "../contexts/MovieContext";
import { useAuth } from "../contexts/AuthContext";

function NavBar(){
    const {favLength}=useMovieContext();
    const {isLoggedIn,logoutUser,user}=useAuth();
    const navigate=useNavigate();

    const handleLogout = ()=>{
        logoutUser();
        navigate("/login");
    };
    return(
        <nav className="navbar">
            <div className="navbar-brand">
            <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links">
            {isLoggedIn() ? (
                <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">❤️</Link>
                <span>{user?.name}</span>
                <button onClick={handleLogout} className="nav-link">Logout</button>
                </>
            ) : (
                <Link to="/login" className="nav-link">Login</Link>
            )}
            </div>
        </nav>

    )
}

export default NavBar