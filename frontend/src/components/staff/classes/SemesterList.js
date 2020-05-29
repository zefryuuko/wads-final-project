import React from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import ClassService from '../../../services/ClassService';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Breadcrumb from '../../ui-elements/Breadcrumb';
import Card from '../../ui-elements/Card';
import Button from '../../ui-elements/Button';
import Preloader from '../../ui-elements/Preloader';
import CreateSemesterModal from './components/CreateSemesterModal';

// Components

class SemesterList extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isAuthenticating: true,
            isAuthenticated: false,
            currentTablePage: 1,
            currentTableContent: [],
            pageTitle: "Loading..."
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.reloadTable = this.reloadTable.bind(this);
    }

    reloadTable() {
        this.setState({isLoading: true});

        ClassService.getSemesters(this.props.match.params.majorId, this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({
                pageTitle: res.name,
                currentTableContent: res.linkedSemesters,
                isLoading: false
            });
        });
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
                
                ClassService.getSemesters(this.props.match.params.majorId, this.state.currentTablePage).then(res => {
                    // TODO: add error validation
                    this.setState({
                        pageTitle: res.name,
                        currentTableContent: res.linkedSemesters,
                        isLoading: false
                    });
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
                        <PageBreadcrumb 
                            title={this.state.pageTitle} 
                            root="Course Administration"
                            breadcrumb={<Breadcrumb current={this.state.pageTitle} contents={[{name: "Course Administration", url: ""}, {name: "Classes", url: "/staff/classes"}]}/>}
                            rightComponent={<button className="btn btn-primary btn-circle mr-2" data-toggle="modal" data-target={`#createSemesterModal`} style={{lineHeight:0}} ><i className="icon-plus"/></button>}
                        />
                        <ContentWrapper>
                            <div className="row">
                                <div className="col-12">
                                    <Card padding>
                                        <table className="table table-striped no-wrap" id="semestersTable">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>Period</th>
                                                    <th>Name</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row => {
                                                    return (
                                                        <tr key={row._id}>
                                                            <th scope="row">{row.period}</th>
                                                            <td className="col"><Link to={`/staff/classes/${this.props.match.params.majorId}/${row.semesterId}`}>{row.name}</Link></td>
                                                            <td style={{width: "150px", minWidth: "150px"}}>
                                                                <Button className="btn btn-sm btn-secondary btn-sm mr-2">Edit</Button>
                                                                <Button className="btn btn-sm btn-danger">Delete</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }): <tr><td colSpan="3" align="center">No Data</td></tr>}
                                            </tbody>
                                        </table>
                                        {this.state.currentTableContent.length > 0 ? <script>{ window.loadTable('#semestersTable') }</script> : null}
                                    </Card>
                                </div>
                            </div>
                        </ContentWrapper>
                    </PageWrapper>
                    <CreateSemesterModal majorId={this.props.match.params.majorId} success={this.reloadTable}/>
                </div>
            </div>
        );
    }
}

export default withRouter(SemesterList);