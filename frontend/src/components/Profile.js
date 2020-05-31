import React from 'react';
import {Redirect} from 'react-router-dom';

// Services
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

// UI Elements
import PageWrapper from './ui-elements/PageWrapper';
import PageBreadcrumb from './ui-elements/PageBreadcrumb';
import ContentWrapper from './ui-elements/ContentWrapper';
import ErrorAlert from './ui-elements/ErrorAlert';
import SuccessAlert from './ui-elements/SuccessAlert';
import Card from './ui-elements/Card';
import Preloader from './ui-elements/Preloader';
import Button from './ui-elements/Button';

class StaffDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isUpdating: false,
            isAuthenticating: true,
            isAuthenticated: false,       // TODO: revalidate auth
            userData: undefined,
            currentPassword: "",
            newPassword: "",
            newPasswordConfirm: "",
            showUpdatePasswordErrorMessage: false,
            updatePasswordAlertMessage: "",
            showPassUpdateSuccess: false,
            showProfileUpdateSuccess: false,
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.handlePasswordFieldChange = this.handlePasswordFieldChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
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
            else {
                this.setState({
                    isAuthenticating: false,
                    isAuthenticated: true
                });

                // Load user info
                UserService.getUserData()
                .then(res => {
                    if (res.firstName)
                    this.setState({
                        userData: res,
                        isLoading: false
                    })
                });
            }
        });
    }

    handlePasswordFieldChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleChangePassword(e) {
        e.preventDefault();
        this.setState({isUpdating: true, showPassUpdateSuccess: false, showUpdatePasswordErrorMessage: false});
        AuthService.updatePassword(this.state.userData.primaryEmail, this.state.currentPassword, this.state.newPasswordConfirm).then(status => {
            if (status)
                this.setState({
                    showPassUpdateSuccess: true,
                    updatePasswordAlertMessage: status.message,
                    isUpdating: false,
                    currentPassword: "",
                    newPassword: "",
                    newPasswordConfirm: ""
                });
            else 
                this.setState({
                    showUpdatePasswordErrorMessage: true,
                    updatePasswordAlertMessage: status.message,
                    isUpdating: false
                });
        });
    }

    render() {
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        return (
            <div>
                <Preloader isLoading={this.state.isLoading}/>
                <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <PageWrapper>
                        <PageBreadcrumb title="Profile" root="Account"/>
                        <ContentWrapper>
                            <div className="row">
                                <div className="col-12">
                                    <Card title="User Profile" padding={true}>
                                        <div className="row">
                                            <div className="col-xl-2 col-md-3 col-sm-12">
                                                <div style={{
                                                    width: 150,
                                                    height: 150,
                                                    overflow: "hidden",
                                                    borderRadius: "50%",
                                                    background: "#F0F0F0",
                                                    backgroundImage: `url('${this.state.userData ? this.state.userData.profilePictureURL : "/img/user.png"}')`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    display: "block",
                                                    marginLeft: "auto",
                                                    marginRight: "auto",
                                                    
                                                }}/>
                                            </div>
                                            <div className="col-xl-10 col-md-9 col-sm-12">
                                                <div className="card-title text-secondary font-20">{this.state.userData ? `${this.state.userData.firstName} ${this.state.userData.lastName}` : "" }</div>
                                                <div><span className="card-title text-secondary">Primary Email</span>: {this.state.userData ? this.state.userData.primaryEmail : ""}</div>
                                                <div><span className="card-title text-secondary">Contact Email</span>: {this.state.userData ? this.state.userData.contactEmail : ""}</div>
                                                <div><span className="card-title text-secondary">Phone Number</span>: {this.state.userData ? this.state.userData.phone : ""}</div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">    
                                    <Card title="Update Password" padding>
                                        { this.state.showUpdatePasswordErrorMessage ? <ErrorAlert>{this.state.updatePasswordAlertMessage}</ErrorAlert> : null }
                                        { this.state.showPassUpdateSuccess ? <SuccessAlert>{this.state.updatePasswordAlertMessage}</SuccessAlert> : null }
                                        <form onSubmit={this.handleChangePassword}>
                                            <div className="form-group">
                                                <label htmlFor="currentPassword">Current Password</label>
                                                <input type="password" name="currentPassword" value={this.state.currentPassword} onChange={this.handlePasswordFieldChange} className="form-control" placeholder="Current Password" disabled={this.state.isUpdating} required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="newPassword">New Password</label>
                                                <input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handlePasswordFieldChange} className="form-control" placeholder="New Password" disabled={this.state.isUpdating} required/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="newPasswordConfirm">Confirm Password</label>
                                                <input type="password" name="newPasswordConfirm" value={this.state.newPasswordConfirm} onChange={this.handlePasswordFieldChange} className="form-control" placeholder="New Password" disabled={this.state.isUpdating} required/>
                                                {this.state.newPassword !== this.state.newPasswordConfirm && this.state.newPasswordConfirm !== "" ? <small className="text-danger">The password does not match.</small> : <small></small>}
                                            </div>
                                            <Button type="submit" className="btn btn-primary btn-block" loading={this.state.isUpdating}>Change Password</Button>
                                        </form>
                                    </Card>
                                </div>
                                <div className="col-md-6">
                                    <Card title="Your Profiles" padding>
                                        <p>An account can have several profiles assigned to it. You can choose the default profile that will be used when you log in.</p>
                                        <p>Click the arrow button to re-arrange.</p>
                                        <div className="list-group">
                                            {this.state.userData ? this.state.userData.accounts.map((profile, index) => {
                                                return <div className={`list-group-item ${index === 0 ? "active" : ""}`} key={index}>
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <div>
                                                            <Button className="btn btn-light btn-sm mr-1" disabled={index === 0}><i className="fas fa-arrow-up"/></Button>
                                                            <Button className="btn btn-light btn-sm mr-2" disabled={index === this.state.userData.accounts.length - 1}><i className="fas fa-arrow-down"/></Button>
                                                            <span>{profile.name}</span>
                                                        </div>
                                                        {index === 0 ? <small style={{marginTop: 6}}>Default</small> : <span></span>}
                                                    </div>
                                                </div>
                                            })
                                            : <div></div>}
                                        </div>
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

export default StaffDashboard;