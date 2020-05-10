import React from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom';

// Services
import AuthService from '../../../services/AuthService';
import CourseService from '../../../services/CourseService';

// UI Elements
import PageWrapper from '../../ui-elements/PageWrapper';
import ContentWrapper from '../../ui-elements/ContentWrapper';
import PageBreadcrumb from '../../ui-elements/PageBreadcrumb';
import Breadcrumb from '../../ui-elements/Breadcrumb';
import Card from '../../ui-elements/Card';
import Table from '../../ui-elements/Table';
import Button from '../../ui-elements/Button';

// Components

class CourseList extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            isLoggedIn: false,
            currentTablePage: 1,
            currentTableContent: [],
            courseName: "",
            coursePrefix: ""
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
        
        CourseService.getCourseGroupCourses(this.props.match.params.groupId, this.state.currentTablePage).then(res => {
            // TODO: add error validation
            this.setState({
                currentTableContent: res[0].courses,
                courseName: res[0].name,
                coursePrefix: res[0].prefix
            });
        })
    }

    render() {
        if (!this.state.isLoggedIn && !this.state.isLoading) return <Redirect to="/"/>
        return (
            <div className="ease-on-load" style={this.state.isLoading ? this.loadingStyle : this.loadedStyle}>
                <PageWrapper>
                    <PageBreadcrumb title={`${this.state.courseName} Courses`} breadcrumb={<Breadcrumb current={this.state.coursePrefix} contents={[{name: "Course Administration", url: ""}, {name: "Courses", url: "/staff/courses"}]}/>}/>
                    <ContentWrapper>
                        <div className="row">
                            <div className="col-12">
                                <Card>
                                    <Table header={["Code", "Name", "Actions"]}>
                                        {this.state.currentTableContent.length > 0 ? this.state.currentTableContent.map(row => {
                                            return (
                                                <tr key={row.code}>
                                                    <th scope="row">{row.code}</th>
                                                    <td><Link to={`/staff/courses/${this.state.coursePrefix}/${row.code}`}>{row.name}</Link></td>
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

export default withRouter(CourseList);