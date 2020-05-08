import React from 'react';
import {BrowserRouter, Route,} from 'react-router-dom'; 

import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery';
// import 'bootstrap/dist/js/bootstrap.bundle';

import Landing from './components/Landing'

import StudentDashboard from './components/student/StudentDashboard';

import StaffDashboard from './components/staff/StaffDashboard';
import StaffCoursesList from './components/staff/StaffCoursesList';

function App() {
  return (
      <BrowserRouter>
        {/* Landing */}
        <Route exact path="/" component={Landing}></Route>
        
        {/* Student Routes */}
        <Route exact path="/student" component={StudentDashboard}></Route>

        {/* Staff Routes */}
        <Route exact path="/staff" component={StaffDashboard}></Route>
        <Route exact path="/staff/courses" component={StaffCoursesList}></Route>
      </BrowserRouter>
  );
}

export default App;
