import React, { Component } from 'react';

// Services
import ClassService from '../../../../services/ClassService';

// UI Components
import Modal from '../../../ui-elements/Modal';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';
import ErrorAlert from '../../../ui-elements/ErrorAlert';

class EditMajorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name ? this.props.name : "",
            isUpdating: false,
            showErrorAlert: false,
            errorAlertMessage: ""
        }
        
        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.onSaveChangesClicked = this.onSaveChangesClicked.bind(this)
    }

    handleChange(event) {
        let {name, value} = event.target;

        // Convert prefix to uppercase
        if (name === 'prefix' && !/^[a-zA-Z()]*$/.test(value)) value = this.state.prefix;
        else if (name === 'prefix') value = value.toUpperCase();
        this.setState({
            [name]: value
        });
    }

    closeModal(modalId) {
        window.$(() => {
            window.$(modalId).modal('toggle');
         });
    }

    showErrorAlert(message) {
        this.setState({
            showErrorAlert: true,
            errorAlertMessage: message
        });
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({name: props.name})
    }

    onSaveChangesClicked(e) {
        e.preventDefault();
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        ClassService.updateMajor(this.props.majorId, this.state.name)
            .then((res) => {
                this.props.success();
                this.closeModal(`#editMajorModal-${this.props.majorId}`);
                this.setState({isUpdating: false, prefix: "", name: ""});
            })
            .catch((res, err) =>{
                if (err.response.status === 409) { 
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#editMajorModal-${this.props.majorId}`);
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`editMajorModal-${this.props.majorId}`}>
                <ModalHeader title={`Create new major`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <input type="hidden" name="originalPrefix" value={this.state.originalPrefix}/>
                            <div className="form-group">
                                <label htmlFor="username">Name</label>
                                <input className="form-control" name="name" placeholder="Major Name" value={this.state.name} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                            </div>
                        </div>
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating}>Create</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default EditMajorModal;