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
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/lecturer"
                                    aria-expanded="false"><i data-feather="home" className="feather-icon"></i><span
                                        className="hide-menu">Dashboard</span></Link></li>
                            <li className="list-divider"></li>

                            {/* Course Administration */}
                            <li className="nav-small-cap"><span className="hide-menu">Learning</span></li>

                            <li className="sidebar-item"> <Link className="sidebar-link" to="/lecturer/courses"
                                    aria-expanded="false"><i data-feather="edit-3" className="feather-icon"></i><span
                                        className="hide-menu">Courses
                                    </span></Link>
                            </li>
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/lecturer/assignments/"
                                    aria-expanded="false"><i data-feather="grid" className="feather-icon"></i><span
                                        className="hide-menu">Assignments</span></Link></li>
                            <li className="list-divider"></li>

                            <li className="nav-small-cap"><span className="hide-menu">Account</span></li>
                            <li className="sidebar-item"> <Link className="sidebar-link sidebar-link" to="/staff/student-accounts"
                                    aria-expanded="false"><i data-feather="user" className="feather-icon"></i><span
                                        className="hide-menu">Profile</span></Link></li>
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