import React, { Component } from 'react';

// Services
import ClassService from '../../../../services/ClassService';

// UI Elements
import Modal from '../../../ui-elements/Modal';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';


class DeleteClassModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isUpdating: false,
            classes: []
        }

        // Bind functions
        this.deleteSemester = this.deleteSemester.bind(this);
    }

    closeModal(modalId) {
        window.$(() => {
            window.$(modalId).modal('toggle');
         });
    }

    deleteSemester() {
        this.setState({isUpdating: true});
        ClassService.deleteClass(this.props.semesterId, this.props.classCode, this.props.courseCode)
        .then(res => {
            this.closeModal(`#deleteClassModal-${this.props.classId}`)
            if (this.props.success) this.props.success();
        })
        .catch(err => {
            window.alert("An error has ocurred while trying to delete. Please try again.")
        });
    }

    UNSAFE_componentWillReceiveProps(props) {
        if (!this.props.semesterId) return;

        ClassService.getClasses(this.props.semesterId, 1)
        .then(res => {
            if (!res.classes) return;

            this.setState({
                classes: res.classes
            })
        })
    }

    componentDidMount() {
        if (!this.props.semesterId) return;

        ClassService.getClasses(this.props.semesterId, 1)
        .then(res => {
            if (!res.classes) return;

            this.setState({
                classes: res.classes
            })
        })
    }

    render() { 
        return ( 
            <Modal id={`deleteClassModal-${this.props.classId}`}>
                <ModalHeader title="Delete Class"/>
                <ModalBody>
                    <p>Are you sure you want to delete <b>"{this.props.classCode}/{this.props.courseCode}  - {this.props.courseName}"</b>? This action is destructive and cannot be undone.</p>
                    <p>Students and lecturers bound to this class will not be able to access the class after deletion.</p>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-danger" loading={this.state.isUpdating} onClick={this.deleteSemester}>Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
 
export default DeleteClassModal;