import React from 'react';
import AuthService from '../services/AuthService';

class Logout extends React.Component {
    constructor() {
        super();
        AuthService.logout().then((res) => {});
    }
    
    render() {
        return <script>{window.location.href = "/"}</script>
    }
}

export default Logout;