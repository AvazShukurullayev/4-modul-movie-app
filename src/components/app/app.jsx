import {lazy, Suspense} from "react"
import {Route, Routes} from 'react-router-dom'
import Navbar from '../navbar/navbar'
import Spinner from "../spinner/spinner.jsx";

const HomePage = lazy(() => import("../../pages/home-page"))
const TrendingPage = lazy(() => import("../../pages/trending-page.jsx"))
const PopularPage = lazy(() => import("../../pages/popular-page"))
const DetailedPage = lazy(() => import("../../pages/detailed-page"))
const NotFoundPage = lazy(() => import("../../pages/not-found-page"))
const App = () => {
    return (
        <div className='app'>
            <Navbar/>
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/tranding' element={<TrendingPage/>}/>
                    <Route path='/popular' element={<PopularPage/>}/>
                    <Route path='/movie/:movieId' element={<DetailedPage/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Routes>
            </Suspense>
        </div>
    )
}

export default App
