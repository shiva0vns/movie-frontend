// const API_KEY="6dd20851c21bb236f68ba3bca8e6f098"
// const BASE_URL="https://api.themoviedb.org/3";

const authHeaders = ()=>{
    const token=localStorage.getItem("token");
    return token ? {Authorization: `Bearer ${token}`}: {};
};
export const getPopularMovie= async ()=>{
    // const response=await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const response=await fetch(`http://localhost:8080/api/movies`,{
        headers:authHeaders(),
    });
    if(!response.ok){
        throw new Error("Failed to load movies");
    }
    const data= await response.json();
    // console.log(data.results);
    return data;
};

export const searchMovies = async (query) => {
    const response = await fetch(
        `http://localhost:8080/api/movies/search?title=${encodeURIComponent(query)}`,{
            headers:authHeaders()});
    if (!response.ok) {
        throw new Error("Failed to search movies");
    }

    return await response.json();
};

export const favoriteMovie = async (movieId) => {
    const response = await fetch(`http://localhost:8080/api/movies/${movieId}/favorite`, {
        method: "POST",
        headers: authHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to mark movie as favorite");
    }

    return await response.text(); // backend returns a plain string message
};


    