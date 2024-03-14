//Todo: Class Constructor
import {useHttp} from "../hooks/use-http.js";
// Todo: endi MovieService ni hook ga aylantirdik va useHttp custom hookni import qilib ishlatdik
const useMovieService = () => {
    //Todo: Variables
    const _apiBase = 'https://api.themoviedb.org/3/movie'
    const _apiLng = 'language=en-US'
    const _apiKey = 'api_key=4903385fd9c411f1dbf7393aa4aba6d6'
    const _apiImg = 'https://image.tmdb.org/t/p/original'
    const _apiPage = 1

    const {request, loading, error, clearError} = useHttp()
    //Todo: Methods
    const getPopularMovies = async () => {
        // shu method orqali universal method ga murojaat qilib yoki xato olamiz yoki javob {}
        // method dagi url ko'p takrorlanvotti shuni alohida ozgaruvchiga olib chiqamiz
        return await request(`${_apiBase}/popular?${_apiLng}&${_apiKey}`)
    }

    const getTrendingMovies = async (page = _apiPage) => {
        const response = await request(`${_apiBase}/top_rated?${_apiLng}&page=${page}${_apiKey}`)
        const movies = response.results
        return movies && movies.map((movie) => _transformMovie(movie))
    }

    const getDetailedMovie = async (id) => {
        const response = await request(`${_apiBase}/${id}?${_apiLng}&${_apiKey}`)
        return _transformMovie(response)
    }

    const getRandomMovie = async () => {
        const res = await getPopularMovies()
        const movie = res.results[Math.floor(Math.random() * res.results.length)]
        return _transformMovie(movie)
    }

    //   Todo: bunga teyma dasturchi loyiha buzulib ketadi
    const _transformMovie = (movie) => {
        return {
            name: movie.original_title,
            description: movie.overview,
            backdrop_path: `${_apiImg}${movie.backdrop_path}`,
            poster_path: `${_apiImg}${movie.poster_path}`,
            id: movie.id,
            release_date: movie.release_date,
            vote_average: movie.vote_average
        }
    }
    return {
        getPopularMovies,
        getTrendingMovies,
        getDetailedMovie,
        getRandomMovie,
        clearError,
        error,
        loading
    }
}

export default useMovieService