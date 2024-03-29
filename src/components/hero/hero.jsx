import {useEffect, useState} from "react";
import './hero.scss'
import MovieService from "../../services/movie-service.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error/ErrorMessage.jsx";
import PropTypes from "prop-types";
import useMovieService from "../../services/movie-service.js";
import {useNavigate} from "react-router-dom";

const Hero = () => {
    // States
    const [movie, setMovie] = useState(null)
    // Todo: useMovieService chaqiramiz
    const {getRandomMovie, loading, error, clearError} = useMovieService()

    function updateMovie() {
        clearError()
        getRandomMovie().then(res => setMovie(res))
    }

    const errorContent = error ? <ErrorMessage/> : null
    const loadingContent = loading ? <Spinner/> : null
    const movieContent = !(error || loading || !movie) ? <Content movie={movie}/> : null

    useEffect(() => {
        updateMovie()
    }, []);

    return (
        <div className='app__hero'>
            <div className='app__hero-info'>
                <h2>FIND MOVIES</h2>
                <h1>TV shows and more</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                    sapiente sit placeat minus dolorum, magnam, tempora quas neque quasi,
                    sequi odit doloremque velit saepe autem facilis! Laudantium
                    consequatur accusantium mollitia.
                </p>
                <div className={"app__hero-btns"}>
                    <button className='btn btn__secondary' onClick={updateMovie}>Random movie</button>
                </div>
            </div>
            {/*Todo: loading spinner*/}
            <div className='app__hero-moive'>
                {errorContent}
                {loadingContent}
                {movieContent}
            </div>
        </div>
    )
}

export default Hero

const Content = ({movie}) => {
    const navigate = useNavigate()
    return (
        <>
            <img src={movie.backdrop_path} alt={movie.name}/>
            <div className='app__hero-moive__descr'>
                <h2>{movie.name}</h2>
                <p>{movie.description && movie.description.length > 250 ? `${movie.description.slice(0, 250)}...` : movie.description}</p>
                <button
                    className='btn btn__primary'
                    style={{width: "100%"}}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                >
                    DETAILS
                </button>
            </div>
        </>
    )
}

Content.propTypes = {
    movie: PropTypes.object
}