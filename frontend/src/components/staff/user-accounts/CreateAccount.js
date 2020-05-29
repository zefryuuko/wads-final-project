import React from 'react';
import {Redirect} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';
import firebase from '../../../firebase';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import Button from '../../ui-elements/Button';
import Card from '../../ui-elements/Card';
import ErrorAlert from '../../ui-elements/ErrorAlert';
import SuccessAlert from '../../ui-elements/SuccessAlert';
import Preloader from '../../ui-elements/Preloader';

class CreateAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            isUpdating: false,
            id: "",
            firstName: "",
            lastName: "",
            primaryEmail: "",
            contactEmail: "",
            phone: "",
            showErrorMessage: false,
            showSuccessMessage: false,
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind Functions
        this.handleChange = this.handleChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.updateSuccess = this.updateSuccess.bind(this);
        this.showError = this.showError.bind(this);
    }

    updateSuccess() {
        this.setState({showSuccessMessage: true, showErrorMessage: false});
    }

    showError() {
        this.setState({showErrorMessage: true, showSuccessMessage: false});
    }

    handleChange(event) {
        let {name, value} = event.target;
        if (name === 'firstName' && !/^[a-zA-Z() ]*$/.test(value)) value = this.state.firstName;
        if (name === 'lastName' && !/^[a-zA-Z() ]*$/.test(value)) value = this.state.lastName;
        if (name === 'id' && !/^[a-zA-Z0-9()]*$/.test(value)) value = this.state.id;
        if (name === 'profilePicture') value = event.target.files
        this.setState({
            [name]: value
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        if (this.state.profilePicture) {
            const bucketName = "profile-picture";
            const picture = this.state.profilePicture[0];
            let pictureExtension = picture.name.split(".");
            pictureExtension = pictureExtension[pictureExtension.length - 1];
            const fileName = `${this.state.id}.${pictureExtension}`;
            let storageRef = firebase.storage().ref(`${bucketName}/${fileName}`);
            let uploadTask = storageRef.put(picture);
            uploadTask.on('state_changed', null, null, () => {
                firebase.storage().ref().child(`${bucketName}/${fileName}`).getDownloadURL().then(downloadURL => {
                    UserService.createUser({...this.state, profilePictureURL: downloadURL})
                    .then((res) => {
                        this.updateSuccess();
                        this.setState({
                            isUpdating: false,
                            id: "",
                            firstName: "",
                            lastName: "",
                            primaryEmail: "",
                            contactEmail: "",
                            phone: "",
                            profilePicture: undefined,
                        });
                    })
                    .catch((err) =>{
                        console.log(err)
                        if (err.response && (err.response.status === 409)) { 
                            this.showErrorAlert(err.response.data.message);
                            this.setState({isUpdating: false});
                        } else {
                            this.showError();
                            this.setState({isUpdating: false});
                        }
                    });
                })
            });
        } else {
            UserService.createUser(this.state)
            .then((res) => {
                this.updateSuccess();
                this.setState({
                    isUpdating: false,
                    id: "",
                    firstName: "",
                    lastName: "",
                    primaryEmail: "",
                    contactEmail: "",
                    phone: "",
                    profilePicture: undefined,
                });
            })
            .catch((err) =>{
                console.log(err)
                if (err.response && (err.response.status === 409)) { 
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.showError();
                    this.setState({isUpdating: false});
                }
            });
        }
    }
    
    componentDidMount() {
        // Perform session check
        AuthService.isLoggedIn()
            .then(res => {
                if (res.response && (res.response.status === 403))
                    this.setState({
                        isAuthenticating: false,
                        isAuthenticated: false
                    });
                else
                    this.setState({
                        isAuthenticating: false,
                        isAuthenticated: true,
                        isLoading: false
                    })
            });
    }

    render() {
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        return (
            <div>
                <Preloader isLoading={this.state.isLoading}/>
                <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <PageWrapper>
                        <PageBreadcrumb title={`Create User Account`} root="Account Administration"/>
                        <ContentWrapper>
                            {this.state.showErrorMessage ? <ErrorAlert><strong>Error -</strong> Action failed. Please try again.</ErrorAlert> : null}
                            {this.state.showSuccessMessage ? <SuccessAlert><strong>Success -</strong> Action performed successfully.</SuccessAlert> : null}
                            <div className="row">
                                <div className="col-12">
                                    <Card padding>
                                        <form onSubmit={this.onSubmitHandler}>
                                            <div className="form-row">
                                                <div className="form-group col-lg-12">
                                                    <label htmlFor="phone">Account ID</label>
                                                    <input type="string" className="form-control" name="id" placeholder="Account ID" value={this.state.id} onChange={this.handleChange} disabled={this.state.isUpdating} minLength="10" maxLength="10" required/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="firstName">First Name</label>
                                                    <input type="input" className="form-control" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                                                </div>
                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="lastName">Last Name</label>
                                                    <input type="input" className="form-control" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="primaryEmail">Primary Email</label>
                                                    <input type="email" className="form-control" name="primaryEmail" placeholder="Primary Email" value={this.state.primaryEmail} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                                                </div>
                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="contactEmail">Contact Email</label>
                                                    <input type="email" className="form-control" name="contactEmail" placeholder="Contact Email" value={this.state.contactEmail} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="phone">Phone Number</label>
                                                    <input type="telephone" className="form-control" name="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.handleChange} disabled={this.state.isUpdating} required/>
                                                </div>
                                                <div className="form-group col-lg-6">
                                                    <label htmlFor="phone">Profile Picture</label>
                                                    {/* <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">Image</div>
                                                        </div> */}
                                                        {/* <div className="custom-file"> */}
                                                            <input type="file" id="profilePicture" name="profilePicture" accept="image/x-png,image/jpeg" onChange={this.handleChange}/> {/*className="custom-file-input"*/}
                                                            {/* <label className="custom-file-label" htmlFor="profilePicture">Choose file</label> */}
                                                        {/* </div> */}
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-lg-6"><small>All fields are required.</small></div>
                                                <div className="col-lg-6">
                                                    <Button className="btn btn-primary float-right" loading={this.state.isUpdating}>Save Changes</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </Card>
                                </div>
                            </div>
                        </ContentWrapper>
                    </PageWrapper>
                </div>
            </div>
        );
    }
}

export default CreateAccount;