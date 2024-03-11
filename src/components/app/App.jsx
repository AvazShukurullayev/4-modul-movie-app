import Header from '../header/header'
import Hero from '../hero/hero'
import RowMovies from '../row-movies/row-movies'
import ErrorBoundary from "../error-boundary/ErrorBoundary.jsx";

const App = () => {
    return (
        <div className='app'>
            <Header/>
            <ErrorBoundary>
                <Hero/>
            </ErrorBoundary>
            <ErrorBoundary>
                <RowMovies/>
            </ErrorBoundary>
        </div>
    )
}

export default App
