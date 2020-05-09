import React from 'react';
import {BrowserRouter, Route,} from 'react-router-dom'; 

import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery';
// import 'bootstrap/dist/js/bootstrap.bundle';
// import 'feather-icons';

import Landing from './components/Landing'

import AuthMiddleware from './components/middleware/AuthMiddleware';
import PublicMiddleware from './components/middleware/PublicMiddleware';

import StudentDashboard from './components/student/StudentDashboard';

import StaffDashboard from './components/staff/StaffDashboard';
import StaffCoursesList from './components/staff/StaffCoursesList';

import TestingGrounds from './components/TestingGrounds';


function App() {
  return (
      <BrowserRouter>
        {/* Landing */}
        <PublicMiddleware exact path="/" component={Landing}/>
        
        {/* Student Routes */}
        <Route exact path="/student" component={StudentDashboard}/>

        {/* Staff Routes */}
        <AuthMiddleware exact path="/staff" component={StaffDashboard}/>
        <AuthMiddleware exact path="/staff/courses" component={StaffCoursesList}/>

        {/* Testing Grounds */}
        <Route path="/testing-grounds" component={TestingGrounds}/>
      </BrowserRouter>
  );
}

export default App;
