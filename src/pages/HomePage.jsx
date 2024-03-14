import ErrorBoundary from "../components/error-boundary/ErrorBoundary.jsx";
import Hero from "../components/hero/hero.jsx";
import RowMovies from "../components/row-movies/row-movies.jsx";

export const HomePage = () => {
    return (
        <>
            <ErrorBoundary>
                <Hero/>
            </ErrorBoundary>
            <ErrorBoundary>
                <RowMovies/>
            </ErrorBoundary>
        </>
    )
}