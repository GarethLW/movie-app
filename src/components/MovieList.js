import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;

    if (props.movies) {
        return (
            <div className="d-flex">
                {props.movies.map((movie, index) => (
                    <div key={movie.imdbID} className="image-container m-4">
                        <img src={movie.Poster} alt='movie'></img>
                        <div onClick={() => props.handleFavouritesClick(movie)} className="overlay addFav align-items-center">
                            <FavouriteComponent />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    else {
        return (
            <div className="d-flex">
            </div>
        )
    }
}

export default MovieList;