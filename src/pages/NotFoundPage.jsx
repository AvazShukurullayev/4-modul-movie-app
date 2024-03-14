import {Link} from "react-router-dom";

export const NotFoundPage = () => {
    return (
        <div style={{
            width: "100%",
            height: "65vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {/*<img src="/error.gif" alt="error"/>*/}
            <h1>Page not found</h1>
            <button className={"btn btn-secondary"} style={{marginTop: "20px"}}>
                <Link to={"/"}>
                    Home page
                </Link>
            </button>
        </div>
    )
}