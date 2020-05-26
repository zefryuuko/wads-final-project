import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';

// UI Elements
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Breadcrumb from '../../ui-elements/Breadcrumb';
import Card from '../../ui-elements/Card';
import Tab from '../../ui-elements/Tab';
// import Table from '../../ui-elements/Table';
// import Button from '../../ui-elements/Button';
import PageWrapper from '../../ui-elements/PageWrapper';
import LearningOutcomes from '../../ui-elements/LearningOutcomes';
import CourseDescription from '../../ui-elements/CourseDescription';
// import Textbooks from '../../ui-elements/Textbooks';
import Evaluation from '../../ui-elements/Evaluation';
// import ErrorAlert from '../../ui-elements/ErrorAlert';
// import SuccessAlert from '../../ui-elements/SuccessAlert';
import ClassService from '../../../services/ClassService';
import Table from '../../ui-elements/Table';
import SubmitAssignmentModal from './components/SubmitAssignmentModal';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            classData: undefined,
            currentUserData: undefined,
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.reloadData = this.reloadData.bind(this);
    }

    reloadData() {
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
                });
                
                // Load current user data
                UserService.getUserData()
                .then(res => {
                    this.setState({currentUserData: res})

                    // Load class data
                    ClassService.getClass(
                        this.props.match.params.semesterId,
                        this.props.match.params.classCode,
                        this.props.match.params.courseCode
                    ).then(res => {
                        // Load profile picture URLs
                        res.students.forEach(element => {
                            UserService.getProfilePictureURL(element.universalId)
                            .then(res => {
                                this.setState({
                                    [`profile${element.universalId}`]: res
                                });
                            })
                        });

                        res.lecturers.forEach(element => {
                            UserService.getProfilePictureURL(element.universalId)
                            .then(res => {
                                this.setState({
                                    [`profile${element.universalId}`]: res
                                });
                            })
                        });

                        this.setState({classData: res, isLoading: false});
                    }).catch(err => {
            
                    });
                });
            }
        });
    }

    componentDidMount() {
        this.reloadData()
    }

    render() { 
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        return ( 
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title={this.state.classData ? <span>{this.state.classData.metadata.name}<span className="badge badge-primary ml-2">{this.state.classData.classType}</span></span> : "Loading..."} breadcrumb={<Breadcrumb current={this.props.match.params.courseCode} contents={[{name: "Learning", url: ""}, {name: "Courses", url: "/student/courses"}, {name: this.props.match.params.classCode, url: ""}]}/>}/>
                    <ContentWrapper>
                        <Tab data ={[
                            {
                                name: "Course Info",
                                component: <div>
                                    <div className="row">
                                        <div className="col-12">
                                            <CourseDescription data={this.state.classData ? this.state.classData.metadata.description : null} scu={this.state.classData ? this.state.classData.metadata.scu : undefined}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <LearningOutcomes data={this.state.classData ? this.state.classData.metadata.learningOutcomes : null}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <Card padding>
                                                <Evaluation data={this.state.classData ? this.state.classData.metadata.class[0].evaluation : null} loData={this.state.classData ? this.state.classData.metadata.learningOutcomes : null}/>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            },
                            {
                                name: "Shared Resources",
                                component: <div>
                                    <div className="row">
                                        <div className="col-12">
                                            <Card title="Shared Resources" padding>
                                                <div className="table-responsive">
                                                    <table id="sharedMaterials" className="table table-striped no-wrap">
                                                        <thead className="bg-primary text-white">
                                                            <tr>
                                                                <th style={{width: 200}}>Date Added</th>
                                                                <th>Name</th>
                                                                <th>Added By</th>
                                                                <th style={{width: 70}}><i className="feather-icon" data-feather="file"/></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            { this.state.classData && this.state.classData.sharedResources.length > 0 ?
                                                                    this.state.classData.sharedResources.map((resource, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <th scope="row">{new Date(resource.dateAdded).toDateString()}</th>
                                                                                <td>
                                                                                    {resource.name}
                                                                                </td>
                                                                                <td>{resource.addedBy.name}</td>
                                                                                <td><a href={resource.url} target="_blank" rel="noopener noreferrer"><i className=" fas fa-external-link-alt"/></a></td>
                                                                            </tr>
                                                                        );
                                                                    })
                                                            : <tr><td colSpan="4" style={{textAlign: "center"}}>There are no shared resources available for this class.</td></tr> }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            },
                            {
                                name: "Assignments",
                                component: <div>
                                    <div className="row">
                                        <div className="col-12">
                                            <Card title="Assignments" padding>
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
                                                            { this.state.classData && this.state.classData.assignments.length > 0 ?
                                                                this.state.classData.assignments.map((assignment, index) => {
                                                                    let submissionDeadline = new Date(assignment.submissionDeadline);
                                                                    return (
                                                                        <tr key={index}>
                                                                            <th scope="row">
                                                                                {assignment.name}
                                                                            </th>
                                                                            <td>{submissionDeadline.toDateString()} - {`${submissionDeadline.toTimeString().split(" ")[0].substr(0, 5)}`}</td>
                                                                            <td>
                                                                                <a href={assignment.resourceURL} className="btn btn-sm text-white btn-secondary mr-2" target="_blank" rel="noopener noreferrer">Open Task</a>
                                                                                <a href="#viewSubmissions" data-toggle="modal" data-target={`#submissions-${assignment._id}`} className="btn btn-sm text-white btn-success mr-2">Submissions</a>
                                                                                <a href="#submitAssignment" data-toggle="modal" data-target={`#submitAssignment-${assignment._id}`} className="btn btn-sm text-white btn-primary">Submit</a>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            : <tr><td colSpan="4" style={{textAlign: "center"}}>There are no shared resources available for this class.</td></tr> }
                                                        </tbody>
                                                    </table>
                                                    { this.state.classData && this.state.classData.assignments.length > 0 ?
                                                        this.state.classData.assignments.map((assignment) => {
                                                            return <SubmitAssignmentModal 
                                                                        key={assignment._id} 
                                                                        id={assignment._id}
                                                                        studentId={this.state.currentUserData.id}
                                                                        studentName={`${this.state.currentUserData.firstName} ${this.state.currentUserData.lastName}`}
                                                                        assignmentName={assignment.name}
                                                                        semesterId={this.props.match.params.semesterId}
                                                                        classCode={this.props.match.params.classCode}
                                                                        courseCode={this.props.match.params.courseCode}
                                                                        onSuccess={this.reloadData}
                                                                        forceRefresh={new Date()}
                                                                    />
                                                        })
                                                    : null}
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            },
                            {
                                name: "People",
                                component: <div>
                                    <div className="row">
                                        <div className="col-12">
                                            <Card title="Lecturers" padding>
                                                <Table header={["ID", "", "Name"]}>
                                                    {this.state.classData && this.state.classData.lecturers.length > 0 ? this.state.classData.lecturers
                                                        .sort((a, b) => a.name[0] > b.name[0] ? 1 : -1)
                                                        .map(lecturer => {
                                                        return <tr key={lecturer.universalId}>
                                                            <th scope="row" style={{width: 200}}>{lecturer.universalId}</th>
                                                            <td width="40">
                                                                {this.state[`profile${lecturer.universalId}`] ?
                                                                    <img alt="" src={this.state[`profile${lecturer.universalId}`]} className="rounded-circle" width="40"/>
                                                                : <span style={{width: 30}}></span>}
                                                            </td>
                                                            <td>{lecturer.name}</td>
                                                        </tr>
                                                    })
                                                    : <tr><td colSpan="2" style={{textAlign: "center"}}>There are no lecturer assigned to this class.</td></tr>}
                                                </Table>
                                            </Card>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <Card title="Students" padding>
                                                <Table header={["ID", "", "Name"]}>
                                                    {this.state.classData && this.state.classData.students.length > 0 ? this.state.classData.students
                                                        .sort((a, b) => a.name[0] > b.name[0] ? 1 : -1)
                                                        .map(student => {
                                                        return <tr key={student.universalId}>
                                                            <th scope="row" style={{width: 200}}>{student.universalId}</th>
                                                            <td width="40">
                                                                {this.state[`profile${student.universalId}`] ?
                                                                    <img alt="" src={this.state[`profile${student.universalId}`]} className="rounded-circle" width="40"/>
                                                                : <span style={{width: 30}}></span>}
                                                            </td>
                                                            <td>{student.name}</td>
                                                        </tr>
                                                    })
                                                    : <tr><td colSpan="2" style={{textAlign: "center"}}>There are no student assigned to this class.</td></tr>}
                                                </Table>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            }
                        ]}/>
                    </ContentWrapper>
                </PageWrapper>
            </div>
         );
    }
}
 
export default withRouter(Course);