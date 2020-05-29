import React, { Component } from 'react';

// Services
import CourseService from '../../../../services/CourseService';
import ClassService from '../../../../services/ClassService';

// UI Components
import Modal from '../../../ui-elements/Modal';
import ModalBody from '../../../ui-elements/ModalBody';
import ModalHeader from '../../../ui-elements/ModalHeader';
import ModalFooter from '../../../ui-elements/ModalFooter';
import Button from '../../../ui-elements/Button';
import ErrorAlert from '../../../ui-elements/ErrorAlert';

class CreateClassModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classCode: "",
            courseGroup: "",
            courseCode: "",
            courseClass:"",
            courseGroups: [],
            courses: undefined,
            courseClasses: undefined,
            isLoading: true,
            isUpdating: false,
            showErrorAlert: false,
            errorAlertMessage: ""
        }
        
        // Bind functions
        this.handleChange = this.handleChange.bind(this);
        this.onSaveChangesClicked = this.onSaveChangesClicked.bind(this)
    }

    handleChange(event) {
        let {name, value} = event.target;

        if (name === "courseGroup") {
            if (value === "") {
                this.setState({ courses: undefined, courseClasses: undefined, courseCode: "", courseClass: "" });
                return;
            }

            this.setState({isLoading: true});
            CourseService.getCourseGroupCourses(value).then(group => {
                this.setState({
                    courses: group[0].courses.sort((item1, item2) => {
                        if (item1.code > item2.code) return 1;
                        return -1;
                    }),
                    isLoading: false
                });
            });
        } else if (name === "courseCode") {
            if (value === "") {
                this.setState({ courseClasses: undefined, courseClass: "" });
                return;
            }

            this.setState({isLoading: true});
            CourseService.getCourse(value).then(course => {
                this.setState({
                    courseClasses: course.class.sort((item1, item2) => {
                        if (item1.code > item2.code) return 1;
                        return -1;
                    }),
                    isLoading: false
                });
            });
        }

        this.setState({
            [name]: value
        });
    }

    closeModal(modalId) {
        window.$(() => {
            window.$(modalId).modal('toggle');
         });
    }

    showErrorAlert(message) {
        this.setState({
            showErrorAlert: true,
            errorAlertMessage: message
        });
    }

    onSaveChangesClicked(e) {
        e.preventDefault();
        this.setState({isUpdating: true, showErrorAlert: false, errorAlertMessage: ""});
        ClassService.createClass(this.props.semesterId, this.state.classCode, this.state.courseCode, this.state.courseClass)
            .then((res) => {
                this.props.success();
                this.closeModal(`#createClassModal`);
                this.setState({isUpdating: false, prefix: "", name: ""});
            })
            .catch((res, err) =>{
                if (err.response.status === 409) { 
                    this.showErrorAlert(err.response.data.message);
                    this.setState({isUpdating: false});
                } else {
                    this.props.error();
                    this.closeModal('#createClassModal');
                    this.setState({isUpdating: false});
                }
            });
    }

    componentDidMount() {
        CourseService.getCourseGroup().then(courseGroups => {
            this.setState({
                courseGroups: courseGroups.sort((item1, item2) => {
                    if (item1 > item2) return -1;
                    return 1;
                }),
                isLoading: false
            });
        });
    }

    render() { 
        return (
            <Modal id={`createClassModal`}>
                <ModalHeader title={`Create new class`} disableClose={this.state.isUpdating}/>
                <ModalBody>
                    <form onSubmit={this.onSaveChangesClicked} action="post"> 
                        <div className="pl-3 pr-3">
                            {this.state.showErrorAlert ? <ErrorAlert>{this.state.errorAlertMessage}</ErrorAlert> : null}
                            <h4 style={{borderBottom: "1px solid #E0E0E0"}}>Class Details</h4>
                            <div className="form-group">
                                <label htmlFor="classCode">Class Code</label>
                                <input className="form-control" name="classCode" placeholder="Example: L4AC" value={this.state.classCode} onChange={this.handleChange} disabled={this.state.isUpdating} minLength="4" maxLength="4" required/>
                                <small>A class code consists of 4 alphanumeric characters.</small>
                            </div>
                            <h4 style={{borderBottom: "1px solid #E0E0E0"}}>Select Course</h4>
                            <div className="form-group">
                                <label htmlFor="major">Course Type</label>
                                <select className="form-control" name="courseGroup" onChange={this.handleChange}>
                                    <option value=""></option>
                                    { this.state.courseGroups ? 
                                        this.state.courseGroups.map(group => {
                                            return <option key={group.prefix} value={group.prefix}>{group.prefix} - {group.name}</option>
                                        })
                                    : null}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="major">Course</label>
                                <select className="form-control" name="courseCode" onChange={this.handleChange} disabled={!this.state.courseGroup || this.state.isLoading || this.state.isUpdating}>
                                    <option value="">{ this.state.isLoading && this.state.courseGroup ? "Loading..." : "-- Choose a course type --" }</option>
                                    { this.state.courses ? 
                                        this.state.courses.map(course => {
                                            return <option key={course.code} value={course.code}>{course.code} - {course.name}</option>
                                        })
                                    : null}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="major">Class Type</label>
                                <select className="form-control" name="courseClass" onChange={this.handleChange} disabled={!this.state.courseClasses || this.state.isLoading || this.state.isUpdating}>
                                    <option value="">{ this.state.isLoading && this.state.courseGroup ? "Loading..." : "-- Choose a class type --" }</option>
                                    { this.state.courseClasses ? 
                                        this.state.courseClasses.map(cls => {
                                            return <option key={cls.code} value={cls.code}>{cls.code}</option>
                                        })
                                    : null}
                                </select>
                            </div>
                        </div>
                        <ModalFooter disableClose={this.state.isUpdating}>
                            <Button type="submit" className="btn btn-primary" loading={this.state.isUpdating} disabled={!(this.state.courseGroup !== "" && this.state.courseCode !== "" && this.state.courseClass !== "")}>Create</Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}
 
export default CreateClassModal;