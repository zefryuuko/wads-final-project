import React, { Component } from 'react';

// Services
import CourseService from '../../../../services/CourseService';

// UI Components
import Modal from '../../../ui-elements/Modal';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';
import ErrorAlert from '../../../ui-elements/ErrorAlert';

class DeleteCourseGroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prefix: this.props.prefix,
            name: this.props.name,
            isUpdating: false,
            showErrorAlert: false,
            errorAlertMessage: "",
            confirmationTextBox: ""
        }
        
        // Bind functions
        this.onSaveChangesClicked = this.onSaveChangesClicked.bind(this)
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        let {name, value} = event.target;

        // Convert prefix to uppercase
        if (name === 'confirmationTextBox' && !/^[a-zA-Z()]*$/.test(value)) value = this.state.confirmationTextBox;
        else if (name === 'confirmationTextBox') value = value.toUpperCase();
        this.setState({
            [name]: value
        });
    }

    onSaveChangesClicked(e) {
        e.preventDefault();
        if (this.state.prefix !== this.state.confirmationTextBox) return;
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        CourseService.deleteCourseGroup(this.state.prefix)
            .then((res) => {
                this.props.success();
                this.closeModal(`#deleteModal-${this.state.prefix}`);
                this.setState({isUpdating: false});
            })
            .catch((res, err) =>{
                if (err.response.status === 409) {
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal();
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`deleteModal-${this.state.prefix}`}>
                <ModalHeader title={`Delete ${this.state.prefix} - ${this.state.name}`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <input type="hidden" name="originalPrefix" value={this.state.prefix}/>
                            <p>Are you sure you would want to delete the course group {this.state.prefix} - {this.state.name}?<br/>This action is destructive and cannot be undone.</p>
                            <p>By deleting this course group, all courses that belongs to this group will be deleted. A class that already made with the courses will not be deleted.</p>
                            <div className="form-group">
                                <label htmlFor="confirmationTextBox">Enter the course group code to confirm</label>
                                <input className="form-control" name="confirmationTextBox" placeholder="Course Group Code" value={this.state.confirmationTextBox} onChange={this.handleChange} disabled={this.state.isUpdating} minLength="4" maxLength="4" required/>
                            </div>
                        </div>
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-danger" loading={this.state.isUpdating} disabled={this.state.confirmationTextBox !== this.state.prefix}>Delete Group</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default DeleteCourseGroupModal;