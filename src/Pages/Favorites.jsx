import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

function Favorites(){
   const {favorites}=useMovieContext();
   if (favorites) {
      return (
        <div className="favorites">
          <h2>Your Favorites</h2>
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      );
    }
  
 return (<div className="favorites-empty">
    <h3>No Favorites Movies Yet</h3>
    <p>Start Adding Movies to your favorite and they will appear in facorite list</p>
 </div>)
}
export default Favorites