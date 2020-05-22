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
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/logout"/>
        return (
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title={`Welcome Back, ${this.state.userFirstName}!`} breadcrumb={<Breadcrumb current="Dashboard"/>}/>
                    <ContentWrapper>
                        <div className="row">
                            <div className="col-12">
                                <Card title="StaffDashBody" padding={true}>
                                    <h1>Staff Dash Body</h1>
                                </Card>
                            </div>
                        </div>
                    </ContentWrapper>
                </PageWrapper>
            </div>
        );
    }
}

export default StaffDashboard;