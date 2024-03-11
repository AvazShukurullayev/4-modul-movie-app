import './row-movies-item.scss'
import PropTypes from "prop-types";

const RowMoviesItem = ({movie, onOpen}) => {
    return (
        <div className='list__item' onClick={() => onOpen(movie.id)}>
            <img src={movie.poster_path} alt={movie.name}/>
            <h2>
                {movie.name.length > 18 ? `${movie.name.slice(0, 18)}...` : movie.name}
            </h2>
            <div className='list__item-descr'>
                {/*Todo: date.svg qoyish kere*/}
                <p>{movie.release_date}</p>
                <div className='dot'/>
                <p>{movie.vote_average.toFixed(1)} iMDb</p>
                {/*Todo: star.svg qoyish kere*/}
            </div>
        </div>
    )
}
RowMoviesItem.propTypes = {
    movie: PropTypes.object,
    onOpen: PropTypes.func
}
export default RowMoviesItem
