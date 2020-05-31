import React from 'react';
import {Redirect} from 'react-router-dom';

// Services
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import ClassService from '../../services/ClassService';
import AccessControlService from '../../services/AccessControlService';

// UI Elements
import Preloader from '../ui-elements/Preloader';
import PageWrapper from '../ui-elements/PageWrapper';
import PageBreadcrumb from '../ui-elements/PageBreadcrumb';
import ContentWrapper from '../ui-elements/ContentWrapper';
import Breadcrumb from '../ui-elements/Breadcrumb';
import Card from '../ui-elements/Card';

class Grades extends React.Component {
    constructor() {
        super();
        this.state = {
            isAuthenticating: true,
            isAuthenticated: false,
            isLoading: true,
            userFirstName: "",
            userFirstFullName: "",
            userLastName: "",
            accountDetails: undefined,
            GPA: "-"
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
                    })
                    
                    AccessControlService.hasAccessToPage(localStorage.getItem('universalId'), window.location.pathname)
                    .then(status => {
                        // Load user info
                        if(status) UserService.getUserData()
                        .then(res => {
                            if (res.firstName)
                                this.setState({
                                    userFirstName: res.firstName.split(' ')[0],
                                    userFirstFullName: res.firstName,
                                    userLastName: res.lastName
                                })

                            UserService.getUserAccountDetails(localStorage.getItem('universalId'), sessionStorage.getItem('activeAccount').split(",")[0])
                            .then(res => {
                                this.setState({
                                    accountDetails: res
                                })

                                // Load classes data
                                ClassService.getCourseByStudentId(localStorage.getItem('universalId'))
                                .then(res => {
                                    // Calculate GPA
                                    let GPA = [];
                                    res.forEach(semester => {
                                        GPA.push(ClassService.calculateSemesterGPA(semester, localStorage.getItem('universalId')))
                                    });
                                    GPA = ClassService.calculateGPA(GPA)

                                    this.setState({enrolledSemesters: res, GPA, isLoading: false});
                                }).catch(err => {
                                    this.setState({isLoading: false})
                                });
                            });
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
                        <PageBreadcrumb title="Grades" breadcrumb={<Breadcrumb current="Dashboard"/>}/>
                        <ContentWrapper>
                            { this.state.enrolledSemesters ? this.state.enrolledSemesters.map(semester => {
                                return <Card title={`${semester.period} ${semester.name}`} key={semester._id} padding>
                                    <div className="table-responsive">
                                        <table className="table table-striped no-wrap">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th>Course Name</th>
                                                    <th>Scores</th>
                                                    <th>Final Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { semester.classes.length > 0 ? semester.classes.map(cls => {
                                                    // Calculate final grade
                                                    let finalGrade = 0;
                                                    let allScoresExists = true;
                                                    if (cls.scores.length > 0 && cls.scores.find(item => item.universalId === localStorage.getItem('universalId')) && cls.scores.find(item => item.universalId === localStorage.getItem('universalId')).evaluations.length > 0) 
                                                        cls.scores.find(item => item.universalId === localStorage.getItem('universalId')).evaluations.forEach(evaluation => {
                                                            if (evaluation.score === "") {
                                                                allScoresExists = false;
                                                                return;
                                                            }
                                                            finalGrade += Number.parseInt(evaluation.score) * (Number.parseInt(evaluation.weight)/100) // TODO: CALCULATE WEIGHT
                                                        });
                                                    else allScoresExists = false;
                                                    let grade = allScoresExists ? ClassService.getGrade(finalGrade) : ""
                                                        console.log(cls)
                                                    return <tr key={cls._id}>
                                                        <td><span style={{verticalAlign: "middle"}}>{cls.metadata.name}</span> <span className="badge badge-primary">{cls.metadata.class[0].code}</span></td>
                                                        <td>
                                                            { cls.scores.length > 0 && cls.scores.find(item => item.universalId === localStorage.getItem('universalId')) && cls.scores.find(item => item.universalId === localStorage.getItem('universalId')).length > 0 ? cls.scores.find(item => item.universalId === localStorage.getItem('universalId')).evaluations.map(evaluation => {
                                                                return <div key={evaluation._id} className="row">
                                                                    <span style={{fontWeight: "bold"}}>{evaluation.evaluationName}</span>: {evaluation.score !== "" ? evaluation.score : "-"}
                                                                </div>
                                                            })
                                                            : <div>No Data</div>
                                                            }
                                                        </td>
                                                        <td>
                                                            { allScoresExists ? 
                                                                <div>
                                                                    <span style={{fontWeight: "bold"}}>{grade} </span>
                                                                    ({finalGrade})
                                                                </div>
                                                            : "No Data" }
                                                        </td>
                                                    </tr>
                                                })
                                                :
                                                    <tr>
                                                        <td colSpan="3" style={{textAlign: "center"}}>No data recorded</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                        <div className="mt-2">
                                            Grade Point Semester: {ClassService.calculateSemesterGPA(semester, localStorage.getItem('universalId'))}
                                        </div>
                                    </div>
                                </Card>
                            })
                            : <Card padding>
                                    <div style={{textAlign: "center"}}>
                                        There are no grade data to show.
                                    </div>
                                </Card>
                            }
                            <div className="row">
                                <div className="col-md-6">
                                    <Card title="Your Grade" padding>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Cumulative GPA</th>
                                                        <td>{this.state.GPA}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-md-6">
                                    <Card title="Score Weights" padding>
                                        <div className="table-responsive">
                                            <table className="table table-striped no-wrap">
                                                <thead className="bg-primary text-white">
                                                    <tr>
                                                        <th>Grade</th>
                                                        <th>Score</th>
                                                        <th>Weight</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">A</th>
                                                        <td>90-100</td>
                                                        <td>4.00</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">A-</th>
                                                        <td>85-89</td>
                                                        <td>3.67</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">B+</th>
                                                        <td>80-84</td>
                                                        <td>3.33</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">B</th>
                                                        <td>75-79</td>
                                                        <td>3.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">B-</th>
                                                        <td>70-74</td>
                                                        <td>2.50</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">C</th>
                                                        <td>65-69</td>
                                                        <td>2.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">D</th>
                                                        <td>50-64</td>
                                                        <td>1.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">E</th>
                                                        <td>1-49</td>
                                                        <td>0.00</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">F</th>
                                                        <td>0</td>
                                                        <td>0.00</td>
                                                    </tr>
                                                </tbody>
                                            </table>
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

export default Grades;