import React, { Component } from 'react';

class ModalBody extends Component {
    render() { 
        return (
            <div className="modal-body">
                {this.props.children}
            </div>
        );
    }
}
 
export default ModalBody;