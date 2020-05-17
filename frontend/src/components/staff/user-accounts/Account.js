import React from 'react';
import {Redirect, Link, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import UserService from '../../../services/UserService';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import ContentWrapper from '../../ui-elements/ContentWrapper';
// import Breadcrumb from '../../ui-elements/Breadcrumb';
import Card from '../../ui-elements/Card';
import CreateAccountModal from './components/CreateAccountModal';
import Button from '../../ui-elements/Button';

class Account extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false,
            tableData: undefined,
            firstName: "",
            lastName: "",
            primaryEmail: "",
            contactEmail: "",
            phone: "",
            studentAccount: undefined,
            lecturerAccount: undefined,
            staffAccount: undefined,
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        // Perform session check
        AuthService.isLoggedIn()
            .then(res => {
                if (res.response && (res.response.status === 403))
                    this.setState({
                        isLoading: false,
                        isLoggedIn: false
                    });
                else
                    this.setState({
                        isLoading: false,
                        isLoggedIn: true
                    })
            });
        
        // Load user info
        UserService.getUserById(this.props.match.params.accountId)
            .then(res => {
                this.setState({
                    tableData: res,
                    firstName: res ? res.firstName : "",
                    lastName: res ? res.lastName: "",
                    primaryEmail: res ? res.primaryEmail: "",
                    contactEmail: res ? res.contactEmail: "",
                    phone: res ? res.phone: "",
                    studentAccount: res ? res.accounts.find(obj => {return obj.accountType === 'student'}): undefined,
                    lecturerAccount: res ? res.accounts.find(obj => {return obj.accountType === 'lecturer'}): undefined,
                    staffAccount: res ? res.accounts.find(obj => {return obj.accountType === 'staff'}): undefined,
            })
            // .catch((err) => {
            //     console.log(err);
            // });
        });
    }

    handleChange(event) {
        let {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/"/>
        return (
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title="User Account Details" root="Account Administration"/>
                    <ContentWrapper>
                        <div className="row">
                            <div className="col-lg-9 col-md-12">
                                <Card title="Account Details" padding>
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="firstName">First Name</label>
                                                <input type="input" className="form-control" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange} required/>
                                            </div>
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input type="input" className="form-control" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="primaryEmail">Primary Email</label>
                                                <input type="email" className="form-control" name="primaryEmail" placeholder="Primary Email" value={this.state.primaryEmail} onChange={this.handleChange} required/>
                                            </div>
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="contactEmail">Contact Email</label>
                                                <input type="email" className="form-control" name="contactEmail" placeholder="Contact Email" value={this.state.contactEmail} onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-lg-6">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input type="telephone" className="form-control" name="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.handleChange} required/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-lg-6"><small>All fields are required.</small></div>
                                            <div className="col-lg-6">
                                                <Button className="btn btn-primary float-right">Save Changes</Button>
                                            </div>
                                        </div>
                                    </form>
                                </Card>
                            </div>
                            <div className="col-lg-3 col-md-12">
                                <Card title="Profile Picture" padding>
                                    TODO: Add profile picture
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Card title="Student Account" padding>
                                    {this.state.studentAccount ?
                                        <div>
                                            <div><b>Current GPA</b>: {this.state.studentAccount.metadata.currentGPA ? this.state.studentAccount.metadata.currentGPA : "No data"}</div>
                                            <div><b>Current SAT</b>: {this.state.studentAccount.metadata.currentSAT ? this.state.studentAccount.metadata.currentSAT : "No data"}</div>
                                            <div><b>Community Service Hours</b>: {this.state.studentAccount.metadata.currentSOC ? `${this.state.studentAccount.metadata.currentSOC} hours` : "No data"}</div>
                                            <br/>
                                            <div><b>Enrolled Classes</b></div>
                                            <div className="table-responsive">
                                                <table id="studentClasses" className="table table-striped table-bordered no-wrap">
                                                    <thead>
                                                        <tr>
                                                            <th>Class Code</th>
                                                            <th>Course Code</th>
                                                            <th>Course Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>TODO</td>
                                                            <td>:</td>
                                                            <td>Render class data here</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <script>{ window.loadTable('#studentClasses') }</script>
                                            <div className="float-right mt-2">
                                                <Button className="btn btn-danger ml-2">Delete Account</Button>
                                            </div>
                                        </div>
                                    : <p style={{textAlign: "center"}}>This account does not have a student profile. <Link>Create one.</Link></p>}
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Card title="Lecturer Account" padding>
                                    {this.state.lecturerAccount ?
                                        <div>
                                            <div><b>Enrolled Classes</b></div>
                                            <div className="table-responsive">
                                                <table id="lecturerClasses" className="table table-striped table-bordered no-wrap">
                                                    <thead>
                                                        <tr>
                                                            <th>Class Code</th>
                                                            <th>Course Code</th>
                                                            <th>Course Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>TODO</td>
                                                            <td>:</td>
                                                            <td>Render class data here</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <script>{ window.loadTable('#lecturerClasses') }</script>
                                            <div className="float-right mt-2">
                                                <Button className="btn btn-danger ml-2">Delete Account</Button>
                                            </div>
                                        </div>
                                    : <p style={{textAlign: "center"}}>This account does not have a lecturer profile. <Link>Create one.</Link></p>}
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Card title="Staff Account" padding>
                                    {this.state.staffAccount ?
                                        <div>
                                            <div><b>Permitted Domains</b></div>
                                            <div className="table-responsive">
                                                <table id="staffDomains" className="table table-striped table-bordered no-wrap">
                                                    <thead>
                                                        <tr>
                                                            <th>Domain</th>
                                                            <th>Allowed Routes</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>TODO</td>
                                                            <td>Render domain data here</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <script>{ window.loadTable('#staffDomains') }</script>
                                            <div className="float-right mt-2">
                                                <Button className="btn btn-primary">Add Domain</Button>
                                                <Button className="btn btn-danger ml-2">Delete Account</Button>
                                            </div>
                                        </div>
                                    : <p style={{textAlign: "center"}}>This account does not have a staff profile. <Link>Create one.</Link></p>}
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Card title="Account Settings" padding>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <Button className="btn btn-block btn-secondary mb-2">Change Password</Button>
                                        </div>
                                        <div className="col-lg-6">
                                            <Button className="btn btn-block btn-danger mb-2">Delete Account</Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </ContentWrapper>
                </PageWrapper>
                <CreateAccountModal/>
            </div>
        );
    }
}

export default withRouter(Account);