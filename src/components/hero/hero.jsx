import React from "react";
import './hero.scss'
import MovieService from "../../services/movie-service.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../error/ErrorMessage.jsx";

class Hero extends React.Component {
    state = {
        movie: {},
        loading: true,
        error: false

    }
    movieService = new MovieService()

    componentDidMount() {
        this.getMovie()
    }

    getMovie = () => {
        this.movieService.getRandomMovie()
            .then(res => this.setState({movie: res}))
            .catch(() => this.setState({error: true}))
            .finally(() => this.setState({loading: false}))
    }

    render() {
        const {movie, loading, error} = this.state
        const errorContent = error ? <ErrorMessage/> : null
        const loadingContent = loading ? <Spinner/> : null
        const movieContent = !(error || loading) ? <Content movie={movie}/> : null
        return (<div className='app__hero'>
            <div className='app__hero-info'>
                <h2>FIND MOVIES</h2>
                <h1>TV shows and more</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                    sapiente sit placeat minus dolorum, magnam, tempora quas neque quasi,
                    sequi odit doloremque velit saepe autem facilis! Laudantium
                    consequatur accusantium mollitia.
                </p>
                <button className='btn btn__primary'>DETAILS</button>
            </div>
            {/*Todo: loading spinner*/}
            <div className='app__hero-moive'>
                {errorContent}
                {loadingContent}
                {movieContent}
            </div>
        </div>)
    }
}

export default Hero

const Content = ({movie}) => {
    return (<>
        <img src={movie.backdrop_path} alt={movie.name}/>
        <div className='app__hero-moive__descr'>
            <h2>{movie.name}</h2>
            <p>{movie.description && movie.description.length > 250 ? `${movie.description.slice(0, 250)}...` : movie.description}</p>
            <div>
                <button className='btn btn__secondary'>RANDOM MOVIE</button>
                <button className='btn btn__primary'>DETAILS</button>
            </div>
        </div>
    </>)
}