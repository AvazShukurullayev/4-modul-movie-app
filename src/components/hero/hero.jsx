import React from "react";
import './hero.scss'
import MovieService from "../../services/movie-service.js";

class Hero extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            backdrop_path: null,
            poster_path: null,
            id: null
        }
        this.movieService = new MovieService()
        this.getMovie()
    }

    getMovie = () => {
        this.movieService.getPopularMovies().then(res => {
            console.log(res)
            const movie = res.results[Math.floor(Math.random() * res.results.length)]
            this.setState({
                name: movie.original_title,
                description: movie.overview,
                backdrop_path: `${this.movieService._apiImg}${movie.backdrop_path}`,
                poster_path: `${this.movieService._apiImg}${movie.poster_path}`,
                id: movie.id
            })
        })
    }

    render() {
        const {name, description, backdrop_path} = this.state
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
            <div className='app__hero-moive'>
                <img src={backdrop_path} alt={name}/>
                <div className='app__hero-moive__descr'>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <div>
                        <button className='btn btn__secondary'>RANDOM MOVIE</button>
                        <button className='btn btn__primary'>DETAILS</button>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Hero
