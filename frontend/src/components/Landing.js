import React from 'react'
import './Landing.css';

class Landing extends React.Component {
    render() {
        return (
            <div className="landing-parent">
                <div className="landing-subparent">
                    <div className="headline-container">
                        <div className="container">
                            <img className="logo" src="/assets/images/logo-alt.png" alt="logo"></img>
                            <div className="headline">One place for everything BINUS</div>
                            <p className="description">Schedule, assignments, materials, you name it. Everything is accessible in one place.</p>
                            <a className="btn btn-login" href="#login-form">Log in</a>
                        </div>
                    </div>
                    <div className="login-form" id="login-form">
                        <h1>Binusian Log in</h1>
                        <form action="/student">
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email address" required></input>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" required></input>
                            </div>
                            <div className="form-check remember-me">
                                <input type="checkbox" className="form-check-input" name="rememberMe"></input>
                                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <button type="submit" className="btn btn-login">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Landing;