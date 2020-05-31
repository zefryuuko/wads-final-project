import React from 'react';

import AuthService from '../services/AuthService';

class Logout extends React.Component {  
    UNSAFE_componentWillMount() {
        const sessionId = localStorage.getItem('sessionId');
        const universalId = localStorage.getItem('universalId');
    
        if (sessionId && universalId) {
            AuthService.logout();
        }
    }

    render() {
        return (
            <script>{localStorage.clear()} {window.location.href = "/"}</script>
        );
    }
}

export default Logout;