import React from 'react'
import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import './row-movies.scss'
import MovieService from "../../services/movie-service.js";

class RowMovies extends React.Component {
    state = {
        open: false,
        movies: [],
        movieId: null
    }
    movieService = new MovieService()


    componentDidMount() {
        console.log("Mount")
        this.getTrendingMovies()
    }

    onOpen = (id) => this.setState({open: true, movieId: id})

    onClose = () => this.setState({open: false})

    getTrendingMovies = () => {
        this.movieService.getTrendingMovies().then((res) => this.setState({movies: res}))
    }

    render() {
        const {open, movies, movieId} = this.state

        return (
            <div className='app__rowmovie'>
                <div className='app__rowmovie-top'>
                    <div className='app__rowmovie-top__title'>
                        <img src='/tranding.svg' alt=''/>
                        <h1>Trending</h1>
                    </div>
                    <div className='hr'/>
                    <a href='#'>See more</a>
                </div>

                <div className='app__rowmovie-lists'>
                    {movies.map(movie => (
                        <RowMoviesItem
                            key={movie.id}
                            movie={movie}
                            onOpen={this.onOpen}
                        />
                    ))}
                </div>

                {/*Todo: modal oyna bilan ishlimiz*/}
                <Modal open={open} onClose={this.onClose}>
                    <MovieInfo movieId={movieId}/>
                </Modal>
            </div>
        )
    }
}

export default RowMovies
