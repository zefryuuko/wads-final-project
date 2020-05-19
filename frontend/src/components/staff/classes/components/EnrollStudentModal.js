import React, { Component } from 'react';

// Services


// UI Elements
import Modal from '../../../ui-elements/Modal';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalFooter from '../../../ui-elements/ModalFooter';
import UserService from '../../../../services/UserService';

class EnrollStudentModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentsList: [],
            enrolledStudentIds: this.props.enrolledStudents && this.props.enrolledStudents.length > 0 ? props.enrolledStudents.map(element => element.universalId) : [],
        }

        // Bind functions
        this.loadStudents = this.loadStudents.bind(this);
    }

    loadStudents() {
        UserService.getStudents()
        .then(res => {
            this.setState({studentsList : res})
        })
        .catch(err => {
            // Do something
        })
    }

    componentDidMount() {
        this.loadStudents();
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (props.enrolledStudents)
            this.setState({
                enrolledStudentIds: props.enrolledStudents.map(element => element.universalId)
            })
    }

    render() { 
        return (
            <Modal id="enrollStudentModal" className="modal-lg">
                <ModalHeader title="Enroll Students"/>
                <ModalBody>
                    <div className="table-responsive">
                        <table id="allStudentsList" className="table table-striped no-wrap">
                            <thead className="bg-secondary text-white">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.studentsList  && this.state.studentsList.length > 0 ? this.state.studentsList.map(row => {
                                    return (
                                        <tr>
                                            <th scope="row">{row.id}</th>
                                            <td>{row.firstName} {row.lastName}</td>
                                            <td><button className="btn btn-secondary" disabled={this.state.enrolledStudentIds.includes(row.id)}>{!this.state.enrolledStudentIds.includes(row.id) ? "Enroll" : "Enrolled"}</button></td>
                                        </tr>
                                    )
                                })
                                : null}
                            </tbody>
                        </table>
                    </div>
                    {this.state.studentsList.length > 0 ? <script>{ window.loadTable('#allStudentsList') }</script> : null}
                </ModalBody>
                <ModalFooter buttonText="Close"/>
            </Modal>
        );
    }
}
 
export default EnrollStudentModal;