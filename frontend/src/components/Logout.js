import React from 'react';
import AuthService from '../services/AuthService';

class Logout extends React.Component {  
    render() {
        // AuthService.logout().then((res) => {});
        return (
            <script>{localStorage.clear()} {window.location.href = "/"}</script>
        );
    }
}

export default Logout;