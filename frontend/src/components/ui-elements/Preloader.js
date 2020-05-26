import React from 'react';

class Preloader extends React.Component {
    constructor(props) {
        super(props);

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}
    }

    render() {
        return (
            <div className="ease-on-load" style={!this.props.isLoading ? this.loadingStyle : this.loadedStyle}>
                <div className="lds-ripple">
                    <div className="lds-pos"></div>
                    <div className="lds-pos"></div>
                </div>
            </div>
        );
    }
}

export default Preloader;