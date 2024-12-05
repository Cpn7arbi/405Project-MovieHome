import React from "react";
import "../style/Favorites.css";

const Favorites = ({favorites}) =>{
    return(
        <div className="favorites-container">
            <h2>Your Favorite Movies</h2>
            <div className="favorites-grid">
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <div key={movie.imbdID} className="favorite-movies-card">
                            <img src={movie.Poster} alt={movie.Title}/>
                            <h2>{movie.Title}</h2>
                            <p>{movie.Year}</p>
                        </div>
                    ))
                ): (
                    <p>No favorite movies yet. Start adding some!</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;