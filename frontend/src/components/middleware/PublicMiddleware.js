import React from 'react';
import {Route, Redirect} from 'react-router-dom'; 
import AuthService from '../../services/AuthService';
                                    
class PublicMiddleware extends React.Component {
    
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            isLoading: false,
            isLoggedIn: false
        };

        const sessionId = localStorage.getItem('sessionId');
        const universalId = localStorage.getItem('universalId');
        AuthService.isLoggedIn(sessionId, universalId)
            .then(res => {
                if (res.response && (res.response.status === 403))
                    this.setState(() => ({ isLoading: false, isLoggedIn: false }));
                // this.setState({isAuthenticateTriggered: true});
                else
                    this.setState(() => ({ isLoading: false, isLoggedIn: true }));
                // this.setState({isAuthenticateTriggered: true, isAuthenticated: true});
            })
            
    }
    
    render() {
        return this.state.isLoading ? null :
        !this.state.isLoggedIn ?
        <Route path={this.props.path} component={this.props.component} exact={this.props.exact}/> :
        <Redirect to={{ pathname: '/staff', state: { from: this.props.location } }} />
        
    }
    
}
                                    

export default PublicMiddleware;