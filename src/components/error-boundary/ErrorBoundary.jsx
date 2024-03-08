import React from "react";

class ErrorBoundary extends React.Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log("error => ", error)
        console.log("errorInfo => ", errorInfo)
        this.setState({error: true})
    }

    render() {
        if (this.state.error) {
            return <h2>Something went wrong...</h2>
        }
        return this.props.children
    }
}

export default ErrorBoundary