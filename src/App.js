import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=c3f8e502`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }

  }

  const getMovieDetailsRequest = async (imdbID) => {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=c3f8e502`;
    const response = await fetch(url);
    const responseJson = await response.json();

    return responseJson

  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(()=> {
    const movieFavouties = JSON.parse(localStorage.getItem('react-movie-app-favourites'));

    setFavourites(movieFavouties);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  };

  const movieClick = async(movie) => {
    return await getMovieDetailsRequest(movie);
  }

  const addFavouriteMovie = (movie) => {
    var newFavouriteList = [movie];

    // if movie is not already in the list
    if (favourites && !favourites.some(e => e.imdbID === movie.imdbID)) {
      newFavouriteList = [...favourites, movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
    else if (!favourites) {
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
  }

  const RemoveFavouriteMovie = (movie) => {
    if (favourites) {
      const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);

      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
    }
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies and Shows' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div id='movies' className='slidingMenu row'>
        <MovieList id='movies' movies={movies} handleMovieClick={movieClick} handleFavouritesClick={addFavouriteMovie} favouriteComponent={AddFavourites} />
      </div>

      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div id='favs' className='slidingMenu row'>
        <MovieList id='favs' movies={favourites} handleMovieClick={movieClick} handleFavouritesClick={RemoveFavouriteMovie} favouriteComponent={RemoveFavourites} />
      </div>
    </div>
  );
};

export default App;
