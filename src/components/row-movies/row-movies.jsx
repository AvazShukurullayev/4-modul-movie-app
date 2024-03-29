import {useEffect, useState} from 'react'
import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import './row-movies.scss'
import MovieService from "../../services/movie-service.js";
import ErrorMessage from "../error/ErrorMessage.jsx";
import Spinner from "../spinner/Spinner.jsx";
import PropTypes from "prop-types";
import useMovieService from "../../services/movie-service.js";

const RowMovies = () => {
    const [open, setOpen] = useState(false)
    const [movies, setMovies] = useState([])
    const [movieId, setMovieId] = useState(null)
    const [page, setPage] = useState(2)
    const [loadPageLoading, setLoadPageLoading] = useState(false)

    const {getTrendingMovies, error, loading} = useMovieService()

    const onOpen = (id) => {
        setOpen(true)
        setMovieId(id)
    }

    const onClose = () => setOpen(false)

// Todo: we'll comeback setMovies(state=>([...state, ...res]))
    const getMovies = (page) => {
        getTrendingMovies(page)
            .then((res) => setMovies(res))
            .finally(() => setLoadPageLoading(false))
    }

    const getLoadMore = () => {
        setPage(page => page + 1)
        setLoadPageLoading(true)
        getMovies(page)
    }

    const errorMessage = error && <ErrorMessage/>
    const loadingSpinner = loading && <Spinner/>

    useEffect(() => {
        getMovies()
    }, []);

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

            <MovieListContent movies={movies} onOpen={onOpen}/>
            {/*Todo: load more button */}
            <div className="app__rowmovie-load">
                <button className="btn btn-secondary btn-loading" onClick={getLoadMore}
                        disabled={loadPageLoading}>
                    <span>Load more</span>
                    {loadPageLoading && <Spinner width={"10px"}/>}</button>
            </div>
            {/*Todo: modal oyna bilan ishlimiz*/}
            <Modal open={open} onClose={onClose}>
                <MovieInfo movieId={movieId}/>
            </Modal>
        </div>
    )
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

MovieListContent.propTypes = {
    movies: PropTypes.array,
    onOpen: PropTypes.func
}
