import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; 

import './App.css';

import Landing from './components/Landing';
// TODO: add credits page
import Logout from './components/Logout';
import StudentDashboardPage from './components/student/StudentDashboardPage';
import StaffDashboardPage from './components/staff/StaffDashboardPage';
import TestingGrounds from './components/TestingGrounds';

function App() {
  return (
      <BrowserRouter>
        {/* Landing */}
        <Route exact path="/" component={Landing}/>
        
        {/* Routes only accessible when logged in */}
        <Route exact path="/logout" component={Logout}/>

        {/* Student Routes */}
        <Route exact path="/student" component={StudentDashboardPage}/>

        {/* Staff Routes */}
        <Route path="/staff" component={StaffDashboardPage}/>
        {/* <Route exact path="/staff/courses" component={StaffCoursesList}/> */}

        {/* Testing Grounds */}
        <Route path="/testing-grounds" component={TestingGrounds}/>
      </BrowserRouter>
  );
}

export default App;
