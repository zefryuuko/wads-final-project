
import React, { Component } from 'react';

class ContentWrapper extends Component {
    render() { 
        return (
            <div className="container-fluid">
                {this.props.children}
            </div>
        );
    }
}
 
export default ContentWrapper;