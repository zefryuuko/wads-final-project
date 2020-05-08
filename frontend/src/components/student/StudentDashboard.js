import React from 'react'

import './StudentDashboard.css';
import Navbar from './Navbar';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1>Student Dash</h1>
            </div>
        );
    }
}

export default Dashboard;