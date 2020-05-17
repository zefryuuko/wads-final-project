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

class EditCourseDescriptionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            scu: this.props.scu,
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

    onSaveChangesClicked(e) {
        e.preventDefault();
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        CourseService.updateCourseDescription(this.props.code, this.state.description,  Number.parseInt(this.state.scu))
            .then((res) => {
                this.props.success();
                this.closeModal(`#editCourseDescriptionModal`);
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                if (err.response.status === 409) { 
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#editCourseDescriptionModal`);
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`editCourseDescriptionModal`} className="modal-lg">
                <ModalHeader title={`Edit Course Description`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" name="description" placeholder="Course Description" value={this.state.description} onChange={this.handleChange} disabled={this.state.isUpdating} style={{minHeight: 200}} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="scu">SCU</label>
                                <input className="form-control" type="number" name="scu" placeholder="SCU" value={this.state.scu} onChange={this.handleChange} disabled={this.state.isUpdating} min="1" max="24" required/>
                            </div>
                        </div>
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating}>Save Changes</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default EditCourseDescriptionModal;