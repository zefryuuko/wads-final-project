import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <header className="topbar" data-navbarbg="skin6">
                <nav className="navbar top-navbar navbar-expand-md">
                    <div className="navbar-header" data-logobg="skin6">
                        {/* <!-- This is for the sidebar toggle which is visible on mobile only --> */}
                        <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)"><i
                                className="ti-menu ti-close"></i></a>
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
                        <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)"
                            data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i
                                className="ti-more"></i></a>
                    </div>

                    <div className="navbar-collapse collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav float-left mr-auto ml-3 pl-1">
                            <li className="nav-item dropdown">
                                <span className="nav-link" style={{paddingRight:0}}>
                                    <i data-feather="user" className="svg-icon" color="rgb(188, 195, 213)"></i>
                                </span>
                            </li>
                            <li className="nav-item d-none d-md-block">
                                <a className="nav-link" href="javascript:void(0)">
                                    <div className="customize-input">
                                        <select
                                            className="custom-select form-control bg-white custom-radius custom-shadow border-0">
                                            <option defaultValue>Staff</option>
                                            <option value="1">Student</option>
                                            <option value="2">Lecturer</option>
                                            <option value="3">BE</option>
                                        </select>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav float-right">
                            <li className="nav-item d-none d-md-block">
                                <a className="nav-link" href="javascript:void(0)">
                                    <form>
                                        <div className="customize-input">
                                            <input className="form-control custom-shadow custom-radius border-0 bg-white"
                                                type="search" placeholder="Search" aria-label="Search"/>
                                            <i className="form-control-icon" data-feather="search"></i>
                                        </div>
                                    </form>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <img src="/assets/images/users/profile-pic.jpg" alt="user" className="rounded-circle"
                                        width="40"/>
                                    <span className="ml-2 d-none d-lg-inline-block"><span>Hello,</span> <span
                                            className="text-dark">Jason Doe</span> <i data-feather="chevron-down"
                                            className="svg-icon"></i></span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                                    <a className="dropdown-item" href="javascript:void(0)"><i data-feather="user"
                                            className="svg-icon mr-2 ml-1"></i>
                                        My Profile</a>
                                    <a className="dropdown-item" href="javascript:void(0)"><i data-feather="credit-card"
                                            className="svg-icon mr-2 ml-1"></i>
                                        My Balance</a>
                                    <a className="dropdown-item" href="javascript:void(0)"><i data-feather="mail"
                                            className="svg-icon mr-2 ml-1"></i>
                                        Inbox</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="javascript:void(0)"><i data-feather="settings"
                                            className="svg-icon mr-2 ml-1"></i>
                                        Account Setting</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="javascript:void(0)"><i data-feather="power"
                                            className="svg-icon mr-2 ml-1"></i>
                                        Logout</a>
                                    <div className="dropdown-divider"></div>
                                    <div className="pl-4 p-3"><a href="javascript:void(0)" className="btn btn-sm btn-info">View
                                            Profile</a></div>
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