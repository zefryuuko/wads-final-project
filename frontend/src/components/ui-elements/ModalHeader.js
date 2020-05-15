import React, { Component } from 'react';

class ModalHeader extends Component {
    render() { 
        return (
            <div className="modal-header">
                <h4 className="modal-title" id="myModalLabel">{this.props.title ? this.props.title : "missing 'title' property"}</h4>
                <button type="button" className="close" data-dismiss="modal"aria-hidden="true" disabled={this.props.disableClose ? this.props.disableClose : false}>×</button>
            </div>
        );
    }
}
 
export default ModalHeader;