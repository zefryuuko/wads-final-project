import React from 'react'

// Services
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

// CSS
import './Landing.css';

import LandingLoginForm from './LandingLoginForm';

class Landing extends React.Component {
    componentDidMount() {
        if (AuthService.isSessionTampered()) {
            localStorage.clear();
        }

        AuthService.isLoggedIn().then(
            UserService.getUserById(localStorage.getItem('universalId'))
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
            }
        ));
    }

    render() {
        return (
            <div className="landing-parent">
                <div className="landing-subparent">
                    <div className="headline-container">
                        <div className="container">
                            <img className="logo" src="/assets/images/logo-alt.png" alt="logo"></img>
                            <div className="headline">One place for everything BINUS</div>
                            {/* <p className="description">Schedule, assignments, materials, you name it. Everything is accessible in one place.</p> */}
                            <a className="btn btn-login" href="#login-form">Log in</a>
                        </div>
                    </div>
                    <LandingLoginForm/>
                </div>
            </div>
        );
    }
}

export default Landing;