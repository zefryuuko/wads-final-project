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

// Pages
import Dashboard from './Dashboard';
import Courses from './courses/Courses';
import Course from './courses/Course';
import Assignments from './courses/Assignments';
import Grades from './Grades';
import Profile from '../Profile';
import PageNotFound from '../PageNotFound';

class Student extends Component {
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

                        {/* Learning */}
                        <Route exact path={`${path}/courses`}><Courses/></Route>
                        <Route exact path={`${path}/courses/:semesterId/:classCode/:courseCode`}><Course/></Route>
                        <Route exact path={`${path}/assignments`}><Assignments/></Route>

                        {/* Assignments */}
                        <Route exact path={`${path}/grades`}><Grades/></Route>

                        {/* Account */}
                        <Route exact path={`${path}/profile`}><Profile/></Route>

                        {/* Error Pages */}
                        <Route><PageNotFound/></Route>
                    </Switch>
                    <PageWrapper><Footer/></PageWrapper>
                </div>
            </MainWrapper>
        );
    }
}
 
export default withRouter(Student);