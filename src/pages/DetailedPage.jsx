import {useParams} from "react-router-dom";

export const DetailedPage = () => {
    const {movieId} = useParams()

    console.log(movieId)
    return (
        <div>
            <h1>Detailed page: {movieId}</h1>
        </div>
    )
}