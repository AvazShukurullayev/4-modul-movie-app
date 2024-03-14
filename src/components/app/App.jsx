import Header from '../header/header'
import {Route, Routes} from "react-router-dom";
import {HomePage} from "../../pages/HomePage.jsx";
import {TvPage} from "../../pages/TvPage.jsx";
import {DetailedPage} from "../../pages/DetailedPage.jsx";
import {NotFoundPage} from "../../pages/NotFoundPage.jsx";

const App = () => {
    return (
        <div className='app'>
            <Header/>
            <Routes>
                <Route path={"/"} element={<HomePage />}/>
                <Route path={"/tv"} element={<TvPage />} />
                <Route path={"/movie/:movieId"} element={<DetailedPage />} />
                <Route path={"*"} element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}

export default App
