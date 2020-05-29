import React from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import ClassService from '../../../services/ClassService';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Card from '../../ui-elements/Card';
import Button from '../../ui-elements/Button';
import Preloader from '../../ui-elements/Preloader';
import SuccessAlert from '../../ui-elements/SuccessAlert';
import ErrorAlert from '../../ui-elements/ErrorAlert';
import CreateMajorModal from './components/CreateMajorModal';
import EditMajorModal from './components/EditMajorModal';

// Components

class MajorList extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            currentTablePage: 1,
            currentTableContent: [],
            showErrorMessage: false,
            showSuccessMessage: false,
            
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.reloadTable = this.reloadTable.bind(this);
        this.updateSuccess = this.updateSuccess.bind(this);
        this.showError = this.showError.bind(this);
    }

    reloadTable() {
        ClassService.getMajors(this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({
                currentTableContent: res,
            });
        })
    }

    updateSuccess() {
        this.setState({showSuccessMessage: true, showErrorMessage: false});
        this.reloadTable();
    }

    showError() {
        this.setState({showErrorMessage: true, showSuccessMessage: false});
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

                ClassService.getMajors(this.state.currentTablePage)
                .then(res => {
                    this.setState({
                        currentTableContent: res,
                        isLoading: false
                    });
                })
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
                        <PageBreadcrumb title={`Classes`} root="Course Administration" rightComponent={<button className="btn btn-primary btn-circle mr-2" data-toggle="modal" data-target={`#createMajorModal`} style={{lineHeight:0}} ><i className="icon-plus"/></button>}/>
                        <ContentWrapper>
                            {this.state.showErrorMessage ? <ErrorAlert><strong>Error -</strong> Action failed. Please try again.</ErrorAlert> : null}
                            {this.state.showSuccessMessage ? <SuccessAlert><strong>Success -</strong> Action performed successfully.</SuccessAlert> : null}
                            <div className="row">
                                <div className="col-12">
                                    <Card padding>
                                        <table className="table table-striped no-wrap" id="majorsTable">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row => {
                                                    return (
                                                        <tr key={row._id}>
                                                            <td><Link to={`/staff/classes/${row._id}`}>{row.name}</Link></td>
                                                            <td style={{width: "150px", minWidth: "150px"}}>
                                                                <Button className="btn btn-sm btn-secondary btn-sm mr-2" data-toggle="modal" data-target={`#editMajorModal-${row._id}`}>Edit</Button>
                                                                <Button className="btn btn-sm btn-danger">Delete</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }): <tr><td colSpan="3" align="center">Data not loaded arrrgh. <Button onClick={e => {e.preventDefault(); this.reloadTable();}}>Reload</Button></td></tr>}
                                            </tbody>
                                        </table>
                                        {this.state.currentTableContent.length > 0 ? <script>{ window.loadTable('#majorsTable') }</script> : null}
                                    </Card>
                                </div>
                            </div>
                        </ContentWrapper>
                    </PageWrapper>

                    {/* Create major modal */}
                    <CreateMajorModal success={this.updateSuccess} error={this.showError}/>

                    {/* Generate edit major modal */}
                    {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row => { return <EditMajorModal key={row._id} majorId={row._id} name={row.name} success={this.updateSuccess} error={this.showError}/> }) : null}
                </div>
            </div>
        );
    }
}

export default withRouter(MajorList);