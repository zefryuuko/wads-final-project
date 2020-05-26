import React from 'react';
import {Redirect, Link} from 'react-router-dom';

// Services
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import ClassService from '../../services/ClassService';

// UI Elements
import PageWrapper from '../ui-elements/PageWrapper';
import PageBreadcrumb from '../ui-elements/PageBreadcrumb';
import ContentWrapper from '../ui-elements/ContentWrapper';
import Breadcrumb from '../ui-elements/Breadcrumb';
import Card from '../ui-elements/Card';

class StaffDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false,       // TODO: revalidate auth
            userFirstName: "",
            userFirstFullName: "",
            userLastName: "",
            accountDetails: undefined,
            currentlEnrolledSemester: undefined
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
                        isLoading: false,
                        isLoggedIn: false
                    });
                else {
                    this.setState({
                        isLoading: false,
                        isLoggedIn: true
                    })
                    
                    // Load user info
                    UserService.getUserData()
                        .then(res => {
                            if (res.firstName)
                            this.setState({
                                userFirstName: res.firstName.split(' ')[0],
                                userFirstFullName: res.firstName,
                                userLastName: res.lastName
                            })
                        });
            
                    UserService.getUserAccountDetails(localStorage.getItem('universalId'), sessionStorage.getItem('activeAccount').split(",")[0])
                        .then(res => {
                            this.setState({
                                accountDetails: res
                            })
                        });
            
            
                    // Load classes data
                    ClassService.getCourseByStudentId(localStorage.getItem('universalId'))
                    .then(res => {
                        this.setState({currentEnrolledSemester: res[res.length - 1], isLoading: false});
                    }).catch(err => {
                        this.setState({isLoading: false})
                    });
                }
            });
        
    }
    
    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/logout"/>
        return (
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title={`Welcome Back, ${this.state.userFirstName}!`} breadcrumb={<Breadcrumb current="Dashboard"/>}/>
                    <ContentWrapper>
                        <div className="card-group">
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <div className="d-inline-flex align-items-center">
                                                <h2 className="text-dark mb-1 font-weight-medium">2</h2>
                                                <span className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">Due today</span>
                                            </div>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">New Assignments</h6>
                                        </div>
                                        <div className="ml-auto mt-md-3 mt-lg-0">
                                            <span className="opacity-7 text-muted"><i data-feather="edit-2" className="feather-icon"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">{this.state.accountDetails && this.state.accountDetails.metadata.currentGPA ? this.state.accountDetails.metadata.currentGPA : "N/A"}</h2>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Grade Point Average
                                            </h6>
                                        </div>
                                        <div className="ml-auto mt-md-3 mt-lg-0">
                                            <span className="opacity-7 text-muted"><i data-feather="frown" className="feather-icon"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <div className="d-inline-flex align-items-center">
                                                <h2 className="text-dark mb-1 font-weight-medium">{this.state.accountDetails && this.state.accountDetails.metadata.currentSAT ? this.state.accountDetails.metadata.currentSAT : "N/A"}</h2>
                                            </div>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">SAT Points</h6>
                                        </div>
                                        <div className="ml-auto mt-md-3 mt-lg-0">
                                            <span className="opacity-7 text-muted"><i data-feather="star" className="feather-icon"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <h2 className="text-dark mb-1 font-weight-medium">{this.state.accountDetails && this.state.accountDetails.metadata.currentSOC ? this.state.accountDetails.metadata.currentSOC : "N/A"}</h2>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Social Hours</h6>
                                        </div>
                                        <div className="ml-auto mt-md-3 mt-lg-0">
                                            <span className="opacity-7 text-muted"><i data-feather="users" className="feather-icon"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-6">
                                <Card title="Classes" padding>

                                </Card>
                            </div>
                            <div className="col-md-6 col-lg-6">
                                <Card title="Assignments" padding>

                                </Card>
                            </div>
                        </div>
                        <Card title="This Semester" padding>
                            <div className="list-group">
                                {this.state.currentEnrolledSemester ?
                                    this.state.currentEnrolledSemester.classes.map((element, index) => {
                                        return <Link to={`/student/courses/${this.state.currentEnrolledSemester._id}/${element.classCode}/${element.courseCode}`} key={index} className="list-group-item">
                                            <span className="mr-2">{element.metadata.name}</span> 
                                            <span className="badge badge-primary mr-1">{element.classType}</span>
                                            <span className="badge badge-secondary mr-1">{element.classCode}</span>
                                            <span className="badge badge-secondary mr-1">{element.courseCode}</span>
                                        </Link>
                                    })
                                : <div style={{textAlign: "center"}}>No data</div>}
                            </div>
                        </Card>
                    </ContentWrapper>
                </PageWrapper>
            </div>
        );
    }
}

export default StaffDashboard;