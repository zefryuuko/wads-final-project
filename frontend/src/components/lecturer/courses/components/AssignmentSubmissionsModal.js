import React, { Component } from 'react';

// UI Components
import Modal from '../../../ui-elements/Modal';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalFooter from '../../../ui-elements/ModalFooter';

class AssignmentSubmissionsModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        }
    }
    render() { 
        return ( 
            <Modal id={`assignmentSubmissions-${this.props.assignmentId}`} className="modal-lg">
                <ModalHeader title="Submissions"/>
                <ModalBody>
                    <div className="mb-2">Currently showing submissions for "{this.props.assignmentName}"</div>
                    <div className="table-responsive">
                        <table id={`assignmentTable-${this.props.assignmentId}`} className="table table-striped no-wrap">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>Student ID</th>
                                    <th>Name</th>
                                    <th>Date Submitted</th>
                                    <th>File</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.submissions && this.props.submissions.length > 0 ? this.props.submissions.map((submission, index) => {
                                    const submissionDate = new Date(submission.submittedAt);
                                    return <tr key={index}>
                                        <th scope="row">{submission.universalId}</th>
                                        <td>{submission.name}</td>
                                        <td>{submissionDate.toDateString()} - {`${submissionDate.toTimeString().split(" ")[0].substr(0, 5)}`}</td>
                                        <td style={{textAlign: "center", width: 20}}><a href={submission.fileURL}><i className="fas fa-download"/></a></td>
                                    </tr>
                                })
                                : <tr><td colSpan="4" style={{textAlign: "center"}}>No submissions</td></tr>}
                            </tbody>
                        </table>
                        {this.props.submissions ? 
                            <script>{window.loadTable(`#assignmentTable-${this.props.assignmentId}`)}</script>
                        : null}
                    </div>
                </ModalBody>
                <ModalFooter/>
            </Modal>
         );
    }
}
 
export default AssignmentSubmissionsModal;