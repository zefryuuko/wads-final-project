import React from 'react';
import {Redirect} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

// Services
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';

// UI Elements
import PageWrapper from '../ui-elements/PageWrapper';
import PageBreadcrumb from '../ui-elements/PageBreadcrumb';
import ContentWrapper from '../ui-elements/ContentWrapper';
import Card from '../ui-elements/Card';
import Preloader from '../ui-elements/Preloader';

// CSS
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

class Schedule extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,       // TODO: revalidate auth
            currentUserData: undefined,
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}
    }
    
    componentDidMount() {
        // Perform session check
        AuthService.isLoggedIn()
        .then(res => {
            if (res.response && (res.response.status === 403))
                this.setState({
                    isAuthenticating: false,
                    isAuthenticated: false
                });
            else {
                this.setState({
                    isAuthenticating: false,
                    isAuthenticated: true
                });

                // Load user info
                UserService.getUserData()
                .then(res => {
                    if (res.firstName)
                    this.setState({
                        currentUserData: res,
                        isLoading: false
                    })
                });
            }
        });
        
    }

    render() {
        if (!this.state.isAuthenticated && !this.state.isAuthenticating) return <Redirect to="/logout"/>
        return (
            <div>
                <Preloader isLoading={this.state.isLoading}/>
                <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <PageWrapper>
                        <PageBreadcrumb title="Schedule" root="Course Administration"/>
                        <ContentWrapper>
                            <div className="row">
                                <div className="col-12">
                                    <Card title={<span><span className="text-secondary">Computer Science</span><span className="text-muted"> / </span>2021 Odd Semester</span>} padding={true}>
                                        <FullCalendar 
                                            defaultView="dayGridMonth"
                                            plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
                                            schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                                            googleCalendarApiKey=""
                                            events={{googleCalendarId: ""}}
                                            droppable="true"
                                        />
                                        <div className="mt-3">
                                            <a href="#lmao">Edit in Google Calendar</a>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </ContentWrapper>
                    </PageWrapper>
                </div>
            </div>
        );
    }
}

export default Schedule;