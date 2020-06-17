import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';
import ClassService from '../../../services/ClassService';

// UI Elements
import Preloader from '../../ui-elements/Preloader';
import PageWrapper from '../../ui-elements/PageWrapper';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Card from '../../ui-elements/Card';
import AssignmentSubmissionsModal from './components/AssignmentSubmissionsModal';

class Assignments extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            semesterData: undefined,
            currentUserData: undefined,
            showErrorMessage: false,
            showSuccessMessage: false
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}
    }

    componentDidMount() {
        // Perform session check
        AuthService.isLoggedIn()
            .then(res => {
                if (res.response && (res.response.status === 403))
                    this.setState({
                        isAuthenticating: false,
                        isAuthenticated: false
                    });
                else {
                    this.setState({
                        isAuthenticating: false,
                        isAuthenticated: true
                    })
                    
                    // Load user data
                    UserService.getUserData()
                    .then(res => {
                        this.setState({currentUserData: res});

                        // Load data
                        ClassService.getCourseByLecturerId(localStorage.getItem('universalId'))
                        .then(res => {
                            this.setState({semesterData: res, isLoading: false});
                        }).catch(err => {
                            this.setState({isLoading: false})
                        });
                    });

                }
            });
        
    }

    render() { 
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        return (
            <div>
                <Preloader isLoading={this.state.isLoading}/>
                <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <PageWrapper>
                        <PageBreadcrumb title="Assignments" root="Learning"/>
                        <ContentWrapper>
                            {this.state.semesterData ? this.state.semesterData[this.state.semesterData.length - 1].classes.map((cls, index) => {
                                return (
                                    <Card key={index} title={
                                        <span>{cls.metadata.name} 
                                            <div className="badge badge-primary ml-2">{cls.metadata.class[0].code}</div>
                                            <div className="badge badge-secondary ml-1">{cls.metadata.code}</div>
                                            <div className="badge badge-secondary ml-1">{cls.classCode}</div>
                                            <div className="badge badge-danger ml-1">{cls.assignments.find(assignment => (new Date(assignment.submissionDeadline).getTime() > new Date().getTime())) ? `${cls.assignments.filter(assignment => (new Date(assignment.submissionDeadline).getTime() > new Date().getTime())).length} Due` : null}</div>
                                        </span>} 
                                        padding
                                    >
                                        <div className="table-responsive">
                                            <table id="assignments" className="table table-striped no-wrap">
                                                <thead className="bg-primary text-white">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th style={{width: 170}}>Deadline</th>
                                                        <th style={{width: 150}}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { cls.assignments.length > 0 ?
                                                        cls.assignments.map((assignment, index) => {
                                                            let submissionDeadline = new Date(assignment.submissionDeadline);
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row" style={{verticalAlign: "middle"}}>
                                                                        {assignment.name}
                                                                    </th>
                                                                    <td style={{verticalAlign: "middle"}}>{submissionDeadline.toDateString()} - {`${submissionDeadline.toTimeString().split(" ")[0].substr(0, 5)}`}</td>
                                                                    <td>
                                                                        <a href={assignment.resourceURL} className="btn btn-sm text-white btn-secondary mr-2" target="_blank" rel="noopener noreferrer">Open Task</a>
                                                                        <a href="#viewSubmissions" data-toggle="modal" data-target={`#assignmentSubmissions-${assignment._id}`} className="btn btn-sm text-white btn-success mr-2">Submissions</a>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    : <tr><td colSpan="4" style={{textAlign: "center"}}>There are no assignments available for this class.</td></tr> }
                                                </tbody>
                                            </table>
                                            { cls.assignments.length > 0 ?
                                                cls.assignments.map((assignment) => {
                                                    return <AssignmentSubmissionsModal
                                                                key={assignment._id}
                                                                assignmentId={assignment._id}
                                                                assignmentName={assignment.name}
                                                                submissions = {assignment.submissions}
                                                            />
                                                })
                                            : null }
                                        </div>
                                    </Card>
                                );
                            }) :
                                <Card padding>
                                    <div style={{textAlign: "center"}}>No data</div>
                                </Card>
                            }
                        </ContentWrapper>
                    </PageWrapper>
                </div>
            </div>
        );
    }
}
 
export default withRouter(Assignments);