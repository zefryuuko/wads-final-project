import React from 'react';

// Services
import UserService from '../services/UserService';

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            userFullName: "",
            userAccounts: undefined,
            profilePictureURL: undefined,
            activeAccount: localStorage.getItem('activeAccount')
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
        localStorage.setItem('activeAccount', value);
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
                            <a href="index.html">
                                <b className="logo-icon">
                                    {/* <img src="/assets/images/logo.png" alt="homepage" className="dark-logo" />
                                    <img src="/assets/images/logo-alt.png" alt="homepage" className="light-logo" /> */}
                                </b>
                                <span className="logo-text">
                                    <img src="/assets/images/logo.png" alt="homepage" className="dark-logo" width="200px"/>
                                    <img src="/assets/images/logo-alt.png" className="light-logo" alt="homepage" width="200px"/>
                                </span>
                            </a>
                        </div>
                        {/* <!-- Toggle which is visible on mobile only --> */}
                        <span className="topbartoggler d-block d-md-none waves-effect waves-light" onClick={e => e.preventDefault()}
                            data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i
                                className="ti-more"></i></span>
                    </div>

                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
                            <li className="nav-item dropdown">
                                <span className="nav-link" style={{paddingRight:0}}>
                                    <i data-feather="user" className="svg-icon" color="rgb(188, 195, 213)"></i>
                                </span>
                            </li>
                            <li className="nav-item d-md-block">
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
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" onClick={e => e.preventDefault()} data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <img src={`${this.state.profilePictureURL ? this.state.profilePictureURL : "/img/user.png"}`} alt="user" className="rounded-circle"
                                        width="40"/>
                                    <span className="ml-2 d-none d-lg-inline-block"><span
                                            className="text-dark">{this.state.userFullName}</span> <i data-feather="chevron-down"
                                            className="svg-icon"></i></span>
                                </span>
                                <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                                    <span className="dropdown-item" onClick={e => e.preventDefault()}><i data-feather="user"
                                            className="svg-icon mr-2 ml-1"></i>
                                        My Profile</span>
                                    <span className="dropdown-item" onClick={e => e.preventDefault()}><i data-feather="credit-card"
                                            className="svg-icon mr-2 ml-1"></i>
                                        My Balance</span>
                                    <span className="dropdown-item" onClick={e => e.preventDefault()}><i data-feather="mail"
                                            className="svg-icon mr-2 ml-1"></i>
                                        Inbox</span>
                                    <div className="dropdown-divider"></div>
                                    <span className="dropdown-item" onClick={e => e.preventDefault()}><i data-feather="settings"
                                            className="svg-icon mr-2 ml-1"></i>
                                        Account Setting</span>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/logout"><i data-feather="power"
                                            className="svg-icon mr-2 ml-1"></i>
                                        Logout</a>
                                    <div className="dropdown-divider"></div>
                                    <div className="pl-4 p-3"><span onClick={e => e.preventDefault()} className="btn btn-sm btn-info">View
                                            Profile</span></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Navbar;