import React from 'react';

class Preloader extends React.Component {
    render() {
        return (
            <div className="preloader">
                <div classame="lds-ripple">
                    <div className="lds-pos"></div>
                    <div className="lds-pos"></div>
                </div>
            </div>
        );
    }
}

export default Preloader;