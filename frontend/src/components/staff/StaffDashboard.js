import React from 'react';
import {Redirect} from 'react-router-dom';

import AuthService from '../../services/AuthService';

// UI Elements
import MainWrapper from '../ui-elements/MainWrapper';
import PageWrapper from '../ui-elements/PageWrapper';
import PageBreadcrumb from '../ui-elements/PageBreadcrumb';
import Breadcrumb from '../ui-elements/Breadcrumb';

// Components
import Preloader from '../Preloader';
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import Footer from '../Footer';

class StaffDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false
        }

        // Set page display mode when loading
        this.loadingStyle = {display: "none"}
        this.loadedStyle = {display: ""}
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
    }

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/"/>
        return (
            <MainWrapper>
                <Preloader/>
                <div style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <Navbar />
                    <Sidebar />
                    <PageWrapper>
                        <PageBreadcrumb title="Welcome Back, Jason!" breadcrumb={<Breadcrumb current="Dashboard"/>}/>
                        <h1>Staff Dash Body</h1>
                        <Footer />
                    </PageWrapper>
                </div>
            </MainWrapper>
        );
    }
}

export default StaffDashboard;