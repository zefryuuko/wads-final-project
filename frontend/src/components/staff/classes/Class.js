import React from 'react'
import {Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import ClassService from '../../../services/ClassService';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Breadcrumb from '../../ui-elements/Breadcrumb';
import Card from '../../ui-elements/Card';
// import Table from '../../ui-elements/Table';
// import Button from '../../ui-elements/Button';
import CourseDescription from '../../ui-elements/CourseDescription';
import LearningOutcomes from '../../ui-elements/LearningOutcomes';
import Evaluation from '../../ui-elements/Evaluation';
import EnrollStudentModal from './components/EnrollStudentModal';

// Components

class Class extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false,
            currentTablePage: 1,
            currentTableContent: undefined,
            pageTitle: "Loading...",
            semesterName: "Loading..."
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.reloadTable = this.reloadTable.bind(this);
    }

    reloadTable() {
        ClassService.getSemesters(this.props.match.params.majorId, this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({
                currentSemester: res.name
            });
        });

        ClassService.getClasses(this.props.match.params.semesterId, this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({
                semesterName: `${res.period} ${res.name}`,
            });
        });

        ClassService.getClass(this.props.match.params.semesterId, this.props.match.params.classId, this.props.match.params.courseId).then(res => {
            // TODO: add error validation
            this.setState({
                pageTitle: `${res.metadata.name}`,
                currentTableContent: res,
            });
        });
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
        
        ClassService.getSemesters(this.props.match.params.majorId, this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({
                currentSemester: res.name
            });
        });

        ClassService.getClasses(this.props.match.params.semesterId, this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({
                semesterName: `${res.period} ${res.name}`,
            });
        });

        ClassService.getClass(this.props.match.params.semesterId, this.props.match.params.classId, this.props.match.params.courseId).then(res => {
            // TODO: add error validation
            this.setState({
                pageTitle: `${res.metadata.name}`,
                currentTableContent: res,
            });
        });
    }

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/"/>
        return (
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb 
                        title={this.state.pageTitle} 
                        root="Course Administration" 
                        breadcrumb={<Breadcrumb 
                            current={this.state.currentTableContent ? `${this.state.currentTableContent.classCode} - ${this.state.currentTableContent.courseCode}` : "Loading..."} 
                            contents={[{name: "Course Administration", url: ""}, {name: "Classes", url: "/staff/classes"}, {name: this.state.currentSemester, url: `/staff/classes/${this.props.match.params.majorId}`}, {name: this.state.semesterName, url: `/staff/classes/${this.props.match.params.majorId}/${this.props.match.params.semesterId}`}]}/>
                        }/>
                    <ContentWrapper>
                        <div className="row">
                            <div className="col-12">
                                <CourseDescription data={this.state.currentTableContent ? this.state.currentTableContent.metadata.description : undefined}/>
                                <LearningOutcomes data={this.state.currentTableContent ? this.state.currentTableContent.metadata.learningOutcomes : undefined}/>
                                <Card padding>
                                    <Evaluation data={this.state.currentTableContent ? this.state.currentTableContent.metadata.class[0].evaluation : undefined}/>
                                </Card>
                                <Card title="Students" padding>
                                    <div className="table-responsive">
                                        <table id="studentsTable" className="table table-striped no-wrap">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.currentTableContent && this.state.currentTableContent.students.length > 0  ? this.state.currentTableContent.students.map(row => {
                                                    return (
                                                        <tr key={row.universalId}>
                                                            <th scope="row" style={{width: 200}}>{row.universalId}</th>
                                                            <td>{row.name}</td>
                                                            <td style={{width: 100}}><button className="btn btn-danger">Remove</button></td>
                                                        </tr>
                                                    )
                                                }) : <tr><td colSpan="3" style={{textAlign: "center"}}>There are no students assigned to this class.</td></tr> }
                                            </tbody>
                                            {this.state.currentTableContent ? <script>{ window.loadTable('#studentsTable') }</script> : null}
                                        </table>
                                    </div>
                                    <div className="float-right mt-2">
                                        <button className="btn btn-secondary" data-toggle="modal" data-target="#enrollStudentModal">Enroll Student</button>
                                        <button className="btn btn-primary ml-2">Save changes</button>
                                    </div>
                                </Card>
                                <Card title="Add dis crap" padding>
                                    Lecturers, Schedule
                                </Card>
                            </div>
                        </div>
                    </ContentWrapper>
                </PageWrapper>
                
                {/* Generate EnrollStudentModal */}
                { this.state.currentTableContent ? 
                    <EnrollStudentModal enrolledStudents={this.state.currentTableContent.students}/>
                : null }
            </div>

        );
    }
}

export default withRouter(Class);