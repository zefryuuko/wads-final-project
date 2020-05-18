import React from 'react'
import {Link, Redirect} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import CourseService from '../../../services/CourseService';

// UI Elements
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Card from '../../ui-elements/Card';
import Button from '../../ui-elements/Button';
import PageWrapper from '../../ui-elements/PageWrapper';
import EditCourseGroupModal from './components/EditCourseGroupModal';
import ErrorAlert from '../../ui-elements/ErrorAlert';
import SuccessAlert from '../../ui-elements/SuccessAlert';
import DeleteCourseGroupModal from './components/DeleteCourseGroupModal';
import CreateCourseGroupModal from './components/CreateCourseGroupModal';

// Components

class CourseGroups extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false,
            currentTablePage: 1,
            currentTableContent: [],
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
        // Load table content
        CourseService.getCourseGroup(this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({currentTableContent: res});
        });
    }

    updateSuccess() {
        this.setState({showSuccessMessage: true, showErrorMessage: false});

        CourseService.getCourseGroup(this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({currentTableContent: res});
        });
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
                else
                    this.setState({
                        isLoading: false,
                        isLoggedIn: true
                    })
            });
        
        // Load table content
        CourseService.getCourseGroup(this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({currentTableContent: res});
        })
    }

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/"/>
        return (
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title="Courses" root="Course Administration" rightComponent={<button className="btn btn-primary btn-circle mr-2" data-toggle="modal" data-target={`#createCourseGroupModal`} style={{lineHeight:0}} ><i className="icon-plus"/></button>}/>
                    <ContentWrapper>
                        {this.state.showErrorMessage ? <ErrorAlert><strong>Error -</strong> Action failed. Please try again.</ErrorAlert> : null}
                        {this.state.showSuccessMessage ? <SuccessAlert><strong>Success -</strong> Action performed successfully.</SuccessAlert> : null}
                        <div className="row">
                            <div className="col-12">
                                <Card padding>
                                    <div className="table-responsive">
                                        <table className="table table-striped no-wrap" id="courseGroupsTable">
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
                                                        <tr key={row.prefix}>
                                                            <th scope="row">{row.prefix}</th>
                                                            <td><Link to={`/staff/courses/${row.prefix}`}>{row.name}</Link></td>
                                                            <td style={{width: "150px", minWidth: "150px"}}>
                                                                <Button className="btn btn-sm btn-secondary btn-sm mr-2" data-toggle="modal" data-target={`#editModal-${row.prefix}`}>Edit</Button>
                                                                <Button className="btn btn-sm btn-danger" data-toggle="modal" data-target={`#deleteModal-${row.prefix}`}>Delete</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }): <tr><td colSpan="3" align="center">No data</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>
                                    {this.state.currentTableContent.length > 0 ? <script>{ window.loadTable('#courseGroupsTable') }</script> : null}
                                </Card>
                            </div>
                        </div>
                    </ContentWrapper>
                </PageWrapper>
                
                {/* Render create course group modal */}
                <CreateCourseGroupModal success={this.updateSuccess} error={this.showError}/>

                {/* Generate edit modals */}
                {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row=> {
                    return <EditCourseGroupModal key={row.prefix} prefix={row.prefix} name={row.name} success={this.updateSuccess} error={this.showError}/>
                }): null}

                {/* Generate delete modals */}
                {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row=> {
                    return <DeleteCourseGroupModal key={row.prefix} prefix={row.prefix} name={row.name} success={this.updateSuccess} error={this.showError}/>
                }): null}
            </div>
        );
    }
}

export default CourseGroups;