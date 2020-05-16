import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

// Services
import CourseService from '../../../../services/CourseService';

// UI Components
import Modal from '../../../ui-elements/Modal';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';
import ErrorAlert from '../../../ui-elements/ErrorAlert';

class EditCourseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalCode: this.props.code,
            originalName: this.props.name,
            prefix: this.props.code ? this.props.code.substring(0, 4) : "",
            code: this.props.code ? this.props.code.substring(4) : "",
            name: this.props.name,
            isUpdating: false,
            showErrorAlert: false,
            errorAlertMessage: "",
            redirect: undefined,
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
        CourseService.updateCourse(this.state.originalCode, `${this.state.prefix}${this.state.code}`, this.state.name)
            .then((res) => {
                if (this.props.redirectOnSuccess) this.setState({redirect: this.props.redirectOnSuccess});
                this.props.success();
                this.closeModal(`#editModal-${this.state.originalCode}`);
                this.setState({isUpdating: false});
            })
            .catch(err =>{
                if (err.response.status === 409) {
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#editModal-${this.state.originalCode}`);
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`editModal-${this.state.originalCode}`}>
                {this.state.redirect ? <Redirect to={`${this.state.redirect}/${this.state.prefix}`}/> : null}
                <ModalHeader title={`Edit ${this.state.originalCode} - ${this.state.originalName}`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <div className="form-group">
                                <label htmlFor="code">Code</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">{this.state.prefix}</div>
                                    </div>
                                    <input className="form-control" name="code" placeholder="Course ID Number" value={this.state.code} onChange={this.handleChange} pattern="[0-9]*" minLength="4" maxLength="4" disabled={this.state.isUpdating} required/>
                                    <small className="form-text text-muted">A course code consists of the course group prefix and four digit ID.</small>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input className="form-control" name="name" placeholder="Course Name" value={this.state.name} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
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
 
export default EditCourseModal;