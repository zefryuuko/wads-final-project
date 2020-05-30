import React, { Component } from 'react';
import DatePicker from "react-datepicker";

// Services
import ClassService from '../../../../services/ClassService';
import FileService from '../../../../services/FileService';

// Components
import Modal from '../../../ui-elements/Modal';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';

// CSS
import "react-datepicker/dist/react-datepicker.css";

class AddAssignmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            assignmentName: "",
            assignmentDateAdded: new Date(),
            submissionDeadline: new Date(),
            resourceAuthorName: this.props.authorName,
            resourceType: "file",
            resourceFile: undefined,
            resourceURL: undefined,
            isUpdating: false
        }

        // Bind functions
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    closeModal(modalId) {
        window.$(() => {
            window.$(modalId).modal('toggle');
         });
    }

    onChangeHandler(e) {
        let { name, id, value } = e.target;
        
        // Handle radio button input
        if (name === "resourceType") {
            if (id === "assignmentResourceTypeFile") {
                value = "file";
            } else {
                value = "URL";
            }
        } else if (name === 'resourceFile') {
            value = e.target.files
        }

        this.setState({
            [name]: value
        });
    }

    handleDateTimeChange(date) {
        this.setState({
            submissionDeadline: date
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({isUpdating: true});
        if (this.state.resourceType === "URL") {
            this.submitData({
                dateAdded: new Date(),
                submissionDeadline: this.state.submissionDeadline,
                name: this.state.assignmentName,
                resourceURL: (!this.state.resourceURL.match(/^[a-zA-Z]+:\/\//)) ? 'http://' + this.state.resourceURL : this.state.resourceURL
            });
        } else {
            const bucketName = `class-data/${this.props.semesterId}/${this.props.classCode}/${this.props.courseCode}/assignment-questions`;
            const file = this.state.resourceFile[0];
            const date = `${this.state.assignmentDateAdded.getFullYear()}${this.state.assignmentDateAdded.getMonth().length === 2 ? this.state.assignmentDateAdded.getMonth() : "0" + this.state.assignmentDateAdded.getMonth()}${this.state.assignmentDateAdded.getDate().length === 2 ? this.state.assignmentDateAdded.getDate() : "0" + this.state.assignmentDateAdded.getDate()}`
            const fileName = `${date}-${this.props.authorUniversalId}-${file.name}`;
            FileService.uploadFile(bucketName, fileName, file, (firebaseURL) => {
                this.submitData({
                    dateAdded: new Date(),
                    submissionDeadline: this.state.submissionDeadline,
                    name: this.state.assignmentName,
                    resourceURL: firebaseURL
                });
            });
        }
    }

    submitData(data) {
        ClassService.createAssignment(
            this.props.semesterId,
            this.props.classCode,
            this.props.courseCode,
            data
        )
        .then(res => {
            // Reset state
            this.setState({
                assignmentName: "",
                assignmentDateAdded: new Date(),
                resourceAuthorName: this.props.authorName,
                resourceType: "file",
                resourceURL: "",
                isUpdating: false
            });

            // Call parent refresh function
            if (this.props.onSuccess) this.props.onSuccess();

            this.closeModal('#addAssignmentModal');
        })
        .catch(err => {

        });
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            assignmentName: "",
            assignmentDateAdded: new Date(),
            resourceType: "file",
            resourceURL: "",
            isUpdating: false
        });
    }

    render() { 
        return (
            <Modal id="addAssignmentModal">
                <ModalHeader title="Add new assignment"/>
                <ModalBody>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="assignmentName">Name</label>
                            <input type="input" name="assignmentName" placeholder="Assignment Name" className="form-control" onChange={this.onChangeHandler} disabled={this.state.isUpdating} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="submissionDeadline" style={{display: "block"}}>Deadline</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">Date & Time</div>
                                </div>
                                <DatePicker className="form-control w-100" name="submissionDeadline" id="submissionDeadline" selected={this.state.submissionDeadline} onChange={this.handleDateTimeChange} showTimeSelect dateFormat="Pp" minDate={new Date()} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label style={{display: "block"}}>Resource Type</label>
                            <div className="form-check form-check-inline">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="assignmentResourceTypeFile" name="resourceType" className="custom-control-input" onChange={this.onChangeHandler} checked={this.state.resourceType === "file"}/>
                                    <label className="custom-control-label" htmlFor="assignmentResourceTypeFile">File</label>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="assignmentResourceTypeURL" name="resourceType" className="custom-control-input" onChange={this.onChangeHandler} checked={this.state.resourceType === "URL"}/>
                                    <label className="custom-control-label" htmlFor="assignmentResourceTypeURL" disabled={this.state.isUpdating}>URL</label>
                                </div>
                            </div>
                        </div>
                        {/* Display input depending on resource type */}
                        {this.state.resourceType === "file" ?
                            <div className="form-group">
                                <label htmlFor="resourceFile" disabled={this.state.isUpdating}>Task File</label>
                                <input type="file" name="resourceFile" className="form-control-file" onChange={this.onChangeHandler} disabled={this.state.isUpdating} required/>
                            </div>
                        :
                            <div className="form-group">
                                <label htmlFor="resourceURL" disabled={this.state.isUpdating}>Task URL</label>
                                <input type="input" name="resourceURL" placeholder="https://example.com/resource/file" className="form-control" value={this.state.resourceURL} onChange={this.onChangeHandler} disabled={this.state.isUpdating} required/>
                            </div>
                        }
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating}>Submit</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default AddAssignmentModal;