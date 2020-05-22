import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';
import FileService from '../../../services/FileService';

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
import AddResourceModal from './components/AddResourceModal';
import AddAssignmentModal from './components/AddAssignmentModal';

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
        this.loadClassData = this.loadClassData.bind(this);
    }

    loadClassData() {
        ClassService.getClass(
            this.props.match.params.semesterId,
            this.props.match.params.classCode,
            this.props.match.params.courseCode
        ).then(res => {
            this.setState({classData: res, isLoading: false});
        }).catch(err => {

        });
    }

    deleteResource(resourceId, fileUrl) {
        // Delete data from DB
        ClassService.deleteSharedResources(
            this.props.match.params.semesterId,
            this.props.match.params.classCode,
            this.props.match.params.courseCode,
            resourceId
        )
        .then(res => {
            // Remove data if data is on firebase
            if (fileUrl.includes("z-gcp-wads.appspot.com")) {
                FileService.deleteFile(fileUrl, () => {
                    this.loadClassData();
                })
            } else {
                this.loadClassData();
                window.alert("Resource deleted successfully.")
            }
        })
        .catch(err => {
            window.alert("An error has occurred when trying to remove the data. Please try again.")
        })
    }

    deleteAssignment(resourceId, fileUrl) {
        // Delete data from DB
        ClassService.deleteAssignment(
            this.props.match.params.semesterId,
            this.props.match.params.classCode,
            this.props.match.params.courseCode,
            resourceId
        )
        .then(res => {
            // Remove data if data is on firebase
            if (fileUrl.includes("z-gcp-wads.appspot.com")) {
                FileService.deleteFile(fileUrl, () => {
                    this.loadClassData();
                })
            } else {
                this.loadClassData();
                window.alert("Assignment deleted successfully.")
            }
        })
        .catch(err => {
            window.alert("An error has occurred when trying to remove the data. Please try again.")
        })
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
                else
                    this.setState({
                        isAuthenticating: false,
                        isAuthenticated: true
                    })
            });

        UserService.getUserData().then(res => {
            UserService.getUserData()
            .then(res => {
                if (res.firstName)
                    this.setState({
                        currentUserData: res
                    })
            });
        })

        ClassService.getClass(
            this.props.match.params.semesterId,
            this.props.match.params.classCode,
            this.props.match.params.courseCode
        ).then(res => {
            this.setState({classData: res, isLoading: false});
        }).catch(err => {

        });
    }

    render() { 
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        return ( 
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title={this.state.classData ? <span>{this.state.classData.metadata.name}<span className="badge badge-primary ml-2">{this.state.classData.classType}</span></span> : "Loading..."} breadcrumb={<Breadcrumb current={this.props.match.params.courseCode} contents={[{name: "Learning", url: ""}, {name: "Courses", url: "/lecturer/courses"}, {name: this.props.match.params.classCode, url: ""}]}/>}/>
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
                                            <Card title="Shared Resources" right={<a href="#addMaterials" data-toggle="modal" data-target="#addResourceModal">Add New Resource</a>} padding>
                                                <div className="table-responsive">
                                                    <table id="sharedMaterials" className="table table-striped no-wrap">
                                                        <thead className="bg-primary text-white">
                                                            <tr>
                                                                <th style={{width: 200}}>Date Added</th>
                                                                <th>Name</th>
                                                                <th>Added By</th>
                                                                <th style={{width: 40}}><i className="feather-icon" data-feather="file"/></th>
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
                                                                                {resource.addedBy.universalId === (this.state.currentUserData ? this.state.currentUserData.id : null) ? 
                                                                                    <span> - <a href="#deleteMaterial" onClick={() => {
                                                                                        let isConfirmed = window.confirm(`Are you sure you want to delete '${resource.name}'? This action cannot be undone.`);
                                                                                        if (isConfirmed) this.deleteResource(resource._id, resource.url);
                                                                                    }}>Delete</a></span> 
                                                                                : null}
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
                                                { this.state.currentUserData ? 
                                                    <AddResourceModal 
                                                        authorUniversalId={this.state.currentUserData.id} 
                                                        authorName={`${this.state.currentUserData.firstName} ${this.state.currentUserData.lastName}`}
                                                        semesterId={this.props.match.params.semesterId}
                                                        classCode={this.props.match.params.classCode}
                                                        courseCode={this.props.match.params.courseCode}
                                                        onSuccess={this.loadClassData}
                                                        forceRefresh={new Date()}
                                                    /> 
                                                : null }
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
                                            <Card title="Assignments" right={<a href="#createAssignment" data-toggle="modal" data-target="#addAssignmentModal">Create Assignment</a>} padding>
                                                <div className="table-responsive">
                                                    <table id="assignments" className="table table-striped no-wrap">
                                                        <thead className="bg-primary text-white">
                                                            <tr>
                                                                <th>Name</th>
                                                                <th style={{width: 170}}>Deadline</th>
                                                                <th style={{width: 170}}>Actions</th>
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
                                                                                    <span> - <a href="#deleteMaterial" 
                                                                                        style={{fontWeight: "initial"}}
                                                                                        onClick={() => {
                                                                                            let isConfirmed = window.confirm(`Are you sure you want to delete '${assignment.name}'? This action cannot be undone.`);
                                                                                            if (isConfirmed) this.deleteAssignment(assignment._id, assignment.resourceURL);
                                                                                        }}
                                                                                    >Delete</a></span> 
                                                                            </th>
                                                                            <td>{submissionDeadline.toDateString()} - {`${submissionDeadline.toTimeString().split(" ")[0].substr(0, 5)}`}</td>
                                                                            <td>
                                                                                <a href={assignment.resourceURL} className="btn btn-sm text-white btn-secondary mr-2" target="_blank" rel="noopener noreferrer">Open Task</a>
                                                                                <a href="#viewSubmissions" className="btn btn-sm text-white btn-success" target="_blank" rel="noopener noreferrer">Submissions</a>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })
                                                            : <tr><td colSpan="4" style={{textAlign: "center"}}>There are no shared resources available for this class.</td></tr> }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                { this.state.currentUserData ? 
                                                    <AddAssignmentModal 
                                                        authorUniversalId={this.state.currentUserData.id} 
                                                        authorName={`${this.state.currentUserData.firstName} ${this.state.currentUserData.lastName}`}
                                                        semesterId={this.props.match.params.semesterId}
                                                        classCode={this.props.match.params.classCode}
                                                        courseCode={this.props.match.params.courseCode}
                                                        onSuccess={this.loadClassData}
                                                        forceRefresh={new Date()}
                                                    /> 
                                                : null }
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
                                                <Table header={["ID", "Name"]}>
                                                    {this.state.classData && this.state.classData.lecturers.length > 0 ? this.state.classData.lecturers
                                                        .sort((a, b) => a.name[0] > b.name[0] ? 1 : -1)
                                                        .map(lecturer => {
                                                        return <tr key={lecturer.universalId}>
                                                            <th scope="row" style={{width: 200}}>{lecturer.universalId}</th>
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
                                                <Table header={["ID", "Name"]}>
                                                    {this.state.classData && this.state.classData.students.length > 0 ? this.state.classData.students
                                                        .sort((a, b) => a.name[0] > b.name[0] ? 1 : -1)
                                                        .map(student => {
                                                        return <tr key={student.universalId}>
                                                            <th scope="row" style={{width: 200}}>{student.universalId}</th>
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