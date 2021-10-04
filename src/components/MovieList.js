import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;

    return (
        <div className="d-flex">
            {props.movies.map((movie, index) => (
                <div key={movie.imdbID} className="image-container m-4">
                    <img src={movie.Poster} alt='movie'></img>
                    <div onClick={() => props.handleFavouritesClick(movie)} className="overlay addFav align-items-center">
                        <FavouriteComponent/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MovieList;