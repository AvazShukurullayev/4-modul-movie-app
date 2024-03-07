import './movie-info.scss'
import React from "react";
import MovieService from "../../services/movie-service.js";
import ErrorMessage from "../error/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";

class MovieInfo extends React.Component {
    state = {
        movie: null,
        loading: true,
        errorMessage: false
    }
    movieService = new MovieService()

    componentDidMount() {
        this.updateMovie()
    }

    updateMovie = () => {
        const {movieId} = this.props
        if (!movieId) {
            this.setState({errorMessage: true})
        }
        this.movieService.getDetailedMovie(movieId)
            .then((res) => this.setState({movie: res}))
            .catch(() => this.setState({errorMessage: true}))
            .finally(() => this.setState({loading: false}))
    }

    render() {
        const {movie, loading, errorMessage} = this.state
        const errorContent = errorMessage && <ErrorMessage/>
        const loadingContent = loading && <Spinner/>
        const modalContent = !(errorMessage || loading) && <ModalContent movie={movie}/>
        return (
            <div className='movieinfo'>
                {errorContent}
                {loadingContent}
                {modalContent}
            </div>
        )
    }
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