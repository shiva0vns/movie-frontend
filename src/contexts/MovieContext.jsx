import {
  createContext,
  useState,
  useEffect,
  useContext
} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider =
  ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const favLength=favorites.length;
    useEffect(() => {
      const storedFavs = localStorage.getItem("favorites");
      if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);
    useEffect(() => {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);
    const addToFavorites= (movie) =>{
        
        setFavorites(prev =>
          {
            if(prev.some(item=>item.id===movie.id)){
              return prev;
            }
            return [...prev,movie];
          });
    };

    const removeFavorites =(movieId) =>{
        setFavorites(prev=>prev.filter(movie=>movie.id!==movieId))
    }
    const isFavorites =(movieId) =>{
        return favorites.some(movie=>movie.id===movieId)
    }
    const value={
        favorites,
        addToFavorites,
        removeFavorites,
        isFavorites,
        favLength
    }
    return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  }
