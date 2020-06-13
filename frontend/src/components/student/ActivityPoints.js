import React from 'react';
import {Redirect} from 'react-router-dom';

// Services
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import ClassService from '../../services/ClassService';
import AccessControlService from '../../services/AccessControlService';

// UI Elements
import Preloader from '../ui-elements/Preloader';
import PageWrapper from '../ui-elements/PageWrapper';
import PageBreadcrumb from '../ui-elements/PageBreadcrumb';
import ContentWrapper from '../ui-elements/ContentWrapper';
import Breadcrumb from '../ui-elements/Breadcrumb';
import Card from '../ui-elements/Card';

class ActivityPoints extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticating: true,
            isAuthenticated: false,
            isLoading: true,
            userFirstName: "",
            userFirstFullName: "",
            userLastName: "",
            accountDetails: undefined,
            currentEnrolledSemester: undefined,
            currentAssignmentCount: 0,
            assignmentDueToday: 0,
            assignmentsDue: [],
            GPA: "N/A",
            SAT: "N/A"
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
            else {
                this.setState({
                    isAuthenticating: false,
                    isAuthenticated: true
                })
                
                AccessControlService.hasAccessToPage(localStorage.getItem('universalId'), window.location.pathname)
                .then(status => {
                    // Load user info
                    UserService.getUserAccountDetails(localStorage.getItem('universalId'), sessionStorage.getItem('activeAccount').split(",")[0])
                    .then(res => {
                        console.log(res)
                        let SAT = ClassService.calculateSAT(res.metadata.satDetails);
                        let SOC = ClassService.calculateSOC(res.metadata.socDetails);
                        this.setState({
                            accountDetails: res,
                            SAT,
                            SOC,
                            isLoading: false
                        });
                    }).catch(err => {
                        this.setState({isLoading: false})
                    });
                });
            }
        });
    }
    
    render() {
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        console.log(this.state)
        return (
            <div>
                <Preloader isLoading={this.state.isLoading}/>
                <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <PageWrapper>
                        <PageBreadcrumb title="Student Activity Points" breadcrumb={<Breadcrumb current="Student Information"/>}/>
                        <ContentWrapper>
                            <div className="card-group">
                                <div className="card border-right">
                                    <div className="card-body">
                                        <div className="d-flex d-lg-flex d-md-block align-items-center">
                                            <div>
                                                <div className="d-inline-flex align-items-center">
                                                    <h2 className="text-dark mb-1 font-weight-medium">{this.state.SAT}</h2>
                                                </div>
                                                <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">SAT Points</h6>
                                            </div>
                                            <div className="ml-auto mt-md-3 mt-lg-0">
                                                <span className="opacity-7 text-muted"><i data-feather="star" className="feather-icon"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           <div className="row">
                               <div className="col-12">
                                    <Card title="Details" padding>
                                        <div className="table-responsive">
                                            <table className="table table-striped no-wrap">
                                                <thead className="bg-primary text-white">
                                                    <tr>
                                                        <th>Activity Name</th>
                                                        <th>Points</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.accountDetails && this.state.accountDetails.metadata.satDetails && this.state.accountDetails.metadata.satDetails.length > 0 ? 
                                                        this.state.accountDetails.metadata.satDetails.map((activity, index) => {
                                                            return <tr key={index}>
                                                                <th scope="row">{activity.name}</th>
                                                                <td>{activity.points}</td>
                                                            </tr>
                                                        })
                                                    : <tr><td colSpan="2">No entries</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                               </div>
                           </div>
                        </ContentWrapper>
                    </PageWrapper>
                    <script>{window.feather.replace()}</script>
                </div>
            </div>
        );
    }
}

export default ActivityPoints;