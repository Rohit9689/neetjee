import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap'

import './_exam.scss'
import UserRestrictionAlert from "../home/UserRestrictionAlert";
import { withRouter } from "react-router-dom";
import * as Cookies from "es-cookie";

class ExamSection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userRestionModalShow: false
        }
    };
    scheduleFun = (type, modaldata) => {
        console.log("type, modaldata", type, modaldata);
        if (type == "schedule") {
            if (modaldata == false) {
                this.setState({
                    userRestionModalShow: false
                });
                this.props.history.push({
                    pathname: "/student/exams/schedule-exam"
                });
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }
        if (type == "custom") {
            
                if (modaldata == false) {

                    this.setState({
                        userRestionModalShow: false
                    });
                    this.props.history.push({
                        pathname: "/student/exams/custom-exam"
                    });
                }
                else {
                    this.setState({
                        userRestionModalShow: true
                    });
                }
            
        }
        if (type == "error") {
            if (modaldata == false) {
                this.setState({
                    userRestionModalShow: false
                });
                this.props.history.push({
                    pathname: "/student/exams/error-exam"
                });
            }
            else {
                this.setState({
                    userRestionModalShow: true
                });
            }
        }
        if (type == "previous") {
            
                if (modaldata == false) {
                    this.setState({
                        userRestionModalShow: false
                    });
                    this.props.history.push({
                        pathname: "/student/exams/previous-paper-exam"
                    });
                }
                else {
                    this.setState({
                        userRestionModalShow: true
                    });
                }
            

        }


    }
    render() {
        const isuserValid = JSON.parse(this.props.isStudentUserValid.user_access_restictions);
        console.log("exisuserValid", isuserValid);
        if (isuserValid.exam_tab == true) {
            return (
                <div className="exam_section">

                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <div className="text-center">
                                <i className="fal fa-exclamation-triangle fa-3x mb-3 text-danger" />
                                <h5 className="text-danger">Exams feature is not available for your package</h5>
                            </div>

                        </Col>
                    </Row>

                </div>
            )
        } else {
            return (
                <div className="exam_section">
                    <Row>
                        <Col xl={12} lg={12} md={12} sm={12}>
                            <h5 className="title">Create Exams</h5>
                        </Col>
                        <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                            <Link
                                onClick={() => this.scheduleFun("schedule", isuserValid.schedule_exam)}
                            >
                                <Card className="shadow-sm border-0 single-card h-100">
                                    <Card.Header className="d-flex justify-content-between bg-white">
                                        <div className="icons schedule">
                                            <i className="fal fa-calendar-day" />
                                        </div>
                                        <small>&nbsp;</small>
                                    </Card.Header>
                                    <Card.Body className="pt-5">
                                        <Card.Title>Schedule Exam</Card.Title>
                                        <Card.Text>Exams are scheduled from college and from other sources</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        
                            <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                                <Link
                                    onClick={() => this.scheduleFun("custom", isuserValid.custom_exam)}
                                >
                                    <Card className="shadow-sm border-0 single-card h-100">
                                        <Card.Header className="d-flex justify-content-between bg-white">
                                            <div className="icons custom">
                                                <i className="fal fa-file-alt" />
                                            </div>
                                            <small>&nbsp;</small>
                                        </Card.Header>
                                        <Card.Body className="pt-5">
                                            <Card.Title>Custom Exam</Card.Title>
                                            <Card.Text>Write Chapter, Cumulative, Semi-Grand and Grand Tests with Custom patterns.</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        


                        <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                            <Link
                                onClick={() => this.scheduleFun("error", isuserValid.error_exam)}
                            >
                                <Card className="shadow-sm border-0 single-card h-100">
                                    <Card.Header className="d-flex justify-content-between bg-white">
                                        <div className="icons error">
                                            <i className="fal fa-file-exclamation" />
                                        </div>
                                        <small>&nbsp;</small>
                                    </Card.Header>
                                    <Card.Body className="pt-5">
                                        <Card.Title>Error Exam</Card.Title>
                                        <Card.Text>Generate and take exam on Error questions.</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        {/* <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                            <Link to="/student/exams/adaptive-exam">
                                <Card className="shadow-sm border-0 single-card h-100">
                                    <Card.Header className="d-flex justify-content-between bg-white">
                                        <div className="icons adaptive">
                                            <i className="fal fa-clipboard-list-check" />
                                        </div>
                                        <small>10</small>
                                    </Card.Header>
                                    <Card.Body className="pt-5">
                                        <Card.Title>Adaptive exam</Card.Title>
                                        <Card.Text>Exams are scheduled from college and from other sources</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col> */}
                        
                            <Col xl={4} lg={4} md={6} sm={6} xs={12} className="mb-4">
                                <Link
                                    onClick={() => this.scheduleFun("previous", isuserValid.previous_exam)}
                                >
                                    <Card className="shadow-sm border-0 single-card h-100">
                                        <Card.Header className="d-flex justify-content-between bg-white">
                                            <div className="icons fitness">
                                                <i className="fal fa-scroll-old" />
                                            </div>
                                            <small>&nbsp;</small>
                                        </Card.Header>
                                        <Card.Body className="pt-5">
                                            <Card.Title>Previous Paper Exam</Card.Title>
                                            <Card.Text>Attempt Previous Papers  or Generate custom test from Previous paper questions.</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        

                    </Row>
                    <UserRestrictionAlert
                        show={this.state.userRestionModalShow}
                        onHide={() => this.setState({ userRestionModalShow: false })}
                    />
                </div>
            )
        }

    }
}

export default withRouter(ExamSection);
