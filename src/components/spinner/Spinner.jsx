import "./spinner.scss"
import PropTypes from "prop-types";

const Spinner = ({width = "50px"}) => {
    return (
        <div className="center">
            <div className="loader" style={{width}}></div>
        </div>
    )
}
Spinner.propTypes = {
    width: PropTypes.string
}
export default Spinner