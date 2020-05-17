import React, { Component } from 'react';

// Services
import CourseService from '../../../../services/CourseService';

// UI Components
import Modal from '../../../ui-elements/Modal';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';
import ErrorAlert from '../../../ui-elements/ErrorAlert';

class EditCourseLearningOutcomesModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learningOutcomeFields: this.props.data ? this.props.data : [""],
            isUpdating: false,
            showErrorAlert: false,
            errorAlertMessage: ""
        }
        
        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.onSaveChangesClicked = this.onSaveChangesClicked.bind(this);
        this.removeLO = this.removeLO.bind(this);
        this.addLO = this.addLO.bind(this);
    }

    handleChange(event) {
        let {id, value} = event.target;
        this.setState(prevState => {
            let lo = prevState.learningOutcomeFields;
            lo[id] = value;
            return lo;
        });
    }

    addLO() {
        this.setState(prevState => {
            return {
                learningOutcomeFields: [...prevState.learningOutcomeFields, ""]
            }
        })
    }
    
    removeLO(event) {
        event.preventDefault();
        let {id} = event.target;
        this.setState(prevState => {
            let lo = Array.from(prevState.learningOutcomeFields)
            lo.splice(id, 1);
            return { learningOutcomeFields: lo };
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
        CourseService.updateCourseLearningOutcomes(this.props.code, this.state.learningOutcomeFields)
            .then((res) => {
                this.props.success();
                this.closeModal(`#editLearningOutcomesModal`);
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                if (err.response.status === 409) { 
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#editLearningOutcomesModal`);
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`editLearningOutcomesModal`} className="modal-lg">
                <ModalHeader title={`Edit Learning Outcomes`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <div className="form-group">
                                {this.state.learningOutcomeFields.map((element, id) => {
                                    return (
                                        <div className="form-group" key={id}>
                                            <div className="float-left"><b>LO {id+1}</b></div>
                                            <div className="float-right"><a href="#remove-lo" className="text-danger" id={id} onClick={this.removeLO} disabled={this.state.isUpdating}>Remove</a></div>
                                            <textarea className="form-control" name={`lo-${id+1}`} id={id} type="input" value={element} onChange={this.handleChange} required/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="form-group">
                                <Button type="button" className="btn btn-block btn-secondary" onClick={this.addLO} disabled={this.state.isUpdating}>Add LO</Button>
                            </div>
                        </div>
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating}>Save Changes</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default EditCourseLearningOutcomesModal;