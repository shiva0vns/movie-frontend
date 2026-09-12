
import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'
import PopularityCard from './PopularityCard'
import { memo } from 'react'
const MovieCard=memo(function MovieCard({movie}){
    const { isFavorites, addToFavorites, removeFavorites } = useMovieContext()
    const favorite=isFavorites(movie.id)
    function  onFvtBtn(e){
       e.preventDefault()
       if(favorite) removeFavorites(movie.id)
       else addToFavorites(movie);
    }
    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`http://localhost:8080${movie.posterPath}`} alt={movie.title}></img>
                <div className="mpvie-overlay">
                    <button className={`favorite-btn ${favorite?"active":""}`} onClick={onFvtBtn}>
                    {favorite ? "❤️" : "🤍"}</button>
                </div>
            </div>
             <div className="movie-info">
                {/* <h3>{movie.title}</h3> */}
                <p>{movie.release_date?.split("-")[0]}</p>
                <PopularityCard popularity={movie.popularity}></PopularityCard>
             </div>
             </div>
    );

});
export default MovieCard