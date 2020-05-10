import React from 'react'

import './Landing.css';

import LandingLoginForm from './LandingLoginForm';

class Landing extends React.Component {
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