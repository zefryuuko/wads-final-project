import React, { Component } from 'react';
import {Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
// import CourseService from '../../../services/CourseService';

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

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            classData: undefined,
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
                else
                    this.setState({
                        isAuthenticating: false,
                        isAuthenticated: true
                    })
            });

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
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/"/>
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
                                        <div class="col-12">
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
                                                <table id="sharedMaterials" className="table table-striped no-wrap">
                                                    <thead className="bg-primary text-white">
                                                        <th style={{width: 200}}>Date Added</th>
                                                        <th>Name</th>
                                                        <th>Added By</th>
                                                        <th style={{width: 40}}><i className="feather-icon" data-feather="file"/></th>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">12 March 2020</th>
                                                            <td>How to use React framework</td>
                                                            <td>Muhammad Yesus</td>
                                                            <td><a href="https://google.com" target="_blank" rel="noopener noreferrer"><i className="feather-icon" data-feather="download"/></a></td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">7 March 2020</th>
                                                            <td>Why Angular sucks</td>
                                                            <td>Muhammad Yesus</td>
                                                            <td><a href="https://google.com" target="_blank" rel="noopener noreferrer"><i className="feather-icon" data-feather="download"/></a></td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">1 March 2020</th>
                                                            <td>SSH is good</td>
                                                            <td>Muhammad Yesus</td>
                                                            <td><a href="https://google.com" target="_blank" rel="noopener noreferrer"><i className="feather-icon" data-feather="external-link"/></a></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
                                                TODO: Load assignments
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