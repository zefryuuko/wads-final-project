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
        this.setState({currentTableContent: []});
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
                                <CourseDescription data={this.state.currentTableContent ? this.state.currentTableContent.metadata.description : undefined} right={<a href="#editzzz">Edit</a>}/>
                                <LearningOutcomes data={this.state.currentTableContent ? this.state.currentTableContent.metadata.learningOutcomes : undefined} right={<a href="#editzzz">Edit</a>}/>
                                <Card padding>
                                    <Evaluation data={this.state.currentTableContent ? this.state.currentTableContent.metadata.class[0].evaluation : undefined} right={<a href="#editzzz">Edit</a>}/>
                                </Card>
                                <Card title="Add dis crap" padding>
                                    Students, Schedule
                                </Card>
                            </div>
                        </div>
                    </ContentWrapper>
                </PageWrapper>
            </div>

        );
    }
}

export default withRouter(Class);