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

class EditCourseGroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalPrefix: this.props.prefix,
            originalName: this.props.name,
            prefix: this.props.prefix,
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

    onSaveChangesClicked(e) {
        e.preventDefault();
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        CourseService.updateCourseGroup(this.state.originalPrefix, this.state.prefix, this.state.name)
            .then((res) => {
                if (this.props.redirectOnSuccess) this.setState({redirect: this.props.redirectOnSuccess});
                this.props.success();
                this.closeModal(`#editModal-${this.state.prefix}`);
                this.setState({isUpdating: false});
            })
            .catch(err =>{
                if (err.response.status === 409) {
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#editModal-${this.state.prefix}`);
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`editModal-${this.state.prefix}`}>
                {this.state.redirect ? <Redirect to={`${this.state.redirect}/${this.state.prefix}`}/> : null}
                <ModalHeader title={`Edit ${this.state.originalPrefix} - ${this.state.originalName}/${this.state.prefix}`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <input type="hidden" name="originalPrefix" value={this.state.originalPrefix}/>
                            <div className="form-group">
                                <label htmlFor="username">Code</label>
                                <input className="form-control" name="prefix" placeholder="CODE" value={this.state.prefix} onChange={this.handleChange} pattern="[a-zA-Z]*" minLength="4" maxLength="4" disabled={this.state.isUpdating} required/>
                                <small className="form-text text-muted">A code has to be 4 letters</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Name</label>
                                <input className="form-control" name="name" placeholder="Course Group Name" value={this.state.name} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                            </div>
                        </div>
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating}>Save changes</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default EditCourseGroupModal;