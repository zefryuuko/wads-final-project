import React, { Component } from 'react';

// Services
import UserService from '../../../../services/UserService';

// UI Elements
import Modal from '../../../ui-elements/Modal';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalFooter from '../../../ui-elements/ModalFooter';

class EnrollLecturerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentsList: [],
            enrolledStudentIds: this.props.enrolledStudents && this.props.enrolledStudents.length > 0 ? props.enrolledStudents.map(element => element.universalId) : [],
        }

        // Bind functions
        this.loadStudents = this.loadStudents.bind(this);
        this.enrollStudent = this.enrollStudent.bind(this);
    }

    loadStudents() {
        UserService.getLecturers()
        .then(res => {
            this.setState({studentsList : res})
        })
        .catch(err => {
            // Do something
        })
    }

    enrollStudent(e) {
        let { id } = e.target;
        id = id.split("_");
        this.props.enrollStudent(id[0], id[1]);
        this.setState(prevState => { return { enrolledStudentIds: [...prevState.enrolledStudentIds, id[0]] } } )
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
            <Modal id="enrollLecturerModal" className="modal-lg">
                <ModalHeader title="Enroll Lecturers"/>
                <ModalBody>
                    <div className="table-responsive">
                        <table id="allLecturersList" className="table table-striped no-wrap">
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
                                        <tr key={row.id}>
                                            <th scope="row">{row.id}</th>
                                            <td>{row.firstName} {row.lastName}</td>
                                            <td><button className="btn btn-secondary" id={`${row.id}_${row.firstName} ${row.lastName}`} onClick={this.enrollStudent} disabled={this.state.enrolledStudentIds.includes(row.id)}>{!this.state.enrolledStudentIds.includes(row.id) ? "Enroll" : "Enrolled"}</button></td>
                                        </tr>
                                    )
                                })
                                : null}
                            </tbody>
                        </table>
                    </div>
                    {this.state.studentsList.length > 0 ? <script>{ window.loadTable('#allLecturersList') }</script> : null}
                </ModalBody>
                <ModalFooter buttonText="Close"/>
            </Modal>
        );
    }
}
 
export default EnrollLecturerModal;