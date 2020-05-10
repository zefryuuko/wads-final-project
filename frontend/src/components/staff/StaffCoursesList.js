import React from 'react'
import {Redirect} from 'react-router-dom';

// Services
import AuthService from '../../services/AuthService';
import CourseService from '../../services/CourseService';

// UI Elements
import MainWrapper from '../ui-elements/MainWrapper';
import PageWrapper from '../ui-elements/PageWrapper';
import ContentWrapper from '../ui-elements/ContentWrapper';
import PageBreadcrumb from '../ui-elements/PageBreadcrumb';
import Card from '../ui-elements/Card';
import Table from '../ui-elements/Table';
import Button from '../ui-elements/Button';

// Components
import Preloader from '../Preloader';
import Navbar from './Navbar';
import Sidebar from './Sidebar'
import Footer from '../Footer';

class StaffCourseList extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false,
            currentTablePage: 1,
            currentTableContent: []
        }

        // Set page display mode when loading
        this.loadingStyle = {display: "none"}
        this.loadedStyle = {display: ""}

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
            <MainWrapper>
                <Preloader/>
                <div style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                    <Navbar />
                    <Sidebar />
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
                                                        <td>{row.name}</td>
                                                        <td style={{width: "150px", minWidth: "150px"}}>
                                                            <Button className="btn btn-sm btn-secondary btn-sm mr-2">Edit</Button>
                                                            <Button className="btn btn-sm btn-danger">Delete</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            }): <tr><td colSpan="3" align="center">Data not loaded arrrgh. <a href="#reload" onClick={e => {e.preventDefault(); this.reloadTable();}}>Try reloading?</a></td></tr>}
                                        </Table>
                                    </Card>
                                </div>
                            </div>
                        </ContentWrapper>
                        <Footer />
                    </PageWrapper>
                </div>
            </MainWrapper>
        );
    }
}

export default StaffCourseList;