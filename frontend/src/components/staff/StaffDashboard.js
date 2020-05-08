import React from 'react'

import './StaffDashboard.css';
// import Preloader from '../Preloader';
import MainWrapper from '../MainWrapper';
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import Footer from '../Footer';

class StaffDashboard extends React.Component {
    render() {
        return (
            <MainWrapper>
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