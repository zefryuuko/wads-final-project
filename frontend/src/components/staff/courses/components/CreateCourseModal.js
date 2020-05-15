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

class CreateCourseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            name: "",
            description: "",
            scu: 1,
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
        CourseService.createCourse(this.props.prefix, `${this.props.prefix}${this.state.code}`, this.state.name, this.state.description, Number.parseInt(this.state.scu))
            .then((res) => {
                this.props.success();
                this.closeModal(`#createCourseModal`);
                this.setState({isUpdating: false, code: "", name: "", description: ""});
            })
            .catch((err) =>{
                if (err.response.status === 409) { 
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#createCourseModal`);
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`createCourseModal`}>
                <ModalHeader title={`Create new course`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <div className="form-group">
                                <label htmlFor="code">Code</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">{this.props.prefix}</div>
                                    </div>
                                    <input className="form-control" name="code" placeholder="Course ID Number" value={this.state.code} onChange={this.handleChange} pattern="[1-9]*" minLength="4" maxLength="4" disabled={this.state.isUpdating} required/>
                                    <small className="form-text text-muted">A course code consists of the course group prefix and four digit ID.</small>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input className="form-control" name="name" placeholder="Course Name" value={this.state.name} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                            </div>
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
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating}>Create</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default CreateCourseModal;