import React, { Component } from 'react';

class ErrorAlert extends Component {
    render() { 
        return (
            <div className="alert alert-danger fade show" role="alert">
                {this.props.children}
            </div>
        );
    }
}
 
export default ErrorAlert;