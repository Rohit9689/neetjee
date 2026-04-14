import React, { Component } from 'react'
import { Container, Row, Col, Nav, Navbar, NavDropdown, Badge, Image, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

import "./_getready-for-exam-navbar.scss"
import * as Cookies from "es-cookie";
import Notification from "../navbars/Notification"
import ChangePassword from '../navbars/ChangePassword'
class GetReadyForExamTopNavbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false
        }
    }
    logout = () => {
        if (Cookies.get("studenttoken") !== undefined) {
            Cookies.remove("studenttoken");
            Cookies.remove("studentrefreshtoken");
            Cookies.remove("studentusername");
            Cookies.remove("studentemail");

            Cookies.remove("mobile");
            Cookies.remove("classid");
            Cookies.remove("examid");
            Cookies.remove("mobileverified");
            Cookies.remove("targetyear");
            Cookies.remove("videos");
            Cookies.remove("branch_name");
            Cookies.remove("role", "");
            Cookies.remove("profile_pic");
            Cookies.remove("student_userlevel");
            Cookies.remove("stulogintype", "");
            Cookies.remove("institution_id");
            localStorage.removeItem('profile_pic');
            localStorage.removeItem('studentglobals');
            localStorage.removeItem('globalsubjects');
            this.props.history.push("/student/login");
        }
    };
    render() {
        let isStudentUserValid = "";
        if (JSON.parse(localStorage.getItem("isStudentUserValid")) != "") {
            isStudentUserValid = JSON.parse(localStorage.getItem("isStudentUserValid"));
        }
        else {
            this.props.history.push("/student/login");
        }
        const isuserValid = JSON.parse(
            isStudentUserValid.user_access_restictions
        );
        return (
            <div className="get_ready_for_exam_navbar">
                <Navbar className="header-top">
                    <Container>
                        <Button variant="light" className="px-2 py-1 mr-2" onClick={() => this.props.onClick()}>
                            <i className="fal fa-bars" />
                        </Button>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                            <Notification />
                            <NavDropdown id="basic-nav-dropdown2" className="no-arrow" alignRight title={
                                <div className="profile-img d-flex align-items-center">
                                    {Cookies.get("profile_pic") != "" ? (

                                        <Image src={`https://admin.rizee.in/files/${localStorage.getItem("profile_pic")}`} roundedCircle alt="profile-img" />
                                    ) : (
                                            <Image src={require('../../../images/businessman.png')} roundedCircle alt="profile-img" />
                                        )}

                                    <div className="text mx-2 mt-2">
                                        <div className="profile-name">{Cookies.get("studentusername")}</div>
                                        <small>Exam- {Cookies.get("examid") == 1 ? ("NEET") : Cookies.get("examid") == 2 ? ("JEE") : ("NEET & JEE")}, Class - {Cookies.get("class_id") == "1" ? ("XI") : ("XII")}</small>
                                    </div>
                                </div>
                            }>
                                <NavDropdown.Item className="font-weight-bold">{Cookies.get("studentemail")}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {isuserValid.ins_profile_tab == true ? ("") : (<NavDropdown.Item as={Link} to="/student/profile"><i className="far fa-user mr-2" /> My Profile</NavDropdown.Item>)}
                                {isuserValid.ins_package_tab == true ? ("") : (<NavDropdown.Item as={Link} to="/student/package"><i className="far fa-sack mr-2" /> Package</NavDropdown.Item>)}

                                <NavDropdown.Item onClick={() => this.setState({ modalShow: true })}><i className="far fa-key mr-2" /> Change Password</NavDropdown.Item>
                                {isuserValid.ins_feedback_tab == true ? ("") : (<NavDropdown.Item as={Link} to="/student/feedback"><i className="far fa-comment-alt-lines mr-2" /> Feedback</NavDropdown.Item>)}

                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} onClick={this.logout}><i className="far fa-sign-out mr-2" /> Logout</NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                    <ChangePassword
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                />
                </Navbar>
                <div className="header-bottom py-2">
                    <Container>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <Image src={require('../../../images/getreadyforexam.svg')} alt="Get Ready For Exam Image" width="200" />
                                <h5 className="mt-4 title">Get Ready For Exam</h5>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

 
export default withRouter(GetReadyForExamTopNavbar);