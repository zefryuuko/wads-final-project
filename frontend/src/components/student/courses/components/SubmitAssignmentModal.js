import React, { Component } from 'react';

// Services
import ClassService from '../../../../services/ClassService';
import FileService from '../../../../services/FileService';

// UI Elements
import Modal from '../../../ui-elements/Modal';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';


class SubmitAssignmentModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isUpdating: false,
            submissionFile: undefined
        }

        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    closeModal(modalId) {
        window.$(() => {
            window.$(modalId).modal('toggle');
         });
    }

    handleChange(e) {
        this.setState({
            submissionFile: e.target.files
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({isUpdating: true});

        const submissionDate = new Date();
        const formattedDate = `${submissionDate.getFullYear()}${submissionDate.getMonth().length === 2 ? submissionDate.getMonth() : "0" + submissionDate.getMonth()}${submissionDate.getDate().length === 2 ? submissionDate.getDate() : "0" + submissionDate.getDate()}`
        // class-data/semesterId/B4AC/COMP6343/submissions/assignmentId
        const bucketName = `class-data/${this.props.semesterId}/${this.props.classCode}/${this.props.courseCode}/submissions/${this.props.id}`
        const file = this.state.submissionFile[0];
        const fileName = `${this.props.studentId}-${formattedDate}-${file.name}`; 
        FileService.uploadFile(bucketName, fileName, file, (firebaseURL => {
            ClassService.submitAssignment(
                this.props.semesterId,
                this.props.classCode,
                this.props.courseCode,
                this.props.id,
                {
                    universalId: this.props.studentId,
                    name: this.props.studentName,
                    submittedAt: submissionDate,
                    fileURL: firebaseURL
                }
            ).then(res => {
                if (this.props.onSuccess) this.props.onSuccess();
                this.closeModal(`#submitAssignment-${this.props.id}`)
            }).catch(err => {
                window.alert("An unexpected error happened during submission. Please try again.");
            })
        }));
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            isUpdating: false,
            submissionFile: undefined
        })
    }

    render() { 
        return (
            <Modal id={`submitAssignment-${this.props.id}`}>
                <ModalHeader title="Submit Assignment" disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <span className="form-control-plaintext">
                                Submit a file for "{this.props.assignmentName}" assignment.<br/>
                                You can re-upload your submission until the set deadline.
                            </span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="submissionFile">File</label>
                            <input type="file" name="submissionFile" accept=".zip,.rar,.gif,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.ppt,.pptx" className="form-control-file" onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                            <small className="form-control-plaintext">Supported formats: zip, rar, gif, jpg, jpeg, png, doc, docx, xls, xlsx, ppt, pptx</small>
                        </div>
                        <ModalFooter>
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating}>Submit</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default SubmitAssignmentModal;