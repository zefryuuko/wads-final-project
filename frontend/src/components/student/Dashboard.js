import React from 'react';
import {Redirect} from 'react-router-dom';

// Services
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';

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
                else
                    this.setState({
                        isLoading: false,
                        isLoggedIn: true
                    })
            });
        
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
    }

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/"/>
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
                                            <span className="opacity-7 text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium">3.92</h2>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Grade Point Average
                                            </h6>
                                        </div>
                                        <div className="ml-auto mt-md-3 mt-lg-0">
                                            <span className="opacity-7 text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-dollar-sign"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card border-right">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <div className="d-inline-flex align-items-center">
                                                <h2 className="text-dark mb-1 font-weight-medium">120</h2>
                                            </div>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">SAT Points</h6>
                                        </div>
                                        <div className="ml-auto mt-md-3 mt-lg-0">
                                            <span className="opacity-7 text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex d-lg-flex d-md-block align-items-center">
                                        <div>
                                            <h2 className="text-dark mb-1 font-weight-medium">25</h2>
                                            <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Social Hours</h6>
                                        </div>
                                        <div className="ml-auto mt-md-3 mt-lg-0">
                                            <span className="opacity-7 text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-globe"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></span>
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
                        <Card title="Your Courses" padding>

                        </Card>
                    </ContentWrapper>
                </PageWrapper>
            </div>
        );
    }
}

export default StaffDashboard;