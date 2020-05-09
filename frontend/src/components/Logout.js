import React from 'react';

class Logout extends React.Component {  
    render() {
        return (
            <script>{localStorage.clear()} {window.location.href = "/"}</script>
        );
    }
}

export default Logout;