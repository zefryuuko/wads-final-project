import React from 'react';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

// UI Elements
import Modal from './ui-elements/Modal';
import ModalHeader from './ui-elements/ModalHeader';
import ModalBody from './ui-elements/ModalBody';
import ModalFooter from './ui-elements/ModalFooter';

class LandingLoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            emailAddress: "",
            password: "",
            rememberMe: false,
            loggingIn: false,
            showInvalidCredentialsMessage: "none",
            loggedIn: false,
            sessionData: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLoginButton = this.handleLoginButton.bind(this);
    }

    handleChange(event) {
        let {name, value} = event.target;
        if (name === "rememberMe") value = event.target.checked;
        this.setState({
            [name]: value,
            showInvalidCredentialsMessage: "none"
        });
    }

    state
    
    handleLoginButton(event) {
        this.setState(prevState => {
            return {
                loggingIn: !prevState.loggingIn,
                showInvalidCredentialsMessage: "none"
            }
        });
        AuthService.login(this.state.emailAddress, this.state.password, this.state.rememberMe, (res) => {
            if (res.sessionId) {
                this.setState(prevState => {
                    return {
                        loggedIn: !prevState.loggedIn,
                        loggingIn: !prevState.loggingIn,
                        sessionData: res
                    }
                });
            } else {
                this.setState(prevState => {
                    return {
                        loggingIn: !prevState.loggingIn,
                        showInvalidCredentialsMessage: "block"
                    }
                });
            }
        });
    }
    
    render() {
        if(this.state.loggedIn) {
            AuthService.saveSession(this.state.sessionData);
            UserService.getUserById(this.state.sessionData.universalId)
            .then((user) => {
                // Check user's default account
                if (user.accounts.length < 1) {
                    // TODO: add no accounts page
                    window.alert("There are no profile that is associated with this account. Please contact the administrator.");
                    window.location.href = "https://google.com";
                } else {
                    const defaultAccountType = user.accounts[0].accountType;
                    const defaultAccountId = user.accounts[0]._id;

                    // Save current active account to localStorage
                    sessionStorage.setItem('activeAccount', `${defaultAccountId},${defaultAccountType}`)

                    // Redirect to default account dash
                    window.location.href = `/${defaultAccountType}`;
                }
            });
        }
        return (
            <div className="login-form" id="login-form">
                <h1 className="mt-3 text-center">Binusian Login</h1>
                    <div className="form-group">
                        <input type="input" name="emailAddress" value={this.state.emailAddress} onChange={this.handleChange} className="form-control" placeholder="Email address" disabled={this.state.loggingIn} required></input>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="Password" disabled={this.state.loggingIn} required></input>
                    </div>
                    <div className="form-check remember-me" data-toggle="tooltip" title="Only choose this option on a device you trust">
                        <input type="checkbox" name="rememberMe" value={this.state.rememberMe} onChange={this.handleChange} className="form-check-input" disabled={this.state.loggingIn}></input>
                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <button className="btn btn-login" onClick={this.handleLoginButton} disabled={!(!this.state.loggingIn && (this.state.emailAddress && this.state.password))}>{this.state.loggingIn ? "Logging in" : this.state.loggedIn ? "Logged in" : "Login"}</button>
                    <div style={{textAlign: "center", margin: "5px auto"}}><small><a href="#forgotPassword" data-toggle="modal" data-target="#forgotPasswordModal">Forgot password</a></small></div>
                    <div className="alert alert-danger" style={{display: this.state.showInvalidCredentialsMessage}}>Invalid email and/or password</div>

                    <Modal id="forgotPasswordModal" className="modal-dialog-centered">
                        <ModalHeader title="Forgot password?"/>
                        <ModalBody>
                            <p>
                                Due to security reasons, our staffs are the only one who can reset your password.
                                To get your password reset, please contact us.
                            </p>
                            <p>
                                Thank you for your understanding.
                            </p>
                        </ModalBody>
                        <ModalFooter buttonText="Close"/>
                    </Modal>
            </div>
        );
    }
}

export default LandingLoginForm;