import React from 'react';

import AuthService from '../services/AuthService';

const isAuthServiceActive = async () => {
    const result = await AuthService.isAuthServiceActive();
    console.log(result);
}

const isLoggedIn = async () => {
    const result = await AuthService.isLoggedIn("00e12e42-2e8f-4223-8f11-15ba25a1c9e6", "2201796970");
    console.log(result);
}

const login = async () => {
    const result = await AuthService.login("me@zef.sh", "zef1");
    console.log(result);
}

const TestingGrounds = () => (
    <div className="container">
        <h1>Testing Grounds</h1>
        <button onClick={isAuthServiceActive}>IsServiceActive</button>
        <button onClick={isLoggedIn}>isLoggedIn</button>
        <button onClick={login}>Login</button>
    </div>
);



export default TestingGrounds;
