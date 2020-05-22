import React, { Component } from 'react';

// Services
import ClassService from '../../../../services/ClassService';
import FileService from '../../../../services/FileService';

// Components
import Modal from '../../../ui-elements/Modal';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';

class AddResourceModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            resourceName: "",
            resourceDateAdded: new Date(),
            resourceAuthorName: this.props.authorName,
            resourceAuthorUniversalId: this.props.authorUniversalId,
            resourceType: "file",
            resourceFile: undefined,
            resourceURL: undefined,
            isUpdating: false
        }

        // Bind functions
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    closeModal(modalId) {
        window.$(() => {
            window.$(modalId).modal('toggle');
         });
    }

    onChangeHandler(e) {
        let { name, id, value } = e.target;
        
        // Handle radio button input
        if (name === "resourceType") {
            if (id === "resourceTypeFile") {
                value = "file";
            } else {
                value = "URL";
            }
        } else if (name === 'resourceFile') {
            value = e.target.files
        }

        this.setState({
            [name]: value
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({isUpdating: true});
        if (this.state.resourceType === "URL") {
            this.submitData({
                dateAdded: this.state.resourceDateAdded,
                addedBy: {
                    name: this.state.resourceAuthorName,
                    universalId: this.state.resourceAuthorUniversalId
                },
                name: this.state.resourceName,
                url: (!this.state.resourceURL.match(/^[a-zA-Z]+:\/\//)) ? 'http://' + this.state.resourceURL : this.state.resourceURL
            });
        } else {
            const bucketName = `class-data/${this.props.semesterId}/${this.props.classCode}/${this.props.courseCode}/shared-resources`;
            const file = this.state.resourceFile[0];
            const fileName = `${this.state.resourceDateAdded.toString()}-${this.state.resourceAuthorUniversalId}-${file.name}`;
            FileService.uploadFile(bucketName, fileName, file, (firebaseURL) => {
                this.submitData({
                    dateAdded: this.state.resourceDateAdded,
                    addedBy: {
                        name: this.state.resourceAuthorName,
                        universalId: this.state.resourceAuthorUniversalId
                    },
                    name: this.state.resourceName,
                    url: firebaseURL
                });
            });
        }
    }

    submitData(data) {
        ClassService.createSharedResources(
            this.props.semesterId,
            this.props.classCode,
            this.props.courseCode,
            data
        )
        .then(res => {
            // Call parent refresh function
            if (this.props.onSuccess) this.props.onSuccess();

            // Reset state
            this.closeModal('#addResourceModal');
            this.setState({
                resourceName: "",
                resourceDateAdded: new Date(),
                resourceAuthorName: this.props.authorName,
                resourceAuthorUniversalId: this.props.authorUniversalId,
                resourceType: "file",
                resourceFile: undefined,
                resourceURL: undefined,
                isUpdating: false
            });
        })
        .catch(err => {

        });
    }

    render() { 
        return (
            <Modal id="addResourceModal">
                <ModalHeader title="Add new resource"/>
                <ModalBody>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="resourceName">Title</label>
                            <input type="input" name="resourceName" placeholder="Resource Title" className="form-control" onChange={this.onChangeHandler} disabled={this.state.isUpdating} required/>
                        </div>
                        <div className="form-group">
                            <label style={{display: "block"}}>Resource Type</label>
                            <div className="form-check form-check-inline">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="resourceTypeFile" name="resourceType" className="custom-control-input" onChange={this.onChangeHandler} checked={this.state.resourceType === "file"}/>
                                    <label className="custom-control-label" htmlFor="resourceTypeFile">File</label>
                                </div>
                            </div>
                            <div className="form-check form-check-inline">
                                <div className="custom-control custom-radio">
                                    <input type="radio" id="resourceTypeURL" name="resourceType" className="custom-control-input" onChange={this.onChangeHandler} checked={this.state.resourceType === "URL"}/>
                                    <label className="custom-control-label" htmlFor="resourceTypeURL" disabled={this.state.isUpdating}>URL</label>
                                </div>
                            </div>
                        </div>
                        {/* Display input depending on resource type */}
                        {this.state.resourceType === "file" ?
                            <div className="form-group">
                                <label htmlFor="resourceFile" disabled={this.state.isUpdating}>Resource File</label>
                                <input type="file" name="resourceFile" className="form-control-file" onChange={this.onChangeHandler} disabled={this.state.isUpdating} required/>
                            </div>
                        :
                            <div className="form-group">
                                <label htmlFor="resourceURL" disabled={this.state.isUpdating}>Resource URL</label>
                                <input type="input" name="resourceURL" placeholder="https://example.com/resource/file" className="form-control" onChange={this.onChangeHandler} disabled={this.state.isUpdating} required/>
                            </div>
                        }
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating}>Submit</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default AddResourceModal;