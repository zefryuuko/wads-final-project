import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import Card from '../../ui-elements/Card';
import CreateAccountModal from './components/CreateAccountModal';
import Button from '../../ui-elements/Button';
import ErrorAlert from '../../ui-elements/ErrorAlert';
import SuccessAlert from '../../ui-elements/SuccessAlert';
import Modal from '../../ui-elements/Modal';
import ModalBody from '../../ui-elements/ModalBody';
import ModalFooter from '../../ui-elements/ModalFooter';
import ModalHeader from '../../ui-elements/ModalHeader';

class Account extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false,
            tableData: undefined,
            firstName: "",
            lastName: "",
            primaryEmail: "",
            contactEmail: "",
            phone: "",
            studentAccount: undefined,
            lecturerAccount: undefined,
            staffAccount: undefined,
            showErrorMessage: false,
            showSuccessMessage: false,
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.showError = this.showError.bind(this);
        this.updateSuccess = this.updateSuccess.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.reloadData = this.reloadData.bind(this);
        this.createStudentAccount = this.createStudentAccount.bind(this);
        this.createLecturerAccount = this.createLecturerAccount.bind(this);
        this.createStaffAccount = this.createStaffAccount.bind(this);
        this.deleteStudentAccount = this.deleteStudentAccount.bind(this);
        this.deleteLecturerAccount = this.deleteLecturerAccount.bind(this);
        this.deleteStaffAccount = this.deleteStaffAccount.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    closeModal(modalId) {
        window.$(() => {
            window.$(modalId).modal('toggle');
         });
    }

    reloadData() {
        // Load user info
        UserService.getUserById(this.props.match.params.accountId)
            .then(res => {
                this.setState({
                    tableData: res,
                    firstName: res ? res.firstName : "",
                    lastName: res ? res.lastName: "",
                    primaryEmail: res ? res.primaryEmail: "",
                    contactEmail: res ? res.contactEmail: "",
                    phone: res ? res.phone: "",
                    studentAccount: res ? res.accounts.find(obj => {return obj.accountType === 'student'}): undefined,
                    lecturerAccount: res ? res.accounts.find(obj => {return obj.accountType === 'lecturer'}): undefined,
                    staffAccount: res ? res.accounts.find(obj => {return obj.accountType === 'staff'}): undefined,
            })
            // .catch((err) => {
            //     console.log(err);
            // });
        });
    }

    createStudentAccount() {
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        UserService.createStudentAccount(this.props.match.params.accountId)
            .then((res) => {
                this.updateSuccess();
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                console.log(err)
                if (err.response && (err.response.status === 409)) { 
                    this.showError();
                    this.setState({isUpdating: false});
                } else {
                    this.showError();
                    this.setState({isUpdating: false});
                }
            });
        }   

    deleteStudentAccount() {
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        this.closeModal(`#deleteStudentProfile`);
        UserService.deleteUserAccount(this.props.match.params.accountId, this.state.studentAccount._id)
            .then((res) => {
                this.updateSuccess();
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                console.log(err)
                if (err.response && (err.response.status === 409)) { 
                    this.showError();
                    this.setState({isUpdating: false});
                } else {
                    this.showError();
                    this.setState({isUpdating: false});
                }
            });
    }  

    createLecturerAccount() {
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        UserService.createLecturerAccount(this.props.match.params.accountId)
            .then((res) => {
                this.updateSuccess();
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                console.log(err)
                if (err.response && (err.response.status === 409)) { 
                    this.showError();
                    this.setState({isUpdating: false});
                } else {
                    this.showError();
                    this.setState({isUpdating: false});
                }
            });
    }

    deleteLecturerAccount() {
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        this.closeModal(`#deleteLecturerProfile`);
        UserService.deleteUserAccount(this.props.match.params.accountId, this.state.lecturerAccount._id)
            .then((res) => {
                this.updateSuccess();
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                console.log(err)
                if (err.response && (err.response.status === 409)) { 
                    this.showError();
                    this.setState({isUpdating: false});
                } else {
                    this.showError();
                    this.setState({isUpdating: false});
                }
            });
    }

    createStaffAccount() {
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        UserService.createStaffAccount(this.props.match.params.accountId)
            .then((res) => {
                this.updateSuccess();
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                console.log(err)
                if (err.response && (err.response.status === 409)) { 
                    this.showError();
                    this.setState({isUpdating: false});
                } else {
                    this.showError();
                    this.setState({isUpdating: false});
                }
            });
    } 

    deleteStaffAccount() {
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        this.closeModal(`#deleteStaffProfile`);
        UserService.deleteUserAccount(this.props.match.params.accountId, this.state.staffAccount._id)
            .then((res) => {
                this.updateSuccess();
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                console.log(err)
                if (err.response && (err.response.status === 409)) { 
                    this.showError();
                    this.setState({isUpdating: false});
                } else {
                    this.showError();
                    this.setState({isUpdating: false});
                }
            });
    }

    resetPassword() {
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        this.closeModal(`#resetPasswordModal`);
        UserService.resetUserPassword(this.props.match.params.accountId)
            .then((res) => {
                this.updateSuccess();
                this.setState({isUpdating: false});
            })
            .catch((err) =>{
                console.log(err)
                if (err.response && (err.response.status === 409)) { 
                    this.showError();
                    this.setState({isUpdating: false});
                } else {
                    this.showError();
                    this.setState({isUpdating: false});
                }
            });
    }
        
    componentDidMount() {
        // Perform session check
        AuthService.isLoggedIn()
        .then(res => {
            if (res.response && (res.response.status === 403))
                this.setState({
                    isLoading: false,
                    isLoggedIn: false
                });
            else
                this.setState({
                    isLoading: false,
                    isLoggedIn: true
                })
        });
        
        // Load user info
        UserService.getUserById(this.props.match.params.accountId)
            .then(res => {
                this.setState({
                    tableData: res,
                    firstName: res ? res.firstName : "",
                    lastName: res ? res.lastName: "",
                    primaryEmail: res ? res.primaryEmail: "",
                    contactEmail: res ? res.contactEmail: "",
                    phone: res ? res.phone: "",
                    studentAccount: res ? res.accounts.find(obj => {return obj.accountType === 'student'}): undefined,
                    lecturerAccount: res ? res.accounts.find(obj => {return obj.accountType === 'lecturer'}): undefined,
                    staffAccount: res ? res.accounts.find(obj => {return obj.accountType === 'staff'}): undefined,
            })
            // .catch((err) => {
            //     console.log(err);
            // });
        });
    }

    updateSuccess() {
        this.setState({showSuccessMessage: true, showErrorMessage: false});
        this.reloadData();
    }

    showError() {
        this.setState({showErrorMessage: true, showSuccessMessage: false});
    }

    handleChange(event) {
        let {name, value} = event.target;
        if (name === 'firstName' && !/^[a-zA-Z() ]*$/.test(value)) value = this.state.firstName;
        if (name === 'lastName' && !/^[a-zA-Z() ]*$/.test(value)) value = this.state.lastName;
        if (name === 'primaryEmail' && !/^[a-zA-Z() ]*$/.test(value)) value = this.state.primaryEmail;
        if (name === 'id' && !/^[a-zA-Z1-9()]*$/.test(value)) value = this.state.id;
        this.setState({
            [name]: value
        });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        UserService.updateUser(this.props.match.params.accountId, {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            primaryEmail: this.state.primaryEmail,
            contactEmail: this.state.contactEmail,
            phone: this.state.phone
        })
            .then((res) => {
                this.updateSuccess();
                this.setState({isUpdating: false});
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

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/"/>
        return (
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title="User Account Details" root="Account Administration"/>
                    <ContentWrapper>
                        {this.state.showErrorMessage ? <ErrorAlert><strong>Error -</strong> Action failed. Please try again.</ErrorAlert> : null}
                        {this.state.showSuccessMessage ? <SuccessAlert><strong>Success -</strong> Action performed successfully.</SuccessAlert> : null}
                        <div className="row">
                            <div className="col-lg-9 col-md-12">
                                <Card title="Account Details" padding>
                                    <form onSubmit={this.onSubmitHandler}>
                                        <div className="form-row">
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="firstName">First Name</label>
                                                <input type="input" className="form-control" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required/>
                                            </div>
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input type="input" className="form-control" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="primaryEmail">Primary Email</label>
                                                <input type="email" className="form-control" name="primaryEmail" placeholder="Primary Email" value={this.state.primaryEmail} onChange={this.handleChange} disabled required/>
                                            </div>
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="contactEmail">Contact Email</label>
                                                <input type="email" className="form-control" name="contactEmail" placeholder="Contact Email" value={this.state.contactEmail} onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input type="telephone" className="form-control" name="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-lg-6"><small>All fields are required.</small></div>
                                            <div className="col-lg-6">
                                                <Button type="submit" className="btn btn-primary float-right">Save Changes</Button>
                                            </div>
                                        </div>
                                    </form>
                                </Card>
                            </div>
                            <div className="col-lg-3 col-md-12">
                                <Card title="Profile Picture" padding>
                                    TODO: Add profile picture
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Card title="Student Account" padding>
                                    {this.state.studentAccount ?
                                        <div>
                                            <div><b>Current GPA</b>: {this.state.studentAccount.metadata.currentGPA ? this.state.studentAccount.metadata.currentGPA : "No data"}</div>
                                            <div><b>Current SAT</b>: {this.state.studentAccount.metadata.currentSAT ? this.state.studentAccount.metadata.currentSAT : "No data"}</div>
                                            <div><b>Community Service Hours</b>: {this.state.studentAccount.metadata.currentSOC ? `${this.state.studentAccount.metadata.currentSOC} hours` : "No data"}</div>
                                            <br/>
                                            <div><b>Enrolled Classes</b></div>
                                            <div className="table-responsive">
                                                <table id="studentClasses" className="table table-striped table-bordered no-wrap">
                                                    <thead>
                                                        <tr>
                                                            <th>Class Code</th>
                                                            <th>Course Code</th>
                                                            <th>Course Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>TODO</td>
                                                            <td>:</td>
                                                            <td>Render class data here</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <script>{ window.loadTable('#studentClasses') }</script>
                                            <div className="float-right mt-2">
                                                <Button className="btn btn-danger ml-2" data-toggle="modal" data-target="#deleteStudentProfile">Delete Account</Button>
                                            </div>
                                            <Modal id="deleteStudentProfile">
                                                <ModalHeader title="Delete Student Account"/>
                                                <ModalBody>
                                                    <p>Are you sure you want to delete the student account for {`${this.state.firstName} ${this.state.lastName}`}?</p>
                                                    <p>This action is destructive and cannot be undone.</p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button className="btn btn-danger" onClick={this.deleteStudentAccount}>Delete</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </div>
                                    : <p style={{textAlign: "center"}}>This account does not have a student profile. <a href="#createStudentAccount" onClick={this.createStudentAccount}>Create one.</a></p>}
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Card title="Lecturer Account" padding>
                                    {this.state.lecturerAccount ?
                                        <div>
                                            <div><b>Enrolled Classes</b></div>
                                            <div className="table-responsive">
                                                <table id="lecturerClasses" className="table table-striped table-bordered no-wrap">
                                                    <thead>
                                                        <tr>
                                                            <th>Class Code</th>
                                                            <th>Course Code</th>
                                                            <th>Course Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>TODO</td>
                                                            <td>:</td>
                                                            <td>Render class data here</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <script>{ window.loadTable('#lecturerClasses') }</script>
                                            <div className="float-right mt-2">
                                                <Button className="btn btn-danger ml-2" data-toggle="modal" data-target="#deleteLecturerProfile">Delete Account</Button>
                                            </div>
                                            <Modal id="deleteLecturerProfile">
                                                <ModalHeader title="Delete Lecturer Account"/>
                                                <ModalBody>
                                                    <p>Are you sure you want to delete the lecturer account for {`${this.state.firstName} ${this.state.lastName}`}?</p>
                                                    <p>This action is destructive and cannot be undone.</p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button className="btn btn-danger" onClick={this.deleteLecturerAccount}>Delete</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </div>
                                    : <p style={{textAlign: "center"}}>This account does not have a lecturer profile. <a href="#createLecturerAccount" onClick={this.createLecturerAccount}>Create one.</a></p>}
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Card title="Staff Account" padding>
                                    {this.state.staffAccount ?
                                        <div>
                                            <div><b>Permitted Domains</b></div>
                                            <div className="table-responsive">
                                                <table id="staffDomains" className="table table-striped table-bordered no-wrap">
                                                    <thead>
                                                        <tr>
                                                            <th>Domain</th>
                                                            <th>Allowed Routes</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>TODO</td>
                                                            <td>Render domain data here</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <script>{ window.loadTable('#staffDomains') }</script>
                                            <div className="float-right mt-2">
                                                <Button className="btn btn-primary">Add Domain</Button>
                                                <Button className="btn btn-danger ml-2" data-toggle="modal" data-target="#deleteStaffProfile">Delete Account</Button>
                                            </div>
                                            <Modal id="deleteStaffProfile">
                                                <ModalHeader title="Delete Staff Account"/>
                                                <ModalBody>
                                                    <p>Are you sure you want to delete the staff account for {`${this.state.firstName} ${this.state.lastName}`}?</p>
                                                    <p>This action is destructive and cannot be undone.</p>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button className="btn btn-danger" onClick={this.deleteStaffAccount}>Delete</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </div>
                                    : <p style={{textAlign: "center"}}>This account does not have a staff profile. <a href="#createStaffAccount" onClick={this.createStaffAccount}>Create one.</a></p>}
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Card title="Account Settings" padding>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <Button className="btn btn-block btn-secondary mb-2" data-toggle="modal" data-target="#resetPasswordModal">Reset Password</Button>
                                        </div>
                                        <Modal id="resetPasswordModal">
                                            <ModalHeader title="Reset Password"/>
                                            <ModalBody>
                                                <p>Are you sure you want to reset the password for {`${this.state.firstName} ${this.state.lastName}`}?</p>
                                                <p>The password will be set to its default value.</p>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button className="btn btn-secondary" onClick={this.resetPassword}>Reset</Button>
                                            </ModalFooter>
                                        </Modal>
                                        <div className="col-lg-6">
                                            <Button className="btn btn-block btn-danger mb-2">Delete Account</Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </ContentWrapper>
                </PageWrapper>
                <CreateAccountModal/>
            </div>
        );
    }
}

export default withRouter(Account);