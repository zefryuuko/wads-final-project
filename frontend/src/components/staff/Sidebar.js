import React from 'react';
import {Link} from 'react-router-dom';

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
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/staff"
                                    aria-expanded="false"><i data-feather="home" className="feather-icon"></i><span
                                        className="hide-menu">Dashboard</span></Link></li>
                            <li className="list-divider"></li>

                            {/* Course Administration */}
                            <li className="nav-small-cap"><span className="hide-menu">Course Administration</span></li>

                            <li className="sidebar-item"> <Link className="sidebar-link" to="/staff/courses"
                                    aria-expanded="false"><i data-feather="edit-3" className="feather-icon"></i><span
                                        className="hide-menu">Courses
                                    </span></Link>
                            </li>
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/staff/classes/"
                                    aria-expanded="false"><i data-feather="grid" className="feather-icon"></i><span
                                        className="hide-menu">Classes</span></Link></li>
                            <li className="list-divider"></li>

                            {/* Account Administration */}
                            <li className="nav-small-cap"><span className="hide-menu">Account Administration</span></li>
                            <li className="sidebar-item"> <Link className="sidebar-link" to="/staff/accounts"
                                    aria-expanded="false"><i data-feather="users" className="feather-icon"></i><span
                                        className="hide-menu">User Accounts
                                    </span></Link>
                            </li>
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/staff/accounts/staff"
                                    aria-expanded="false"><i data-feather="smile" className="feather-icon"></i><span
                                        className="hide-menu">Staff Accounts</span></Link></li>
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/staff/accounts/lecturer"
                                    aria-expanded="false"><i data-feather="book" className="feather-icon"></i><span
                                        className="hide-menu">Lecturer Accounts</span></Link></li>
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/staff/accounts/student"
                                    aria-expanded="false"><i data-feather="user" className="feather-icon"></i><span
                                        className="hide-menu">Student Accounts</span></Link></li>
                            <li className="list-divider"></li>

                            {/* System Administration */}
                            <li className="nav-small-cap"><span className="hide-menu">System Administration</span></li>

                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/staff/system-status"
                                    aria-expanded="false"><i data-feather="cpu" className="feather-icon"></i><span
                                        className="hide-menu">System Status
                                    </span></Link>
                            </li>
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link"
                                    to="/staff/security-status" aria-expanded="false"><i data-feather="lock"
                                        className="feather-icon"></i><span className="hide-menu">Security Status
                                    </span></Link>
                            </li>

                            <li className="list-divider"></li>
                            <li className="nav-small-cap"><span className="hide-menu">Extra</span></li>
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="authentication-login1.html"
                                    aria-expanded="false"><i data-feather="log-out" className="feather-icon"></i><span
                                        className="hide-menu">Logout</span></Link></li>
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