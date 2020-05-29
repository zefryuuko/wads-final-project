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
import Preloader from '../../ui-elements/Preloader';
import CourseDescription from '../../ui-elements/CourseDescription';
import LearningOutcomes from '../../ui-elements/LearningOutcomes';
import Evaluation from '../../ui-elements/Evaluation';
import EnrollStudentModal from './components/EnrollStudentModal';
import SuccessAlert from '../../ui-elements/SuccessAlert';
import ErrorAlert from '../../ui-elements/ErrorAlert';
import EnrollLecturerModal from './components/EnrollLecturerModal';

// Components

class Class extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            currentTablePage: 1,
            currentTableContent: undefined,
            pageTitle: "Loading...",
            semesterName: "Loading...",
            showErrorMessage: false,
            showSuccessMessage: false,
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.reloadTable = this.reloadTable.bind(this);
        this.enrollStudent = this.enrollStudent.bind(this);
        this.enrollLecturer = this.enrollLecturer.bind(this);
        this.removeStudent = this.removeStudent.bind(this);
        this.removeLecturer = this.removeLecturer.bind(this);
        this.updateSuccess = this.updateSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.saveStudentsList = this.saveStudentsList.bind(this);
        this.saveLecturerList = this.saveLecturerList.bind(this);
    }

    reloadTable() {
        this.setState({isLoading: true});
        ClassService.getSemesters(this.props.match.params.majorId, this.state.currentTablePage).then(res => {
            this.setState({
                currentSemester: res.name
            });

            ClassService.getClasses(this.props.match.params.semesterId, this.state.currentTablePage).then(res => {
                this.setState({
                    semesterName: `${res.period} ${res.name}`,
                });

                ClassService.getClass(this.props.match.params.semesterId, this.props.match.params.classId, this.props.match.params.courseId).then(res => {
                    this.setState({
                        pageTitle: `${res.metadata.name}`,
                        currentTableContent: res,
                        isLoading: false
                    });
                });
            });
        });
    }

    updateSuccess() {
        this.setState({showSuccessMessage: true, showErrorMessage: false});
        this.reloadTable();
    }

    showError() {
        this.setState({showErrorMessage: true, showSuccessMessage: false});
    }

    enrollStudent(universalId, name) {
        this.setState(prevState => {
            let currentTableContent = JSON.parse(JSON.stringify(prevState.currentTableContent));
            currentTableContent.students = [...currentTableContent.students, {universalId, name}];
            return { currentTableContent }
        })
    }

    enrollLecturer(universalId, name) {
        this.setState(prevState => {
            let currentTableContent = JSON.parse(JSON.stringify(prevState.currentTableContent));
            currentTableContent.lecturers = [...currentTableContent.lecturers, {universalId, name}];
            return { currentTableContent }
        })
    }

    removeStudent(e) {
        const { id } = e.target;
        this.setState(prevState => {
            let currentTableContent = JSON.parse(JSON.stringify(prevState.currentTableContent));
            currentTableContent.students = currentTableContent.students.filter(element => {
                return element.universalId !== id;
            });
            return { currentTableContent }
        });
    }

    removeLecturer(e) {
        const { id } = e.target;
        this.setState(prevState => {
            let currentTableContent = JSON.parse(JSON.stringify(prevState.currentTableContent));
            currentTableContent.lecturers = currentTableContent.lecturers.filter(element => {
                return element.universalId !== id;
            });
            return { currentTableContent }
        });
    }

    saveStudentsList() {
        ClassService.updateClassStudents(
            this.props.match.params.semesterId,
            this.props.match.params.classId,
            this.props.match.params.courseId,
            this.state.currentTableContent.students
        )
        .then(res => {
            this.updateSuccess();
        })
        .catch(err => {
            this.showError();
        })
    }
    
    saveLecturerList() {
        ClassService.updateClassLecturers(
            this.props.match.params.semesterId,
            this.props.match.params.classId,
            this.props.match.params.courseId,
            this.state.currentTableContent.lecturers
        )
        .then(res => {
            this.updateSuccess();
        })
        .catch(err => {
            this.showError();
            
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
            else {
                this.setState({
                    isAuthenticating: false,
                    isAuthenticated: true
                });

                ClassService.getSemesters(this.props.match.params.majorId, this.state.currentTablePage).then(res => {
                    // TODO: add error validation
                    this.setState({
                        currentSemester: res.name
                    });

                    ClassService.getClasses(this.props.match.params.semesterId, this.state.currentTablePage).then(res => {
                        // TODO: add error validation
                        this.setState({
                            semesterName: `${res.period} ${res.name}`,
                        });

                        ClassService.getClass(this.props.match.params.semesterId, this.props.match.params.classId, this.props.match.params.courseId).then(res => {
                            // TODO: add error validation
                            this.setState({
                                pageTitle: `${res.metadata.name}`,
                                currentTableContent: res,
                                isLoading: false
                            });
                        });
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
                        <PageBreadcrumb 
                            title={this.state.pageTitle} 
                            root="Course Administration" 
                            breadcrumb={<Breadcrumb 
                                current={this.state.currentTableContent ? `${this.state.currentTableContent.classCode} - ${this.state.currentTableContent.courseCode}` : "Loading..."} 
                                contents={[{name: "Course Administration", url: ""}, {name: "Classes", url: "/staff/classes"}, {name: this.state.currentSemester, url: `/staff/classes/${this.props.match.params.majorId}`}, {name: this.state.semesterName, url: `/staff/classes/${this.props.match.params.majorId}/${this.props.match.params.semesterId}`}]}/>
                            }/>
                        <ContentWrapper>
                            {this.state.showErrorMessage ? <ErrorAlert><strong>Error -</strong> Action failed. Please try again.</ErrorAlert> : null}
                            {this.state.showSuccessMessage ? <SuccessAlert><strong>Success -</strong> Action performed successfully.</SuccessAlert> : null}
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
                                                                <td style={{width: 100}}><button id={row.universalId} className="btn btn-danger" onClick={this.removeStudent}>Remove</button></td>
                                                            </tr>
                                                        )
                                                    }) : <tr><td colSpan="3" style={{textAlign: "center"}}>There are no students assigned to this class.</td></tr> }
                                                </tbody>
                                                {this.state.currentTableContent ? <script>{ window.loadTable('#studentsTable') }</script> : null}
                                            </table>
                                        </div>
                                        <div className="float-right mt-2">
                                            <button className="btn btn-secondary" data-toggle="modal" data-target="#enrollStudentModal">Enroll Student</button>
                                            <button className="btn btn-primary ml-2" onClick={this.saveStudentsList}>Save changes</button>
                                        </div>
                                    </Card>
                                    <Card title="Lecturers" padding>
                                        <div className="table-responsive">
                                            <table id="lecturersTable" className="table table-striped no-wrap">
                                                <thead className="bg-primary text-white">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.currentTableContent && this.state.currentTableContent.lecturers.length > 0  ? this.state.currentTableContent.lecturers.map(row => {
                                                        return (
                                                            <tr key={row.universalId}>
                                                                <th scope="row" style={{width: 200}}>{row.universalId}</th>
                                                                <td>{row.name}</td>
                                                                <td style={{width: 100}}><button id={row.universalId} className="btn btn-danger" onClick={this.removeLecturer}>Remove</button></td>
                                                            </tr>
                                                        )
                                                    }) : <tr><td colSpan="3" style={{textAlign: "center"}}>There are no lecturers assigned to this class.</td></tr> }
                                                </tbody>
                                                {this.state.currentTableContent ? <script>{ window.loadTable('#lecturersTable') }</script> : null}
                                            </table>
                                        </div>
                                        <div className="float-right mt-2">
                                            <button className="btn btn-secondary" data-toggle="modal" data-target="#enrollLecturerModal">Enroll Lecturer</button>
                                            <button className="btn btn-primary ml-2" onClick={this.saveLecturerList}>Save changes</button>
                                        </div>
                                    </Card>
                                    <Card title="Add dis crap" padding>
                                        Schedule
                                    </Card>
                                </div>
                            </div>
                        </ContentWrapper>
                    </PageWrapper>
                    
                    {/* Generate EnrollStudentModal */}
                    { this.state.currentTableContent ? 
                        <EnrollStudentModal enrolledStudents={this.state.currentTableContent.students} enrollStudent={this.enrollStudent}/>
                    : null }

                    {/* Generate EnrollLecturerModal */}
                    { this.state.currentTableContent ? 
                        <EnrollLecturerModal enrolledStudents={this.state.currentTableContent.lecturers} enrollStudent={this.enrollLecturer}/>
                    : null }
                </div>
            </div>
        );
    }
}

export default withRouter(Class);