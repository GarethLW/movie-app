import React from 'react';

//click function
// reset last selected id to default
// set this id as currently selected



const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    const myId = props.id;

    var activeMovie = null;


    if (props.movies) {
        return (
            <>
                <div className="col d-flex movieList">
                    {props.movies.map((movie, index) => (
                        <div key={movie.imdbID} id={movie.imdbID} className="col d-flex image-container m-4">

                            <img onClick={
                                async () => {
                                    var tempID = myId+'desc-'+movie.imdbID;
                                    var tempClassList = document.getElementById(tempID).classList;
                                 
                                    // if there is an actively selected movie then hide it before opening the one we clicked
                                    if (activeMovie) {
                                        document.getElementById(activeMovie).classList.remove("cardText");
                                        document.getElementById(activeMovie).classList.add("cardTextHide");
                                        tempClassList.remove("selectedDesc");
                                    }
                                    // if this movie is the one we just clicked on, then unselect it
                                    if (tempClassList.contains("selectedDesc") || activeMovie === tempID) {
                                        tempClassList.remove("cardText");
                                        tempClassList.add("cardTextHide");
                                        tempClassList.remove("selectedDesc");
                                        activeMovie = null;
                                        return;
                                    }
                                    // else we selected a movie, so show its description
                                    else {
                                        tempClassList.add("cardText");
                                        tempClassList.remove("cardTextHide");
                                        tempClassList.add("selectedDesc");

                                        activeMovie = tempID;
                                    }
                                    let response = await props.handleMovieClick(movie.imdbID);
                                    

                                    if(response && activeMovie){
                                        
                                        document.getElementById(activeMovie).innerText = response.Title +"\n\n"+ response.Plot +
                                        "\n\nYear: "+response.Year+
                                        "\nDirector: "+response.Director+
                                        
                                        "\n\n"+
                                        "Ratings\n"+
                                        "IMDb: "+response.imdbRating+
                                        "\nMetascore: "+response.Metascore;
                                    }
                                    // todo get api to return movie data and put it in there
                                }
                            } src={movie.Poster} alt='movie'></img>

                            <div id={myId+'desc-'+movie.imdbID} className="col cardTextHide">
                                Description Loading...
                            </div>
                            
                            <div onClick={() => props.handleFavouritesClick(movie)} className="overlay addFav align-items-center">
                                <FavouriteComponent />
                            </div>
                        </div>
                    ))}
                </div>
                <div onClick={() => { if (myId) document.getElementById(myId).scrollBy({ left: -600, behavior: 'smooth' }); }} className="scrollL col-sm-1">

                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="arrow bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                    </svg>

                </div>
                <div onClick={() => { if (myId) document.getElementById(myId).scrollBy({ left: 600, behavior: 'smooth' }); }} className="scroll col-sm-1">

                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="arrow bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                    </svg>

                </div>

            </>
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