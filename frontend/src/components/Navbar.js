import React from 'react';

// Services
import UserService from '../services/UserService';

// CSS
import './Navbar.css'

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            userFullName: "",
            userAccounts: undefined,
            profilePictureURL: undefined,
            activeAccount: sessionStorage.getItem('activeAccount')
        }

        this.switchAccount = this.switchAccount.bind(this);
    }

    componentDidMount() {
        UserService.getUserData()
        .then(res => this.setState({
            userFullName: `${res.firstName} ${res.lastName}`,
            profilePictureURL: res.profilePictureURL,
            userAccounts: res.accounts
        }))
    }

    switchAccount(e) {
        const value = e.target.value.split(',');
        sessionStorage.setItem('activeAccount', value);
        this.setState({ activeAccount: value })

        switch (value[1]) {
            case "student":
                window.location.href = "/student"
                break;
            case "lecturer":
                window.location.href = "/lecturer"
                break;
            case "staff":
                window.location.href = "/staff"
                break;
            default:
                window.location.href = "/"
        }
    }

    render() {
        return (
            <header className="topbar" data-navbarbg="skin6">
                <nav className="navbar top-navbar navbar-expand-md">
                    <div className="navbar-header" data-logobg="skin6">
                        {/* <!-- This is for the sidebar toggle which is visible on mobile only --> */}
                        <span className="nav-toggler waves-effect waves-light d-block d-md-none" onClick={e => e.preventDefault()}><i
                                className="ti-menu ti-close"></i></span>
                        <div className="navbar-brand">
                            {/* <!-- Logo icon --> */}
                            <div>
                                <span className="small-icon">
                                    <img src="/assets/images/logo.png" alt="homepage" className="dark-logo" width="50px"/>
                                    <img src="/assets/images/logo-alt.png" className="light-logo" alt="homepage" width="50px"/>
                                </span>
                                <span className="logo-text">
                                    <img src="/assets/images/logo.png" alt="homepage" className="dark-logo" width="200px"/>
                                    <img src="/assets/images/logo-alt.png" className="light-logo" alt="homepage" width="200px"/>
                                </span>
                            </div>
                        </div>
                        {/* <!-- Toggle which is visible on mobile only --> */}
                        <span className="d-block d-md-none" onClick={e => e.preventDefault()} data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <div className="rounded-circle" style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                                width: 40, 
                                overflow: "hidden", 
                                height: 40, 
                                textAlign: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",
                                backgroundSize: "cover",
                                backgroundImage: `url('${this.state.profilePictureURL ? this.state.profilePictureURL : "/img/user.png"}')`
                            }}/>
                        </span>
                    </div>

                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
                            <li className="nav-item dropdown">
                                <span className="nav-link" style={{paddingRight:0}}>
                                    <i data-feather="user" className="svg-icon" color="rgb(188, 195, 213)"></i>
                                </span>
                            </li>
                            <li className="nav-item d-block d-sm-block">
                                <span className="nav-link" onClick={e => e.preventDefault()}>
                                    <div className="customize-input">
                                        <select value={ this.state.activeAccount } onChange={ this.switchAccount } className="custom-select form-control bg-white custom-radius custom-shadow border-0">
                                            {this.state.userAccounts ?
                                                this.state.userAccounts.map((element) => {
                                                    return <option key={element._id}  value={[element._id, element.accountType]}>{element.name}</option>
                                                })
                                            : <option>Account</option>
                                            }
                                        </select>
                                    </div>
                                </span>
                            </li>
                        </ul>
                        <ul className="navbar-nav float-right">
                            <li className="nav-item">
                                <span className="nav-link d-none d-md-inline-block" onClick={e => e.preventDefault()}>
                                    <div className="rounded-circle" style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                        width: 40, 
                                        overflow: "hidden", 
                                        height: 40, 
                                        textAlign: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center center",
                                        backgroundSize: "cover",
                                        backgroundImage: `url('${this.state.profilePictureURL ? this.state.profilePictureURL : "/img/user.png"}')`
                                    }}/>
                                    <span className="ml-2 d-none d-md-inline-block"><span
                                            className="text-dark">{this.state.userFullName}</span></span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Navbar;