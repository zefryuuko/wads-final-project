import React, { Component } from 'react';

class Success extends Component {
    render() { 
        return (
            <div className="alert alert-success fade show" role="alert">
                {this.props.children}
            </div>
        );
    }
}
 
export default Success;