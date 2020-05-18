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

// CSS
import '../../../ui-elements/LearningOutcomes.css';

class EditEvaluationModal extends Component {
    constructor(props) {
        super(props);

        // Create array elements if LO is more than current checkboxes
        this.loCount = this.props.loData.length;
        let evaluationFields = JSON.parse(JSON.stringify(this.props.data));
        if (evaluationFields.length > 0) {
            if (evaluationFields[0].evaluatedLearningOutcomes.length < this.loCount) {
                // Create array with data to add
                let appendArr = [];
                for (let i = 0; i < this.loCount - evaluationFields[0].evaluatedLearningOutcomes.length; i++) {
                    appendArr.push(false);
                }
                // Append array values
                evaluationFields.map((element, index) => {
                    element.evaluatedLearningOutcomes = element.evaluatedLearningOutcomes.concat(Array.from(appendArr));
                    return element;
                } );
            }
        }

        
        this.state = {
            learningOutcomeFields: this.props.loData ? this.props.loData : [""],
            evaluationFields: evaluationFields ? Array.from(evaluationFields) : [],
            isUpdating: false,
            showErrorAlert: false,
            errorAlertMessage: ""
        }
        
        
        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.onSaveChangesClicked = this.onSaveChangesClicked.bind(this);
        this.removeEval = this.removeEval.bind(this);
        this.addEval = this.addEval.bind(this);
    }

    handleCheckbox(divId, setTo) {
        divId = divId.split("-");
        this.setState(({evaluationFields}) => {
            let ev = Array.from(evaluationFields);
            ev[divId[0]].evaluatedLearningOutcomes[divId[1]] = setTo;
            return { evaluationFields: ev, lastSelectedCheckbox: divId }
        });
    }

    handleChange(event) {
        // event.preventDefault();

        let {id, name, value} = event.target;
        id = id.split("-");
        this.setState(prevState => {
            let ev = Array.from(prevState.evaluationFields);
            if (id.length === 1) {   // Modify fields
                ev[id[0]][name] = value;
            } else {                // Modify checkboxes
                ev[id[0]].evaluatedLearningOutcomes[id[1]] = !ev[id[0]].evaluatedLearningOutcomes[id[1]];
            }
            return { evaluationFields: ev }
        });
    }

    addEval() {
        this.setState(prevState => {
            let newLoArr = [];
            for (let i = 0; i < this.loCount; i++) {
                newLoArr.push(false)
            }
            return {
                evaluationFields: [...prevState.evaluationFields, {
                    name: "",
                    weight: 1,
                    evaluatedLearningOutcomes: Array.from(newLoArr)
                }]
            }
        })
    }
    
    removeEval(event) {
        event.preventDefault();
        let {id} = event.target;
        this.setState(prevState => {
            let ev = Array.from(prevState.evaluationFields)
            ev.splice(id, 1);
            return { evaluationFields: ev };
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

        // Check total weight
        let totalWeight = 0;
        this.state.evaluationFields.forEach(element => {
            totalWeight += Number.parseInt(element.weight);
        });

        if ((totalWeight > 100 || totalWeight < 100) && totalWeight !== 0) { 
            this.showErrorAlert(`Total weight has to be 100%. Current: ${totalWeight}%`);
            this.setState({isUpdating: false});
            return;
        }

        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        CourseService.updateClassEvaluations(this.props.courseCode, this.props.classCode, this.state.evaluationFields)
            .then((res) => {
                this.props.success();
                this.closeModal(`#editEvaluationModal-${this.props.classCode}`);
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                if (err.response.status === 409) { 
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#editEvaluationModal-${this.props.classCode}`);
                    this.setState({isUpdating: false});
                }
            });
    }

    UNSAFE_componentWillReceiveProps(props) {
        // Create array elements if LO is more than current checkboxes
        this.loCount = props.loData.length;
        let evaluationFields = JSON.parse(JSON.stringify(props.data));
        if (evaluationFields.length > 0) {
            if (evaluationFields[0].evaluatedLearningOutcomes.length < this.loCount) {
                // Create array with data to add
                let appendArr = [];
                for (let i = 0; i < this.loCount - evaluationFields[0].evaluatedLearningOutcomes.length; i++) {
                    appendArr.push(false);
                }
                // Append array values
                evaluationFields.map((element, index) => {
                    element.evaluatedLearningOutcomes = element.evaluatedLearningOutcomes.concat(Array.from(appendArr));
                    return element;
                } );
            }
        }

        
        this.setState({
            learningOutcomeFields: props.loData ? props.loData : [""],
            evaluationFields: evaluationFields ? Array.from(evaluationFields) : [],
            isUpdating: false,
            showErrorAlert: false,
            errorAlertMessage: ""
        })
    }

    render() {
        return this.state.learningOutcomeFields && this.state.learningOutcomeFields.length > 0 ? (
            <Modal id={`editEvaluationModal-${this.props.classCode}`} className="modal-lg">
                <ModalHeader title={`Edit Evaluations for ${this.props.courseCode} - ${this.props.classCode}`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post">
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <div className="form-group">
                                <b className="text-secondary">Learning Outcomes</b>
                                <ol className="lo-ol">
                                    {this.state.learningOutcomeFields.map((element, id) => {
                                        return <li className="lo" key={`lo-${id}`}>{element}</li>
                                    })}
                                </ol>
                            </div>
                            <div className="form-group">
                                {this.state.evaluationFields.map((element, evalId) => {
                                    return (
                                        <div key={`ev-${evalId}`}>
                                            <div className="card-title" style={{borderBottom: "2px solid rgba(108,117,125,.2)"}}>Evaluation {evalId+1} <a href="#deleteEvaluation" className="float-right text-secondary" id={evalId} onClick={this.removeEval} style={{fontWeight: "initial"}} disabled={this.state.isUpdating}>Delete</a></div>
                                            <div className="form-row">
                                                <div className="form-group col-lg-10 col-md-8">
                                                    <label htmlFor="name">Evaluation Name</label>
                                                    <input className="form-control" name={`name`} id={evalId} type="input" value={element.name} onChange={this.handleChange} disabled={this.state.isUpdating} placeholder="Evaluation Name" required/>
                                                </div>
                                                <div className="form-group col-lg-2 col-md-4">
                                                    <label htmlFor="weight">Weight</label>
                                                    <div className="input-group">
                                                        <input type="number" className="form-control" id={evalId} name="weight" value={element.weight} min="1" max="100" disabled={this.state.isUpdating} onChange={this.handleChange} required/>
                                                        <div className="input-group-append">
                                                            <div className="input-group-text">%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <div>Evaluated LOs</div>
                                                    {this.state.learningOutcomeFields.map((element, loIndex) => {
                                                        return <div key={loIndex} className="form-check form-check-inline" >
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id={`${evalId}-${loIndex}`} checked={this.state.evaluationFields[evalId].evaluatedLearningOutcomes[loIndex]} onChange={this.handleChange} />
                                                                <label onClick={() => {this.handleCheckbox(`${evalId}-${loIndex}`, !this.state.evaluationFields[evalId].evaluatedLearningOutcomes[loIndex])}} className="custom-control-label" htmlFor={`loCheck-${loIndex}`}>LO {loIndex + 1}</label>
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="form-group">
                                <Button type="button" className="btn btn-block btn-secondary" onClick={this.addEval} disabled={this.state.isUpdating}>Add Evaluation</Button>
                            </div>
                        </div>
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating}>Save Changes</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        ) : (
            <Modal id={`editEvaluationModal-${this.props.classCode}`}>
                <ModalHeader title={`Edit Evaluations for ${this.props.courseCode} - ${this.props.classCode}`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post">
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <div className="form-group">
                                <p>
                                    There are no learning outcomes in this course. Add learning outcomes to add evaluations.
                                </p>
                            </div>
                        </div>
                        <ModalFooter disableClose={this.state.isUpdating} buttonText="Close">
                            
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default EditEvaluationModal;