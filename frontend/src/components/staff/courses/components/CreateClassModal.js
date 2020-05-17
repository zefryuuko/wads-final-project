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

class CreateClassModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classCode: "",
            courseCode: this.props.code,
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

        if (name === 'classCode' && !/^[a-zA-Z()]*$/.test(value)) value = this.state.classCode;
        else if (name === 'classCode') value = value.toUpperCase();
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
        CourseService.createClass(this.state.courseCode, this.state.classCode)
            .then((res) => {
                if (this.props.redirectOnSuccess) this.setState({redirect: this.props.redirectOnSuccess});
                this.props.success();
                this.closeModal(`#createClassModal`);
                this.setState({isUpdating: false, classCode: ""});
            })
            .catch(err =>{
                if (err.response.status === 404) {
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#createClassModal`);
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`createClassModal`}>
                {this.state.redirect ? <Redirect to={`${this.state.redirect}/${this.state.prefix}${this.state.code}`}/> : null}
                <ModalHeader title={`Create new class`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <div className="form-group">
                                <label htmlFor="name">Class Code</label>
                                <input className="form-control" name="classCode" placeholder="Class Code" value={this.state.classCode} pattern="[a-zA-Z]*" minLength="3" maxLength="3" onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                                <small>Class code consists of 3 letters and has to be unique for each course.</small>
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
 
export default CreateClassModal;