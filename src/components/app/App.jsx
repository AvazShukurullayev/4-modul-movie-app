import Header from '../header/header'
import Hero from '../hero/hero'
import RowMovies from '../row-movies/row-movies'
import MovieService from "../../services/movie-service.js";

const App = () => {
    const movieSeries = new MovieService()
    console.log(movieSeries)
    // promise qaytaradi
   /* movieSeries.getPopularMovies()
        .then(data => console.log("getPopularMovies => ",data))
        .catch((err) => console.log(err))
        .finally(() => console.log("Finally"))

    movieSeries.getTrandingMovies()
        .then(data => console.log("getTrandingMovies => ",data))
        .catch((err) => console.log(err))
        .finally(() => console.log("Finally"))
    movieSeries.getDetailed(21)
        .then(data => console.log("getDetailed => ",data))
        .catch((err) => console.log(err))
        .finally(() => console.log("Finally"))*/
    return (
        <div className='app'>
            <Header/>
            <Hero/>
            <RowMovies/>
        </div>
    )
}

export default App
