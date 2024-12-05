import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import '../style/MovieDetails.css';

const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;

const MovieDetails = () => {
    const { id } = useParams();  // Get movie id from URL
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovies] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&i=${id}`);
                setMovies(response.data);
            } catch (error) {
                console.log("Error fetching movie details:", error);
            }
        };

        if (!movie) {
            fetchMovie();
        }
    }, [id, movie]);

    if (!movie) {
        return <span className="loader"></span>;
    }

    return (
        <div className="movie-details-container">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-details-content">
                <h1>{movie.Title}</h1>
                <p>{movie.Plot}</p>
                <p><strong>Year:</strong> {movie.Year}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Rating:</strong> {movie.imdbRating}</p>
                <button onClick={() => navigate("/")}>Back to Search</button>
            </div>
        </div>
    );
};

export default MovieDetails;
