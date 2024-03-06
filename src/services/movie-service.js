class MovieService {
    _apiBase = 'https://api.themoviedb.org/3/movie'
    _apiLng = 'language=en-US'
    _apiKey = 'api_key=4903385fd9c411f1dbf7393aa4aba6d6'
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
        return this.getResources(`${this._apiBase}/popular?${this._apiLng}&${this._apiKey}`)
    }

    getTrandingMovies = async () => {
        return this.getResources(`${this._apiBase}/top_rated?${this._apiLng}&${this._apiKey}`)
    }

    getDetailed = async (id) => {
        return this.getResources(`${this._apiBase}/${id}?${this._apiLng}&${this._apiKey}`)
    }

}

export default MovieService