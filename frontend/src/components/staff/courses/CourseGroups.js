import React from 'react'
import {Link, Redirect} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import CourseService from '../../../services/CourseService';

// UI Elements
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Card from '../../ui-elements/Card';
import Table from '../../ui-elements/Table';
import Button from '../../ui-elements/Button';
import PageWrapper from '../../ui-elements/PageWrapper';

// Components

class CourseGroups extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false,
            currentTablePage: 1,
            currentTableContent: []
        }

        // Set page display mode when loading
        this.loadingStyle = {visibility: "none"}
        this.loadedStyle = {visibility: "visible", opacity: 1}

        // Bind functions
        this.reloadTable = this.reloadTable.bind(this);
    }

    reloadTable() {
        this.setState({currentTableContent: []});
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
        
        // Load table content
        CourseService.getCourseGroup(this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({currentTableContent: res});
        })
    }

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/"/>
        return (
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title="Courses" root="Course Administration"/>
                    <ContentWrapper>
                        <div className="row">
                            <div className="col-12">
                                <Card>
                                    <Table header={["Code", "Name", "Actions"]}>
                                        {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row => {
                                            return (
                                                <tr key={row.prefix}>
                                                    <th scope="row">{row.prefix}</th>
                                                    <td><Link to={`/staff/courses/${row.prefix}`}>{row.name}</Link></td>
                                                    <td style={{width: "150px", minWidth: "150px"}}>
                                                        <Button className="btn btn-sm btn-secondary btn-sm mr-2">Edit</Button>
                                                        <Button className="btn btn-sm btn-danger">Delete</Button>
                                                    </td>
                                                </tr>
                                            )
                                        }): <tr><td colSpan="3" align="center">Data not loaded arrrgh. <Button onClick={e => {e.preventDefault(); this.reloadTable();}}>Reload</Button></td></tr>}
                                    </Table>
                                </Card>
                            </div>
                        </div>
                    </ContentWrapper>
                </PageWrapper>
            </div>

        );
    }
}

export default CourseGroups;