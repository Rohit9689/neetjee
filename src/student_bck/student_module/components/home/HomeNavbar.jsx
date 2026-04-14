import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, NavDropdown, Image, Button } from 'react-bootstrap'
import ChangePwdModaldModal from '../../components/Profile/ChangePwdModal'
import '../../components/navbars/_navbars.scss'
import * as Cookies from "es-cookie";
import ChangePassword from '../navbars/ChangePassword';
import moment from 'moment';
import Notification from '../navbars/Notification';
class HomeNavbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false
        }
    }
    navbarClass() {
        console.log("navbarClass", this.props.getSubjects, this.props.stateData.mainindex);
        let getData = this.props.getSubjects[this.props.stateData.mainindex];
        let classname = "";
        if (getData.subject == "Botany") {
            classname = "student-top-nav pb-5 botany"
        }
        else if (getData.subject == "Physics") {
            classname = "student-top-nav pb-5 physics"
        }
        else if (getData.subject == "Chemistry") {
            classname = "student-top-nav pb-5"
        }
        else if (getData.subject == "Zoology") {
            classname = "student-top-nav pb-5 zoology"
        }
        else if (getData.subject == "Mathematics") {
            classname = "student-top-nav pb-5 maths"
        }
        return classname;

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
            Cookies.remove("exam_name");
            Cookies.remove("mobileverified");
            Cookies.remove("targetyear");
            Cookies.remove("videos");
            Cookies.remove("branch_name");
            Cookies.remove("role", "");
            Cookies.remove("profile_pic");
            Cookies.remove("student_userlevel");
            Cookies.remove("stulogintype", "");
            localStorage.removeItem('profile_pic');
            localStorage.removeItem('studentglobals');
            localStorage.removeItem('globalsubjects');
            localStorage.removeItem("packageplan");
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
        console.log("homenavbar", Cookies.get("institute_logo"));
        return (
            <div className={this.navbarClass()}>
                <Navbar className="header-top">
                    <Container>
                        <Button variant="light" className="px-2 py-1 mr-2" onClick={() => this.props.onClick()}>
                            <i className="fal fa-bars" />
                        </Button>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <div className="mr-auto d-flex align-items-center">
                                {/* <Button variant="light text-dark mr-2" onClick={this.props.history.goBack}> <i className="fas fa-long-arrow-alt-left" /> Back</Button> */}
                                {Cookies.get("institute_logo") != "" ? (
                                    <Image className="d-none d-xl-block d-lg-block" src={Cookies.get("institute_logo")} height="30" style={{ width: 'auto', minWidth: 60 }} />
                                ) : ("")}

                                <h6 className="ml-2 mb-0 d-none d-xl-block d-lg-block">{Cookies.get("institute_name")}</h6>
                            </div>

                            <Nav className="ml-auto flex-column">
                                <div className="d-flex align-items-center">
                                    <Notification />
                                    <div className="profile-img d-flex align-items-center">
                                        {Cookies.get("profile_pic") != "" ? (

                                            <Image src={`https://admin.rizee.in/files/${localStorage.getItem("profile_pic")}`} roundedCircle alt="profile-img" />
                                        ) : (
                                                <Image src={require('../../../images/businessman.png')} roundedCircle alt="profile-img" />
                                            )}

                                        <div className="text mx-2 mt-2">
                                            <div className="profile-name text-dark">{Cookies.get("studentusername")}</div>

                                            <small className="text-muted">Exam- {Cookies.get("exam_name")}, Class - {Cookies.get("classid") == "1" ? ("XI") : ("XII")}</small>
                                        </div>
                                        <NavDropdown id="basic-nav-dropdown2" className="no-arrow" alignRight title={
                                            <i className="fal fa-ellipsis-v text-dark fa-2x mx-2" aria-hidden="true"></i>
                                        }>
                                            <NavDropdown.Item className="font-weight-bold">{Cookies.get("email")}</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            {isuserValid.ins_profile_tab == true ? ("") : (<NavDropdown.Item as={Link} to="/student/profile"><i className="far fa-user mr-2" /> My Profile</NavDropdown.Item>)}
                                            {isuserValid.ins_package_tab == true ? ("") : (<NavDropdown.Item as={Link} to="/student/package"><i className="far fa-sack mr-2" /> Subscription Plans</NavDropdown.Item>)}

                                            <NavDropdown.Item onClick={() => this.setState({ modalShow: true })}><i className="far fa-key mr-2" /> Change Password</NavDropdown.Item>
                                            {isuserValid.ins_feedback_tab == true ? ("") : (<NavDropdown.Item as={Link} to="/student/feedback"><i className="far fa-comment-alt-lines mr-2" /> Feedback</NavDropdown.Item>)}
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item as={Link} onClick={this.logout}><i className="far fa-sign-out mr-2" /> Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </div>

                                </div>
                                <div className="text-light" style={{ paddingLeft: 100 }}>
                                    {moment().format("DD-MM-YYYY @ LT")}
                                </div>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                    <ChangePassword
                        show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })}
                    />
                    {/* <ChangePwdModaldModal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} /> */}
                </Navbar>
                <Container className="header-bottom">
                    <Row className="align-items-end pt-xl-2 pt-lg-2 pb-4">
                        <Col xl={{ span: 5, order: 1 }} lg={{ span: 6, order: 2 }} md={{ span: 6, order: 1 }} sm={{ span: 6, order: 1 }} xs={{ span: 12, order: 2 }}>
                            <h6 className="text-white"><span className="font-weight-normal">
                                Hey there!
                                </span><br /> Greetings {Cookies.get("studentusername")},</h6>
                            <p className="text-light">Start new goal and improve your result</p>
                        </Col>
                        <Col xl={7} lg={{ span: 6, order: 2 }} md={{ span: 6, order: 1 }} sm={{ span: 6, order: 2 }} xs={{ span: 12, order: 1 }} className="text-xl-right">
                            <p className="text-light" style={{ paddingRight: 10 }}><small className="text-white-50">let's do some task today</small><br />
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(HomeNavbar)
