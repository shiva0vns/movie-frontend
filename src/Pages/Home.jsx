import MovieCard from "../components/MovieCard";
import { useState, useEffect,useMemo } from "react";
import "../css/Home.css";
import { useMovieContext } from "../contexts/MovieContext";
import { searchMovies, getPopularMovie } from "../service/api";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy,setSortBy]=useState("default");
  const { favorites } = useMovieContext();
  const {logoutUser}=useAuth();

  const sortedMovies = useMemo(() => {

    console.log("Sorting movies...", sortBy);

    if (sortBy === "popularity") {
        return [...movies].sort(
            (a, b) => b.popularity - a.popularity
        );
    }

    if (sortBy === "rating") {
        return [...movies].sort(
            (a, b) => b.voteAverage - a.voteAverage
        );
    }

    if (sortBy === "newest") {
        return [...movies].sort(
            (a, b) =>
                new Date(b.releaseDate) -
                new Date(a.releaseDate)
        );
    }

    if (sortBy === "oldest") {
        return [...movies].sort(
            (a, b) =>
                new Date(a.releaseDate) -
                new Date(b.releaseDate)
        );
    }
    if (sortBy === "favorites") {
      return movies.filter(movie =>
          favorites.some(fav => fav.id === movie.id)
      );
  }

    return movies;

}, [movies, sortBy,favorites]);
  //   const movies = [
  //     {
  //       id: 1,
  //       title: "John Wick",
  //       release_date: 2024,
  //     },
  //     { id: 2, title: "Adam", release_date: 2025 },
  //     { id: 3, title: "Titanic", release_date: 2024 },
  //     { id: 4, title: "Marvel Avengers", release_date: 2024 },
  //   ];
  //here useEffect run once first time rendering of component because empty dependency arrat
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovie();
        setMovies(popularMovies);
      } catch (err) {
        if(err.message==="UNAUTHORIZED"){
          logoutUser()
          navigate("/login")
        }else{
        console.log(err);
        }
        setError("Failed to load the movies......");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
  
    const query = searchQuery.trim();
  
    if (!query) return;
    if (loading) return;
  
    setLoading(true);
  
    try {
      const searchResults = await searchMovies(query);
  
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies....");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
  
    setSearchQuery(query);
  
    if (!query.trim()) {
      const movies = await getPopularMovie();
      setMovies(movies);
      return;
    }
  
    try {
      setLoading(true);
  
      const searchResults = await searchMovies(query.trim());
  
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies....");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="home">
      <form className="search-form" onSubmit={onSearch}>
        <input
          type="text"
          className="search-input "
          placeholder="Search For Movies"
          value={searchQuery}
          onChange={handleSearchChange}
        ></input>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
     
      {loading ? (
        <div className="loading"> Loading....</div>
      ) : (<div> <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
    >
        <option value="default">Default</option>
        <option value="popularity">Popularity</option>
        <option value="rating">Rating</option>
        <option value="newest">Newest</option>
    <option value="oldest">Oldest</option>
    <option value="favorites">Favorites</option>

    </select>
        <div className="movies-grid">
          {sortedMovies.map(
            (movie) =>
              (
                <MovieCard movie={movie} key={movie.id}></MovieCard>
              )
          )}
        </div>
      </div>)}
    </div>
  );
}

export default Home;
