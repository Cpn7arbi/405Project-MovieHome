import React, {useEffect} from "react";
import {Link, useLocation} from 'react-router-dom'; 
import axios from 'axios';
const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;


const SearchResults =({movies, searchTerm, setMovies, currentPage, setCurrentPage, totalResults, favorites, setFavorites}) => {

    const totalPages = Math.ceil(totalResults/10);  

    const location = useLocation();
    
    // handle any location state changes
    useEffect(() => {
        if(location.state){
            setCurrentPage(location.state.currentPage);
            setMovies(location.state.movies || []);
        }
    }, [location.state, setMovies, setCurrentPage]);   

    const handlePageChange = async (page) =>{
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${searchTerm}&page=${page}`);
        console.log(response);
        setMovies(response.data.Search || []);
        setCurrentPage(page);

    };

    const handleFavorite =(movie) => {
        if(favorites.some((fav) => fav.imdbID === movie.imdbID)){
            setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
        }else{
            setFavorites([...favorites, movie]);
        }
    }

    return(
        <div className="search-results-container">
            <h2>Search results for "{searchTerm}"</h2>

            <div className="search-results-grid">
            {movies.map((movie) =>(
                <div key={movie.imdbID} className="movie-card">
                    <Link to={`/moviesDetails/${movie.imdbID}`} state={{searchTerm, movies, currentPage}}>
                    <img src={movie.Poster} alt={movie.Title}/>
                    <div className="p-4">
                        <h2>{movie.Title}</h2>
                        <p>{movie.Year}</p>   
                    </div>
                    </Link>
                    <button 
                    className="favorite-button"
                    onClick={() => handleFavorite(movie)}
                    >
                        {favorites.some((fav) => fav.imdbID === movie.imdbID)
                        ? "Remove from Favorites"
                        : "Add to Favorites"}</button>
                    </div>
            ))}
        </div>

        <div className="pagination">
            <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            Previous
            </button>
            
            <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
        </div>);
};

export default SearchResults;