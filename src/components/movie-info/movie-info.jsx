import './movie-info.scss'
import {useEffect, useState} from "react";
import ErrorMessage from "../error/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import PropTypes from "prop-types";
import useMovieService from "../../services/movie-service.js";

const MovieInfo = ({movieId}) => {
    const [movie, setMovie] = useState(null)

    const {loading, error, getDetailedMovie} = useMovieService()

    const updateMovie = () => {
        if (!movieId) {
            return
        }

        getDetailedMovie(movieId).then((res) => setMovie(res))
    }

    const errorContent = error && <ErrorMessage/>
    const loadingContent = loading && <Spinner/>
    const modalContent = !(error || loading || !movie) && <ModalContent movie={movie}/>

    useEffect(() => {
        updateMovie()
    }, [movieId])
    return (
        <div className='movieinfo'>
            {errorContent}
            {loadingContent}
            {modalContent}
        </div>
    )
}
MovieInfo.propTypes = {
    movieId: PropTypes.number
}
export default MovieInfo

const ModalContent = ({movie}) => {
    return (
        <>
            <img src={movie.backdrop_path} alt={movie.name}/>
            <div className='movieinfo__descr'>
                <h1>{movie.name}</h1>
                <h4>Release date: {movie.release_date} <br/>
                    Rating: {movie.vote_average.toFixed(1)} iMDb</h4>
                <p>{movie.description}</p>
            </div>
        </>
    )
}

ModalContent.propTypes = {
    movie: PropTypes.object
}