import React, { Component } from 'react';

class ModalHeader extends Component {
    render() { 
        return (
            <div className="modal-footer">
                <button type="button" className="btn btn-light" data-dismiss="modal" disabled={this.props.disableClose ? this.props.disableClose : false}>{this.props.buttonText ? this.props.buttonText : "Cancel"}</button>
                {this.props.children}
            </div>
        );
    }
}
 
export default ModalHeader;