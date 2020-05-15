import React, { Component } from 'react';

class Modal extends Component {
    render() { 
        return (
            <div id={this.props.id} className="modal fade" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Modal;