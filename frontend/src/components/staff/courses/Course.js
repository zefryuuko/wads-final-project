import React from 'react'
import {Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import CourseService from '../../../services/CourseService';

// UI Elements
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Breadcrumb from '../../ui-elements/Breadcrumb';
import Card from '../../ui-elements/Card';
import Tab from '../../ui-elements/Tab';
import Button from '../../ui-elements/Button';
import PageWrapper from '../../ui-elements/PageWrapper';
import LearningOutcomes from '../../ui-elements/LearningOutcomes';
import CourseDescription from '../../ui-elements/CourseDescription';
import Textbooks from '../../ui-elements/Textbooks';
import Evaluation from '../../ui-elements/Evaluation';
import ErrorAlert from '../../ui-elements/ErrorAlert';
import SuccessAlert from '../../ui-elements/SuccessAlert';
import Preloader from '../../ui-elements/Preloader';
import EditCourseModal from './components/EditCourseModal';
import EditCourseDescriptionModal from './components/EditCourseDescriptionModal';
import EditCourseLearningOutcomesModal from './components/EditCourseLearningOutcomesModal';
import DeleteCourseModal from './components/DeleteCourseModal';
import CreateClassModal from './components/CreateClassModal';
import EditTextbookModal from './components/EditTextbookModal';
import EditEvaluationModal from './components/EditEvaluationModal';
import DeleteClassModal from './components/DeleteClassModal';
import PageNotFound from '../../PageNotFound';

// Components

class Course extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            currentTablePage: 1,
            courseData: undefined,
            showErrorMessage: false,
            showSuccessMessage: false,
            deleted: false
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.reloadData = this.reloadData.bind(this);
        this.updateSuccess = this.updateSuccess.bind(this);
        this.showError = this.showError.bind(this);
        this.deleteCourseSuccess = this.deleteCourseSuccess.bind(this);
    }

    reloadData() {
        this.setState({isLoading: true})
        // Load table content
        CourseService.getCourse(this.props.match.params.courseId).then(res => {
            // TODO: add error validation
            this.setState({courseData: res, isLoading: false});
        })
    }

    updateSuccess() {
        this.setState({showSuccessMessage: true, showErrorMessage: false});
        this.reloadData();
    }

    deleteCourseSuccess() {
        console.log("courseDeleteSuccess")
        this.setState({deleted: true});
    }

    showError() {
        this.setState({showErrorMessage: true, showSuccessMessage: false});
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
            else {
                this.setState({
                    isLoading: false,
                    isLoggedIn: true
                });

                // Load table content
                if (!this.state.deleted)
                    CourseService.getCourse(this.props.match.params.courseId).then(res => {
                        // TODO: add error validation
                        this.setState({courseData: res, isLoading: false});
                }).catch(err => {
                    this.setState({render404: true, isLoading: false});
                });
            }
        });
    }

    render() {
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>;
        if (this.state.deleted) return <script>{window.location.href=`/staff/courses/${this.props.match.params.groupId}`}</script>;
        let courseActions = <div><button className="btn btn-secondary btn-circle mr-2" data-toggle="modal" data-target={`#editModal-${this.state.courseData ? this.state.courseData.code : ""}`} style={{lineHeight:0}}><i className="icon-pencil"/></button><button className="btn btn-danger btn-circle" data-toggle="modal" data-target={`#deleteModal-${this.state.courseData ? this.state.courseData.code : ""}`} style={{lineHeight:0}}><i className="icon-trash"/></button></div>
        return (
            <div>
                <Preloader isLoading={this.state.isLoading}/>
                {!this.state.render404 ?
                <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <PageWrapper>
                        <PageBreadcrumb title={this.state.courseData ? this.state.courseData.name : "Loading..."} rightComponent={courseActions} breadcrumb={<Breadcrumb current={this.state.courseData ? this.state.courseData.code : ""} contents={[{name: "Course Administration", url: ""}, {name: "Courses", url: "/staff/courses"}, {name: this.props.match.params.groupId, url: `/staff/courses/${this.props.match.params.groupId}`}]}/>}/>
                        <ContentWrapper>
                            {this.state.showErrorMessage ? <ErrorAlert><strong>Error -</strong> Action failed. Please try again.</ErrorAlert> : null}
                            {this.state.showSuccessMessage ? <SuccessAlert><strong>Success -</strong> Action performed successfully.</SuccessAlert> : null}
                            <div className="row">
                                <div className="col-12">
                                <CourseDescription data={this.state.courseData ? this.state.courseData.description : null} scu={this.state.courseData ? this.state.courseData.scu : undefined} right={<a href="#editCourseDescriptionModal" data-toggle="modal" data-target="#editCourseDescriptionModal">Edit</a>}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <LearningOutcomes data={this.state.courseData ? this.state.courseData.learningOutcomes : null} right={<a href="#editLearningOutcomesModal" data-toggle="modal" data-target="#editLearningOutcomesModal">Edit</a>}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Card title="Classes" right={<a href="#createClassModal" data-toggle="modal" data-target="#createClassModal">Add</a>} padding>
                                        <Tab data={
                                            this.state.courseData ? this.state.courseData.class.map(element => {
                                                return {
                                                    name: element.code,
                                                    component: <div>
                                                        <Textbooks data={element.textbooks} right={<a href={`#editTextbookModal-${element.code}`} data-toggle="modal" data-target={`#editTextbookModal-${element.code}`}>Edit</a>}/>
                                                        <Evaluation data={element.evaluation} loData={this.state.courseData.learningOutcomes} right={<a href={`#editEvaluationModal-${element.code}`} data-toggle="modal" data-target={`#editEvaluationModal-${element.code}`}>Edit</a>}/>

                                                        <Button className="btn btn-block btn-danger mt-3" data-toggle="modal" data-target={`#deleteClassModal-${element.code}`}>Delete Class</Button>

                                                        <EditTextbookModal courseCode={this.state.courseData.code} classCode={element.code} data={element.textbooks} success={this.updateSuccess} error={this.showError}/>
                                                        <EditEvaluationModal courseCode={this.state.courseData.code} classCode={element.code} loData={this.state.courseData.learningOutcomes} data={element.evaluation} success={this.updateSuccess} error={this.showError}/>
                                                        <DeleteClassModal courseCode={this.state.courseData.code} classCode={element.code} success={this.updateSuccess} error={this.showError}/>
                                                    </div>
                                                }
                                            }) : []
                                        }/>
                                    </Card>
                                </div>
                            </div>
                        </ContentWrapper>
                    </PageWrapper>

                    {/* Course Modals */}
                    {this.state.courseData ? <EditCourseModal code={this.state.courseData.code} redirectOnSuccess={`/staff/courses/${this.props.match.params.groupId}`} name={this.state.courseData.name} success={this.updateSuccess} error={this.showError}/> : null}
                    {this.state.courseData ? <EditCourseDescriptionModal code={this.state.courseData.code} description={this.state.courseData.description}  scu={this.state.courseData.scu} success={this.updateSuccess} error={this.showError}/> : null}
                    {this.state.courseData ? <EditCourseLearningOutcomesModal code={this.state.courseData.code} data={this.state.courseData.learningOutcomes} success={this.updateSuccess} error={this.showError}/> : null}
                    {this.state.courseData ? <DeleteCourseModal key={this.state.courseData.code} prefix={this.state.courseData.code} name={this.state.courseData.name} success={this.deleteCourseSuccess} error={this.showError}/> : null}                
                    {/* Class Modals */}
                    {this.state.courseData ? <CreateClassModal code={this.state.courseData.code} success={this.updateSuccess} error={this.showError}/> : null}
                </div>
                : <PageNotFound/> }
            </div>
        );
    }
}

export default withRouter(Course);