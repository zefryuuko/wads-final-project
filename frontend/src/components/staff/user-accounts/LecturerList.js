import React from 'react';
import {Redirect, Link} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import Card from '../../ui-elements/Card';
import Preloader from '../../ui-elements/Preloader';

class LecturerList extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            tableData: undefined,
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
                UserService.getLecturers().then(res => {
                    this.setState({
                        tableData: res,
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
                        <PageBreadcrumb title="Lecturer Accounts" root="Account Administration" rightComponent={<Link className="btn btn-primary btn-circle mr-2" to="/staff/accounts/create" style={{padding:12}} ><i className="icon-plus"/></Link>}/>
                        <ContentWrapper>
                            <div className="row">
                                <div className="col-12">
                                    <Card padding>
                                        {/* <div className="table-responsive"> */}
                                        <div className="table-responsive">
                                            <table id="accountsTable" className="table table-striped no-wrap">
                                                <thead className="bg-primary text-white">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Full Name</th>
                                                        <th>Primary Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.tableData ?
                                                        this.state.tableData.map(row => {
                                                            return <tr key={row.id}>
                                                                <td>{row.id}</td>
                                                                <td><Link to={`/staff/accounts/${row.id}`}>{row.firstName} {row.lastName}</Link></td>
                                                                <td>{row.primaryEmail}</td>
                                                            </tr>
                                                        })
                                                        : null}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <script>{ window.loadTable('#accountsTable') }</script> */}
                                        {this.state.tableData ? <script>{ window.loadTable('#accountsTable') }</script> : null}
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

export default LecturerList;