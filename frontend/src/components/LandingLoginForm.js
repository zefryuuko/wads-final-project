import React from 'react';
import AuthService from '../services/AuthService';

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
        const {name, value} = event.target;
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
        AuthService.login(this.state.emailAddress, this.state.password, (res) => {
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
            return <script>{window.location.href = "/staff"}</script>
            // return <Redirect to="/staff"/>
        }
        return (
            <div className="login-form" id="login-form">
                <h1 className="mt-3 text-center">Binusian Login</h1>
                {/* <form> */}
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
                    <div style={{textAlign: "center", margin: "5px auto"}}><small><a href="/forgot">Forgot password</a></small></div>
                    <div className="alert alert-danger" style={{display: this.state.showInvalidCredentialsMessage}}>Invalid email and/or password</div>
                {/* </form> */}
            </div>
        );
    }
}

export default LandingLoginForm;