import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/HomePage.css";

const omdbApiKey = "process.env.REACT_APP_OMDB_API_KEY";

const Home = ({ setSearchTerm, setMovies, setCurrentPage, setTotalResults }) => {
    const [input, setInput] = useState("");
    const [moodVisible, setMoodVisible] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearchTerm(input);
        setCurrentPage(1);
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${input}&page=1`
            );
            if (response.data?.Search) {
                setMovies(response.data.Search);
                setTotalResults(response.data.totalResults || 0);
                navigate("/searchResults");
            } else {
                alert("No movies found. Try again.");
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            alert("Failed to fetch movies. Please try again.");
        }
    };

    const handleRandomMovie = async () => {
        const randomWords = ["love", "war", "life", "future", "star", "hero"];
        const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)];
        try {
            const response = await axios.get(
                `http://www.omdbapi.com/?apikey=${omdbApiKey}&s=${randomWord}`
            );
            const movies = response.data?.Search;
            if (movies && movies.length > 0) {
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                navigate(`/moviesDetails/${randomMovie.imdbID}`, {
                    state: { movie: randomMovie, searchTerm: randomWord, movies: movies },
                });
            } else {
                alert("No random movie found. Try again.");
            }
        } catch (error) {
            console.error("Error fetching random movie:", error);
            alert("Failed to fetch a random movie. Try again.");
        }
    };

    const handleMoodSelection = () => {
        setMoodVisible(!moodVisible);
    };

    return (
        <div className="home-container">
            <h1>Every movie has a story, and every story finds its home here at Movie Home</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for Movies"
                />
                <button type="submit">Search</button>
            </form>

            <button onClick={handleRandomMovie} className="random-movie-button">
                Random Movie
            </button>

            <button onClick={handleMoodSelection} className="mood-selection-button">
                Select Mood
            </button>

            {moodVisible && (
                <div className="mood-buttons">
                    {["happy", "sad", "angry", "dark", "funny", "scared", "hopeful", "adventurous", "excited", "mind blown"].map((mood) => (
                        <button
                            key={mood}
                            onClick={() => navigate(`/MoodResults/${mood}`)}
                            className="mood-button"
                        >
                            {mood}
                        </button>
                    ))}
                </div>
            )}

            <Link to="/MovieManAI" className="movie-man-button">
                <button className="movie-man-btn">Go to MovieMan</button>
            </Link>
        </div>
    );
};

export default Home;









