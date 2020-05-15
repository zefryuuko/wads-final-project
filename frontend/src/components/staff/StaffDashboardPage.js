import React, { Component } from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../services/AuthService';

// UI Elements
import MainWrapper from '../ui-elements/MainWrapper';
import PageWrapper from '../ui-elements/PageWrapper';

// Components
import Preloader from '../Preloader';
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
                    this.setState({
                        isLoading: false,
                        isLoggedIn: true
                    })
            });
    }

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/"/>
        const { path } = this.props.match;
        return (
            <MainWrapper>
                <Preloader/>
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
                    </Switch>
                    <PageWrapper><Footer/></PageWrapper>
                </div>
            </MainWrapper>
        );
    }
}
 
export default withRouter(StaffDashboardPage);