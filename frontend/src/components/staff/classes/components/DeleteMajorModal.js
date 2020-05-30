import React, { Component } from 'react';

// Services
import ClassService from '../../../../services/ClassService';

// UI Elements
import Modal from '../../../ui-elements/Modal';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';
import ErrorAlert from '../../../ui-elements/ErrorAlert';


class DeleteMajorModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isUpdating: false,
            showErrorAlert: false,
            errorAlertMessage: ""
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
        this.setState({isUpdating: true, showErrorAlert: false});
        ClassService.deleteMajor(this.props.majorId)
        .then(res => {
            this.closeModal(`#deleteMajorModal-${this.props.majorId}`)
            this.setState({isUpdating: false});
            if (this.props.success) this.props.success();
        })
        .catch(err => {
            this.setState({
                isUpdating: false,
                showErrorAlert: true,
                errorAlertMessage: err.response.data.message
            });
        });
    }

    componentDidMount() {

    }

    render() { 
        return ( 
            <Modal id={`deleteMajorModal-${this.props.majorId}`}>
                <ModalHeader title="Delete Semester"/>
                <ModalBody>
                    {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                    <p>Are you sure you want to delete <b>"{this.props.name}"</b>? This action is destructive and cannot be undone.</p>
                    <p>To prevent catastrophic mistake, deleting a major is only possible when it is not linked to any semester.</p>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-danger" loading={this.state.isUpdating} onClick={this.deleteSemester}>Delete</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
 
export default DeleteMajorModal;