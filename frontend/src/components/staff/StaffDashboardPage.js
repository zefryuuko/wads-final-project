import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../services/AuthService';
import AccessControlService from '../../services/AccessControlService';

// UI Elements
import MainWrapper from '../ui-elements/MainWrapper';
import PageWrapper from '../ui-elements/PageWrapper';

// Components
import Navbar from '../Navbar';
import Sidebar from './Sidebar'
import Footer from '../Footer';

// Course Administration
import Dashboard from './Dashboard';
import CourseGroups from './courses/CourseGroups';
import CourseList from './courses/CourseList';
import Course from './courses/Course';

import MajorList from './classes/MajorList';
import SemesterList from './classes/SemesterList';
import ClassList from './classes/ClassList';
import Class from './classes/Class';

import AccountList from './user-accounts/AccountList';
import StaffList from './user-accounts/StaffList';
import LecturerList from './user-accounts/LecturerList';
import StudentList from './user-accounts/StudentList';
import Account from './user-accounts/Account';
import CreateAccount from './user-accounts/CreateAccount';
import Profile from '../Profile';

class StaffDashboardPage extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false
        }

        // Set page display mode when loading
        this.loadingStyle = {display: "none"}
        this.loadedStyle = {display: ""}

        // Get current router path
    }
    
    componentDidMount() {
        // Perform session check
        AuthService.isLoggedIn()
        .then(res => {
            if (res.response && (res.response.status === 403))
                this.setState({
                    isLoading: false,
                    isLoggedIn: false
                });
            else
                AccessControlService.hasAccessToPage(localStorage.getItem('universalId'), window.location.pathname)
                .then(status => {
                    if (status)
                        this.setState({
                            isLoading: false,
                            isLoggedIn: true
                        });
                })
        });
    }

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/logout"/>
        const { path } = this.props.match;
        return (
            <MainWrapper>
                <div style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <Navbar />
                    <Sidebar />
                    <Switch>
                        {/* Dashboard */}
                        <Route exact path={path}><Dashboard/></Route>

                        {/* Courses */}
                        <Route exact path={`${path}/courses`}><CourseGroups/></Route>
                        <Route exact path={`${path}/courses/:groupId`}><CourseList/></Route>
                        <Route exact path={`${path}/courses/:groupId/:courseId`}><Course/></Route>

                        {/* Classes */}
                        <Route exact path={`${path}/classes`}><MajorList/></Route>
                        <Route exact path={`${path}/classes/:majorId`}><SemesterList/></Route>
                        <Route exact path={`${path}/classes/:majorId/:semesterId`}><ClassList/></Route>
                        {/* <Route exact path={`${path}/classes/:majorId/:semesterId/:classId`}><ClassList/></Route> */}
                        <Route exact path={`${path}/classes/:majorId/:semesterId/:classId/:courseId`}><Class/></Route>

                        {/* Accounts */}
                        <Route exact path={`${path}/accounts`}><AccountList/></Route>
                        <Route exact path={`${path}/accounts/staff`}><StaffList/></Route>
                        <Route exact path={`${path}/accounts/lecturer`}><LecturerList/></Route>
                        <Route exact path={`${path}/accounts/student`}><StudentList/></Route>
                        <Route exact path={`${path}/accounts/create`}><CreateAccount/></Route>
                        <Route exact path={`${path}/accounts/:accountId`}><Account/></Route>

                        {/* Profile */}
                        <Route exact path={`${path}/profile`}><Profile/></Route>
                    </Switch>
                    <PageWrapper><Footer/></PageWrapper>
                </div>
            </MainWrapper>
        );
    }
}
 
export default withRouter(StaffDashboardPage);