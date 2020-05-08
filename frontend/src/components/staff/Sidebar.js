import React from 'react';

class Sidebar extends React.Component {
    render() {
        return (
            <aside className="left-sidebar" data-sidebarbg="skin6">
                {/* <!-- Sidebar scroll--> */}
                <div className="scroll-sidebar" data-sidebarbg="skin6">
                    {/* <!-- Sidebar navigation--> */}
                    <nav className="sidebar-nav">
                        <ul id="sidebarnav">
                            {/* Dashboard */}
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="/staff"
                                    aria-expanded="false"><i data-feather="home" className="feather-icon"></i><span
                                        className="hide-menu">Dashboard</span></a></li>
                            <li className="list-divider"></li>

                            {/* Course Administration */}
                            <li className="nav-small-cap"><span className="hide-menu">Course Administration</span></li>

                            <li className="sidebar-item"> <a className="sidebar-link" href="ticket-list.html"
                                    aria-expanded="false"><i data-feather="edit-3" className="feather-icon"></i><span
                                        className="hide-menu">Courses
                                    </span></a>
                            </li>
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="app-chat.html"
                                    aria-expanded="false"><i data-feather="grid" className="feather-icon"></i><span
                                        className="hide-menu">Semester Data</span></a></li>
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="app-calendar.html"
                                    aria-expanded="false"><i data-feather="calendar" className="feather-icon"></i><span
                                        className="hide-menu">Scheduling</span></a></li>
                            <li className="list-divider"></li>

                            {/* Account Administration */}
                            <li className="nav-small-cap"><span className="hide-menu">Account Administration</span></li>
                            <li className="sidebar-item"> <a className="sidebar-link" href="ticket-list.html"
                                    aria-expanded="false"><i data-feather="users" className="feather-icon"></i><span
                                        className="hide-menu">User Accounts
                                    </span></a>
                            </li>
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="app-chat.html"
                                    aria-expanded="false"><i data-feather="smile" className="feather-icon"></i><span
                                        className="hide-menu">Staff Accounts</span></a></li>
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="app-calendar.html"
                                    aria-expanded="false"><i data-feather="book" className="feather-icon"></i><span
                                        className="hide-menu">Lecturer Accounts</span></a></li>
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="app-calendar.html"
                                    aria-expanded="false"><i data-feather="user" className="feather-icon"></i><span
                                        className="hide-menu">Student Accounts</span></a></li>
                            <li className="list-divider"></li>

                            {/* System Administration */}
                            <li className="nav-small-cap"><span className="hide-menu">System Administration</span></li>

                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="authentication-login1.html"
                                    aria-expanded="false"><i data-feather="cpu" className="feather-icon"></i><span
                                        className="hide-menu">System Status
                                    </span></a>
                            </li>
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link"
                                    href="authentication-register1.html" aria-expanded="false"><i data-feather="lock"
                                        className="feather-icon"></i><span className="hide-menu">Security Status
                                    </span></a>
                            </li>

                            <li className="sidebar-item"> <span className="sidebar-link has-arrow" onClick={e => e.preventDefault()}
                                    aria-expanded="false"><i data-feather="feather" className="feather-icon"></i><span
                                        className="hide-menu">Icons
                                    </span></span>
                                <ul aria-expanded="false" className="collapse first-level base-level-line">
                                    <li className="sidebar-item"><a href="icon-fontawesome.html" className="sidebar-link"><span
                                                className="hide-menu"> Fontawesome Icons </span></a></li>

                                    <li className="sidebar-item"><a href="/icon-simple-lineicon.html" className="sidebar-link"><span
                                                className="hide-menu"> Simple Line Icons </span></a></li>
                                </ul>
                            </li>

                            <li className="list-divider"></li>
                            <li className="nav-small-cap"><span className="hide-menu">Extra</span></li>
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="../../docs/docs.html"
                                    aria-expanded="false"><i data-feather="edit-3" className="feather-icon"></i><span
                                        className="hide-menu">Documentation</span></a></li>
                            <li className="sidebar-item"> <a className="sidebar-link sidebar-link" href="authentication-login1.html"
                                    aria-expanded="false"><i data-feather="log-out" className="feather-icon"></i><span
                                        className="hide-menu">Logout</span></a></li>
                        </ul>
                    </nav>
                    {/* <!-- End Sidebar navigation --> */}
                </div>
                {/* <!-- End Sidebar scroll--> */}
            </aside>
        );
    }
}

export default Sidebar;