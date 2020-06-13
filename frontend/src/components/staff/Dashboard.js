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
import Preloader from '../ui-elements/Preloader';

class StaffDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,       // TODO: revalidate auth
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
                    isAuthenticating: false,
                    isAuthenticated: false
                });
            else {
                this.setState({
                    isAuthenticating: false,
                    isAuthenticated: true
                });

                // Load user info
                UserService.getUserData()
                .then(res => {
                    if (res.firstName)
                    this.setState({
                        userFirstName: res.firstName.split(' ')[0],
                        userFirstFullName: res.firstName,
                        userLastName: res.lastName,
                        isLoading: false
                    })
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
                        <PageBreadcrumb title={`Welcome Back, ${this.state.userFirstName}!`} breadcrumb={<Breadcrumb current="Dashboard"/>}/>
                        <ContentWrapper>
                            <div className="row">
                                <div className="col-12">
                                    <Card title="Welcome" padding={true}>
                                        This dashboard allows you to manage the contents of this site. To get started, select an menu from the sidebar. <br/>
                                        Your account has total control of the site. Always double check on what you are doing. <br/>
                                    </Card>
                                </div>
                            </div>
                        </ContentWrapper>
                    </PageWrapper>
                </div>
            </div>
        );
    }
}

export default StaffDashboard;