import React from 'react'
import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import './row-movies.scss'
import MovieService from "../../services/movie-service.js";
import ErrorMessage from "../error/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";

class RowMovies extends React.Component {
    state = {
        error: false,
        loading: false,
        open: false,
        movies: [],
        movieId: null,
        page: 2,
        loadPageLoading: false
    }
    movieService = new MovieService()


    componentDidMount() {
        console.log("Mount")
        this.getTrendingMovies()
    }

    onOpen = (id) => this.setState({open: true, movieId: id})

    onClose = () => this.setState({open: false})

    getTrendingMovies = (page) => {
        this.setState({loading: true})

        this.movieService.getTrendingMovies(page)
            .then((res) => this.setState(({movies}) => ({movies: [...movies, ...res]})))
            .catch(() => this.setState({error: true}))
            .finally(() => this.setState({loading: false, loadPageLoading: false}))
    }

    getLoadMore = () => {
        const {page} = this.state
        this.setState(({page}) => ({page: page + 1, loadPageLoading: true}))
        this.getTrendingMovies(page)
    }

    render() {
        const {error, loading, open, movies, movieId, loadPageLoading, page} = this.state

        const errorMessage = error && <ErrorMessage/>
        const loadingSpinner = loading && <Spinner/>
        const movieListContent = !(error || loading) && <MovieListContent movies={movies} onOpen={this.onOpen}/>
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
                {errorMessage}
                {loadingSpinner}
                {movieListContent}
                {/*Todo: load more button */}
                <div className="app__rowmovie-load">
                    <button className="btn btn-secondary btn-loading" onClick={this.getLoadMore}
                            disabled={loadPageLoading}>
                        <span>Load more</span>
                        {loadPageLoading && <Spinner width={"10px"}/>}</button>
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

const MovieListContent = ({movies, onOpen}) => {
    return (
        <div className='app__rowmovie-lists'>
            {movies.map(movie => (
                <RowMoviesItem
                    key={movie.id}
                    movie={movie}
                    onOpen={onOpen}
                />
            ))}
        </div>
    )
}
