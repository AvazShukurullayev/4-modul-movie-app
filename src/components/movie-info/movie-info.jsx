import './movie-info.scss'
import {useEffect, useState} from "react";
import ErrorMessage from "../error/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import PropTypes from "prop-types";
import useMovieService from "../../services/movie-service.js";
import {useNavigate} from "react-router-dom";

const MovieInfo = ({movieId}) => {
    const [movie, setMovie] = useState(null)

    const {loading, error, getDetailedMovie} = useMovieService()

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }, [movieId, updateMovie])
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
    const navigate = useNavigate()
    return (
        <>
            <img src={movie.backdrop_path} alt={movie.name}/>
            <div className='movieinfo__descr'>
                <h1>{movie.name}</h1>
                <h4>Release date: {movie.release_date} <br/>
                    Rating: {movie.vote_average.toFixed(1)} iMDb</h4>
                <p>{movie.description}</p>

                <button className={"btn btn-loading"} onClick={() => navigate(`/movie/${movie.id}`)}>
                    Details
                </button>
            </div>
        </>
    )
}

ModalContent.propTypes = {
    movie: PropTypes.object
}