import React from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import CourseService from '../../../services/CourseService';
import AccessControlService from '../../../services/AccessControlService';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Breadcrumb from '../../ui-elements/Breadcrumb';
import Card from '../../ui-elements/Card';
import Button from '../../ui-elements/Button';
import ErrorAlert from '../../ui-elements/ErrorAlert';
import SuccessAlert from '../../ui-elements/SuccessAlert';
import Preloader from '../../ui-elements/Preloader';
import EditCourseGroupModal from './components/EditCourseGroupModal';
import CreateCourseModal from './components/CreateCourseModal';
import DeleteCourseModal from './components/DeleteCourseModal';
import EditCourseModal from './components/EditCourseModal';
import PageNotFound from '../../PageNotFound';

// Components

class CourseList extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            currentTablePage: 1,
            currentTableContent: [],
            courseName: "",
            coursePrefix: "",
            showErrorMessage: false,
            showSuccessMessage: false,
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.reloadTable = this.reloadTable.bind(this);
        this.updateSuccess = this.updateSuccess.bind(this);
        this.showError = this.showError.bind(this);
    }

    reloadTable() {
        this.setState({isLoading: true});
        // Load table content
        CourseService.getCourseGroupCourses(this.props.match.params.groupId, this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({
                currentTableContent: res[0].courses,
                courseName: res[0].name,
                coursePrefix: res[0].prefix,
                isLoading: false
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

                AccessControlService.hasAccessToPage(localStorage.getItem('universalId'), window.location.pathname).then(status => {
                    if (status) {
                        CourseService.getCourseGroupCourses(this.props.match.params.groupId, this.state.currentTablePage).then(res => {
                            this.setState({
                                currentTableContent: res[0].courses,
                                courseName: res[0].name,
                                coursePrefix: res[0].prefix,
                                isLoading: false
                            });
                        }).catch(err => {
                            this.setState({render404: true, isLoading: false});
                        });
                    }
                    else {
                        this.setState({render404: true, isLoading: false});
                    }
                });
            }
        });
        
    }

    render() {
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        return (
            <div>
                <Preloader isLoading={this.state.isLoading}/>
                {!this.state.render404 ?
                <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <PageWrapper>
                        <PageBreadcrumb 
                            title={`${this.state.courseName} Courses`} 
                            breadcrumb={<Breadcrumb current={this.state.coursePrefix} 
                            contents={[{name: "Course Administration", url: ""}, {name: "Courses", url: "/staff/courses"}]}/>}
                            rightComponent={<div>
                                <button className="btn btn-primary btn-circle mr-2" data-toggle="modal" data-target={`#createCourseModal`} style={{lineHeight:0}} ><i className="icon-plus"/></button>
                                <button className="btn btn-secondary btn-circle mr-2" data-toggle="modal" data-target={`#editModal-${this.state.coursePrefix}`} style={{lineHeight:0}}><i className="icon-pencil"/></button>
                            </div>}
                        />
                        <ContentWrapper>
                            {this.state.showErrorMessage ? <ErrorAlert><strong>Error -</strong> Action failed. Please try again.</ErrorAlert> : null}
                            {this.state.showSuccessMessage ? <SuccessAlert><strong>Success -</strong> Action performed successfully.</SuccessAlert> : null}
                            <div className="row">
                                <div className="col-12">
                                    <Card padding>
                                        <table className="table table-striped no-wrap" id="coursesTable">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>Code</th>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row => {
                                                    return (
                                                        <tr key={row.code}>
                                                            <th scope="row">{row.code}</th>
                                                            <td><Link to={`/staff/courses/${this.state.coursePrefix}/${row.code}`}>{row.name}</Link></td>
                                                            <td style={{width: "150px", minWidth: "150px"}}>
                                                                <Button className="btn btn-sm btn-secondary btn-sm mr-2" data-toggle="modal" data-target={`#editModal-${row.code}`}>Edit</Button>
                                                                <Button className="btn btn-sm btn-danger" data-toggle="modal" data-target={`#deleteModal-${row.code}`}>Delete</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }): <tr><td colSpan="3" align="center">No data</td></tr>}
                                            </tbody>
                                        </table>
                                        {this.state.currentTableContent.length > 0 ? <script>{ window.loadTable('#coursesTable') }</script> : null}
                                    </Card>
                                </div>
                            </div>
                        </ContentWrapper>
                    </PageWrapper>
                    
                    {/* Edit course group modal */}
                    <EditCourseGroupModal key={this.state.coursePrefix} prefix={this.state.coursePrefix} redirectOnSuccess={'/staff/courses'} name={this.state.courseName} success={this.updateSuccess} error={this.showError}/>
                    
                    {/* Create course modal */}
                    <CreateCourseModal prefix={this.state.coursePrefix} success={this.updateSuccess} error={this.showError}/>
                    
                    {/* Generate edit modals */}
                    {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row=> {
                        return <EditCourseModal key={row.code} code={row.code} name={row.name} success={this.updateSuccess} error={this.showError}/>
                    }): null}

                    {/* Generate delete course modal */}
                    {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row=> {
                        return <DeleteCourseModal key={row.code} prefix={row.code} name={row.name} success={this.updateSuccess} error={this.showError}/>
                    }): null}
                </div>
                : <PageNotFound/> }
            </div>
        );
    }
}

export default withRouter(CourseList);