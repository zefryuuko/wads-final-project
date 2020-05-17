import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

// Services
import CourseService from '../../../../services/CourseService';

// UI Components
import Modal from '../../../ui-elements/Modal';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';
import ErrorAlert from '../../../ui-elements/ErrorAlert';

class EditTextbookModal extends Component {
    constructor(props) {
        super(props);

        // Generate all fields for textbooks
        // Required by React to keep the component lifecycle the same for all fields.
        let textbooks = this.props.data ? this.props.data.map(element => {
            return {
                title: element.title ? element.title : "",
                author: element.author ? element.author : "",
                publisher: element.publisher ? element.publisher : "",
                year: element.year ? element.year : "",
                isbn: element.isbn ? element.isbn : "",
            }
        }) : []

        this.state = {
            courseCode: this.props.courseCode,
            classCode: this.props.classCode,
            textbooks: textbooks,
            showErrorAlert: false,
            errorAlertMessage: "",
            redirect: undefined,
        }
        
        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.onSaveChangesClicked = this.onSaveChangesClicked.bind(this)
        this.addTextbook = this.addTextbook.bind(this);
        this.removeTextbook = this.removeTextbook.bind(this);
    }

    handleChange(event) {
        const {name, id, value} = event.target;
        this.setState(prevState => {
            let newTextbooks = Array.from(prevState.textbooks);
            newTextbooks[id][name] = value;
            return {
                textbooks: newTextbooks
            }
        });
    }

    addTextbook() {
        this.setState(prevState => {
            return {
                textbooks: [...prevState.textbooks, {title: "", author: "", publisher: "", year: "", isbn:""}]
            }
        })
    }
    
    removeTextbook(event) {
        event.preventDefault();
        let {id} = event.target;
        this.setState(prevState => {
            let textbooks = Array.from(prevState.textbooks)
            textbooks.splice(id, 1);
            return { textbooks };
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
        CourseService.updateClassTextbooks(this.state.courseCode, this.state.classCode, this.state.textbooks)
            .then((res) => {
                if (this.props.redirectOnSuccess) this.setState({redirect: this.props.redirectOnSuccess});
                this.props.success();
                this.closeModal(`#editTextbookModal-${this.state.classCode}`);
                this.setState({isUpdating: false});
            })
            .catch(err =>{
                if (err.response.status === 409) {
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal(`#editTextbookModal-${this.state.classCode}`);
                    this.setState({isUpdating: false});
                }
            });
    }

    render() { 
        return (
            <Modal id={`editTextbookModal-${this.state.classCode}`} className="modal-lg">
                {this.state.redirect ? <Redirect to={`${this.state.redirect}/${this.state.prefix}${this.state.code}`}/> : null}
                <ModalHeader title={`Edit Textbooks for ${this.state.courseCode} - ${this.state.classCode}`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.textbooks.length > 0 ? this.state.textbooks.map((element, id) => {
                                return (
                                    <div key={id}>
                                        <div className="card-title" style={{borderBottom: "2px solid rgba(108,117,125,.2)"}}>Book {id+1} <a href="#deleteTextbook" className="float-right text-secondary" id={id} onClick={this.removeTextbook} style={{fontWeight: "initial"}}>Delete</a></div>
                                        {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                                        <div className="form-row">
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="title">Title <small className="text-muted">(required)</small></label>
                                                <input className="form-control" name="title" placeholder="Book Title" id={id} value={element.title} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg-12">
                                                <label htmlFor="author">Author(s)</label>
                                                <input className="form-control" name="author" placeholder="Book Author(s)" id={id} value={element.author} onChange={this.handleChange} disabled={this.state.isUpdating}/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg-4 col-md-12">
                                                <label htmlFor="author">Publisher</label>
                                                <input className="form-control" name="publisher" placeholder="Book Publisher" id={id} value={element.publisher} onChange={this.handleChange} disabled={this.state.isUpdating}/>
                                            </div>
                                            <div className="form-group col-lg-4 col-md-6">
                                                <label htmlFor="year">Year Published</label>
                                                <input className="form-control" type="year" name="year" placeholder="Year Published" id={id} value={element.year} onChange={this.handleChange} disabled={this.state.isUpdating}/>
                                            </div>
                                            <div className="form-group col-lg-4 col-md-6">
                                                <label htmlFor="isbn">ISBN</label>
                                                <input className="form-control" name="isbn" placeholder="ISBN" id={id} value={element.isbn} onChange={this.handleChange} disabled={this.state.isUpdating}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : null}
                            <div className="form-group">
                                Note: Textbook information will be shown in APA format.
                            </div>
                            <Button type="button" onClick={this.addTextbook} className="btn btn-block btn-secondary mb-3">Add new textbook</Button>
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
 
export default EditTextbookModal;