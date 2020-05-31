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

class DeleteClassModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseCode: this.props.courseCode,
            classCode: this.props.classCode,
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
        if (name === 'confirmationTextBox' && !/^[a-zA-Z1-9()]*$/.test(value)) value = this.state.confirmationTextBox;
        else if (name === 'confirmationTextBox') value = value.toUpperCase();
        this.setState({
            [name]: value
        });
    }

    onSaveChangesClicked(e) {
        e.preventDefault();
        if (this.state.classCode !== this.state.confirmationTextBox) return;
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        CourseService.deleteClass(this.state.courseCode, this.state.classCode)
            .then((res) => {
                this.props.success();
                this.closeModal(`#deleteClassModal-${this.state.classCode}`);
                this.setState({isUpdating: false});
            })
            .catch((err) => {
                if (err.response.status === 409) {
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#deleteClassModal-${this.state.classCode}`);
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`deleteClassModal-${this.state.classCode}`}>
                <ModalHeader title={`Delete ${this.state.courseCode} - ${this.state.classCode}`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <input type="hidden" name="originalPrefix" value={this.state.courseCode}/>
                            <p>Are you sure you would want to delete the class {this.state.courseCode} - {this.state.classCode}?<br/>This action is destructive and cannot be undone.</p>
                            <p>Deleting this class will not delete the classes that are already made.</p>
                            <div className="form-group">
                                <label htmlFor="confirmationTextBox">Enter the course code to confirm</label>
                                <input className="form-control" name="confirmationTextBox" placeholder="Class Code" value={this.state.confirmationTextBox} onChange={this.handleChange} disabled={this.state.isUpdating} minLength="3" maxLength="3" required/>
                            </div>
                        </div>
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-danger" loading={this.state.isUpdating} disabled={this.state.confirmationTextBox !== this.state.classCode}>Delete Class</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default DeleteClassModal;