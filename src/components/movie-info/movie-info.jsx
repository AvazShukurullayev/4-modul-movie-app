import './movie-info.scss'
import {useEffect, useState} from "react";
import MovieService from "../../services/movie-service.js";
import ErrorMessage from "../error/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import PropTypes from "prop-types";

const MovieInfo = ({movieId}) => {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(false)

    const movieService = new MovieService()

    const updateMovie = () => {
        if (!movieId) {
            return
            // setErrorMessage(true)
        }
        setLoading(true)
        movieService.getDetailedMovie(movieId)
            .then((res) => setMovie(res))
            .catch(() => setErrorMessage(true))
            .finally(() => setLoading(false))
    }

    const errorContent = errorMessage && <ErrorMessage/>
    const loadingContent = loading && <Spinner/>
    const modalContent = !(errorMessage || loading) && <ModalContent movie={movie}/>

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