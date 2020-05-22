import React, { Component } from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import ClassService from '../../../services/ClassService';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
// import Breadcrumb from '../../ui-elements/Breadcrumb';
import Card from '../../ui-elements/Card';
// import Button from '../../ui-elements/Button';
// import ErrorAlert from '../../ui-elements/ErrorAlert';
// import SuccessAlert from '../../ui-elements/SuccessAlert';

class Courses extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            currentPageContent: undefined,
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
                else
                    this.setState({
                        isAuthenticating: false,
                        isAuthenticated: true
                    })
            });
        
        // Load data
        ClassService.getCourseByStudentId(localStorage.getItem('universalId'))
        .then(res => {
            this.setState({currentPageContent: res, isLoading: false});
        }).catch(err => {
            this.setState({isLoading: false})
        });
    }

    render() { 
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        return (
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title="Courses" root="Learning" rightComponent={<button className="btn btn-primary btn-circle mr-2" data-toggle="modal" data-target={`#createCourseGroupModal`} style={{lineHeight:0}} ><i className="icon-plus"/></button>}/>
                    <ContentWrapper>
                        {this.state.currentPageContent ? this.state.currentPageContent.map((semester, index) => {
                            return (
                                <Card key={index} title={`${semester.period} - ${semester.name}`} padding>
                                    <div className="list-group">
                                        {
                                            semester.classes.map((element, index) => {
                                                return <Link to={`/student/courses/${semester._id}/${element.classCode}/${element.courseCode}`} key={index} className="list-group-item">
                                                    <span className="mr-2">{element.metadata.name}</span> 
                                                    <span className="badge badge-primary mr-1">{element.classType}</span>
                                                    <span className="badge badge-secondary mr-1">{element.classCode}</span>
                                                    <span className="badge badge-secondary mr-1">{element.courseCode}</span>
                                                </Link>
                                            })
                                        }
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
        );
    }
}
 
export default withRouter(Courses);