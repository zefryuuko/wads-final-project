import React from 'react';
import {Redirect} from 'react-router-dom';

import AuthService from '../../services/AuthService';

// import Preloader from '../Preloader';
import MainWrapper from '../MainWrapper';
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import Footer from '../Footer';

// import $ from 'jquery/dist/jquery';
// import './custom.min.js'

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
            <MainWrapper style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                {/* <Preloader/> */}
                <Navbar />
                <Sidebar />
                <h1>Staff Dash Body</h1>
                <Footer />
            </MainWrapper>
        );
    }
}

export default StaffDashboard;