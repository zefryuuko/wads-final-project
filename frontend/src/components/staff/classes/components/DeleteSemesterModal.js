import React, { Component } from 'react';

// Services
import ClassService from '../../../../services/ClassService';

// UI Elements
import Modal from '../../../ui-elements/Modal';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';


class DeleteSemesterModal extends Component {
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
        ClassService.deleteSemester(this.props.semesterId)
        .then(res => {
            this.closeModal(`#deleteSemesterModal-${this.props.semesterId}`)
            if (this.props.success) this.props.success();
        })
        .catch(err => {
            window.alert("An error has ocurred while trying to delete. Please try again.")
        });
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
            <Modal id={`deleteSemesterModal-${this.props.semesterId}`}>
                <ModalHeader title="Delete Semester"/>
                <ModalBody>
                    <p>Are you sure you want to delete <b>"{this.props.period} - {this.props.name}"</b>? This action is destructive and cannot be undone.</p>
                    <p>Removing a semester will also remove all classes bound to it.</p>
                    <p>
                        This semester is bound to {this.state.classes.length} {this.state.classes.length > 1 ? "classes" : "class"}.
                    </p>
                    <ul>
                        {this.state.classes.length > 0 ? this.state.classes.splice(0, this.state.classes.length > 5 ? 4 : this.state.classes.length).map(cls => {
                            return <li key={cls._id}>{cls.classCode} ({cls.metadata.class[0].code}) - {cls.metadata.name}</li>
                        })
                        : null}
                    </ul>
                    { this.state.classes.length > 5 ?
                        <p>and {this.state.classes.length - 5} more {this.state.classes.length - 5 > 1 ? "classes" : "class"}.</p>
                    : null}
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-danger" loading={this.state.isUpdating} onClick={this.deleteSemester}>Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
 
export default DeleteSemesterModal;