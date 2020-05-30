import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; 

import './App.css';

import Landing from './components/Landing';
import Logout from './components/Logout';
import StudentDashboardPage from './components/student/StudentDashboardPage';
import StaffDashboardPage from './components/staff/StaffDashboardPage';
import LecturerDashboardPage from './components/lecturer/LecturerDashboardPage';

function App() {
  return (
      <BrowserRouter>
        {/* Landing */}
        <Route exact path="/" component={Landing}/>
        
        {/* Routes only accessible when logged in */}
        <Route exact path="/logout" component={Logout}/>

        {/* Student Routes */}
        <Route path="/student" component={StudentDashboardPage}/>

        {/* Lecturer Routes */}
        <Route path="/lecturer" component={LecturerDashboardPage}/>

        {/* Staff Routes */}
        <Route path="/staff" component={StaffDashboardPage}/>

      </BrowserRouter>
  );
}

export default App;
