import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Image, Form, Button } from 'react-bootstrap'
import './_navbars.scss';
import * as Cookies from "es-cookie";
import ChangePassword from './ChangePassword';
import * as compose from 'lodash.flowright';
import Notification from './Notification';

class Navbars extends Component {
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
            Cookies.remove("exam_name");
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
            localStorage.removeItem("packageplan");
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
            <Navbar bg="white" className="header-top">
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

                        {/* <div className="mr-auto" inline="true">
                            <Button variant="link text-dark" onClick={this.props.history.goBack}>Go Back</Button>
                        </div> */}

                        {/* <Form inline className="search mr-auto">
                            <i className="fal fa-search" />
                            <Form.Control className="search-bar border-0"
                                type="text"
                                placeholder="Search..."
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                        </Form> */}
                        <Nav className="ml-auto">
                            <Notification />
                            <div className="profile-img d-flex align-items-center">
                                {Cookies.get("profile_pic") != "" ? (

                                    <Image src={`https://admin.rizee.in/files/${localStorage.getItem("profile_pic")}`} roundedCircle alt="profile-img" />
                                ) : (
                                        <Image src={require('../../../images/businessman.png')} roundedCircle alt="profile-img" />
                                    )}

                                <div className="text mx-2 mt-2">
                                    <div className="profile-name">{Cookies.get("studentusername")}</div>
                                    <small>Exam- {Cookies.get("exam_name")}, Class - {Cookies.get("classid") == "1" ? ("XI") : ("XII")}</small>
                                </div>
                                <NavDropdown id="basic-nav-dropdown2" className="no-arrow" alignRight title={
                                    <i className="fal fa-ellipsis-v text-dark fa-2x mx-2 pt-1" aria-hidden="true"></i>
                                }>
                                    <NavDropdown.Item className="font-weight-bold">{Cookies.get("studentemail")}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {isuserValid.ins_profile_tab == true ? ("") : (<NavDropdown.Item as={Link} to="/student/profile"><i className="far fa-user mr-2" /> My Profile</NavDropdown.Item>)}
                                    {isuserValid.ins_package_tab == true ? ("") : (<NavDropdown.Item as={Link} to="/student/package"><i className="far fa-sack mr-2" /> Subscription Plans</NavDropdown.Item>)}

                                    <NavDropdown.Item onClick={() => this.setState({ modalShow: true })}><i className="far fa-key mr-2" /> Change Password</NavDropdown.Item>
                                    {isuserValid.ins_feedback_tab == true ? ("") : (<NavDropdown.Item as={Link} to="/student/feedback"><i className="far fa-comment-alt-lines mr-2" /> Feedback</NavDropdown.Item>)}

                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} onClick={this.logout}><i className="far fa-sign-out mr-2" /> Logout</NavDropdown.Item>
                                </NavDropdown>
                            </div>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <ChangePassword
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                />
            </Navbar>
        )
    }
}


export default React.memo(withRouter((Navbars)));

