//Todo: Class Constructor
class MovieService {
    //Todo: Variables
    _apiBase = 'https://api.themoviedb.org/3/movie'
    _apiLng = 'language=en-US'
    _apiKey = 'api_key=4903385fd9c411f1dbf7393aa4aba6d6'
    _apiImg = 'https://image.tmdb.org/t/p/original'

    //Todo: Methods
    getResources = async (url) => {
        // bu universal method boldi bu method bizga yo xato qaytardi yoki javob{} qaytaradi
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTAzMzg1ZmQ5YzQxMWYxZGJmNzM5M2FhNGFiYTZkNiIsInN1YiI6IjY1ZThiMGMwOTYzODY0MDE0NmM4NDYwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DnWH9dvNYILPto9IQnwrW7mEBtiwPloHN6mLizKVsRE'
            }
        })
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`)
        }
        return await response.json()
    }

    getPopularMovies = async () => {
        // shu method orqali universal method ga murojaat qilib yoki xato olamiz yoki javob {}
        // method dagi url ko'p takrorlanvotti shuni alohida ozgaruvchiga olib chiqamiz
        return await this.getResources(`${this._apiBase}/popular?${this._apiLng}&${this._apiKey}`)
    }

    getTrendingMovies = async () => {
        const response = await this.getResources(`${this._apiBase}/top_rated?${this._apiLng}&${this._apiKey}`)
        const movies = response.results
        return movies && movies.map((movie) => this._transformMovie(movie))
    }

    getDetailedMovie = async (id) => {
        const response = await this.getResources(`${this._apiBase}/${id}?${this._apiLng}&${this._apiKey}`)
        return this._transformMovie(response)
    }

    getRandomMovie = async () => {
        const res = await this.getPopularMovies()
        const movie = res.results[Math.floor(Math.random() * res.results.length)]
        return this._transformMovie(movie)
    }

    //   Todo: bunga teyma dasturchi loyiha buzulib ketadi
    _transformMovie = (movie) => {
        return {
            name: movie.original_title,
            description: movie.overview,
            backdrop_path: `${this._apiImg}${movie.backdrop_path}`,
            poster_path: `${this._apiImg}${movie.poster_path}`,
            id: movie.id,
            release_date: movie.release_date,
            vote_average: movie.vote_average
        }
    }
}

export default MovieService