import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import * as Cookies from "es-cookie";
import ChangePassword from '../components/navbars/ChangePassword';

class CustomsubmitBack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false
        }
    }
    logout = () => {
        if (Cookies.get("studenttoken") !== undefined) {
            Cookies.remove("studenttoken");
            Cookies.remove("studentusername");
            Cookies.remove("studentrefreshtoken");
            Cookies.remove("studentemail");
            Cookies.remove("mobile");
            Cookies.remove("classid");
            Cookies.remove("examid");
            Cookies.remove("mobileverified");
            Cookies.remove("targetyear");
            Cookies.remove("role");
            this.props.history.push("/student/login");
        }
    };
    render() {
        if (Cookies.get("studenttoken") == undefined)
            this.props.history.push("/student/login");
        return (
            <div className="PracticeInstructions">
                <Navbar className="navbar navbar-expand-md navbar-white bg-white shadow-sm">
                    <Container fluid>
                        <Link
                            to="/student/home"
                        >
                            <Image src={require('../../images/logo-black.png')} width="100" alt="logo" />
                        </Link>
                        <Nav className="ml-auto">
                            <NavDropdown id="basic-nav-dropdown1" className="student-notification no-arrow" alignRight title={
                                <span><i className="fal fa-bell" /></span>
                            }>
                                <ul>
                                    <li>
                                        <div className="drop-title">Your Notifications</div>
                                    </li>
                                    <li>
                                        <div className="notification-center">
                                            <a href="/#" className="d-flex align-items-center">
                                                <Image src={require('../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                                <div className="notification-contnet">
                                                    <h5>Luanch Admin</h5>
                                                    <p className="mail-desc">Just see the my new admin!</p>
                                                    <span className="time">9:30 AM</span>
                                                </div>
                                            </a>
                                            <a href="/#" className="d-flex align-items-center">
                                                <Image src={require('../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                                <div className="notification-contnet">
                                                    <h5>Lorem ipsum dolor sit amet</h5>
                                                    <p className="mail-desc">Just a reminder that you have event</p>
                                                    <span className="time">9:10 AM</span>
                                                </div>
                                            </a>
                                            <a href="/#" className="d-flex align-items-center">
                                                <Image src={require('../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                                <div className="notification-contnet">
                                                    <h5>Lorem ipsum dolor sit</h5>
                                                    <p className="mail-desc">You can customize this template as you want</p>
                                                    <span className="time">9:08 AM</span>
                                                </div>
                                            </a>
                                            <a href="/#" className="d-flex align-items-center">
                                                <Image src={require('../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                                <div className="notification-contnet">
                                                    <h5>Lorem ipsum dolor sit amet admin</h5>
                                                    <p className="mail-desc">Just see the my admin!</p>
                                                    <span className="time">9:02 AM</span>
                                                </div>
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="pt-2 nav-link text-center text-secondary" href="/#"> All
                                            notifications</a>
                                    </li>
                                </ul>
                            </NavDropdown>
                            <NavDropdown id="basic-nav-dropdown2" className="no-arrow" alignRight title={
                                <span><i className="fal fa-user-circle" /></span>
                            }>
                                <NavDropdown.Item className="font-weight-bold">{Cookies.get("studentusername")}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#/">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#/">Status</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.setState({ modalShow: true })}>Change Password</NavDropdown.Item>
                                <NavDropdown.Item href="#/">Feedback</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Container>
                </Navbar>
                <div className="bg-success py-3">
                    <Container fluid className="d-flex justify-content-between align-items-center">
                        <Link to={{
                            pathname: "/student/exams/custom-exam",

                        }} className="my-0 font-weight-normal text-light"><i className="fal fa-arrow-left" /> Back</Link>
                        <div className="my-2 my-md-0 text-center">
                            <h6 className="title mb-0 mr-4 text-white">You have completed practice test successfully</h6>
                        </div>
                        <div>&nbsp;</div>
                    </Container>
                    <ChangePassword
                        show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })}
                    />
                </div>

                <div className="bg-white py-3 border-top shadow-sm">
                    <Container>
                        <Row>
                            <Col xl={12} lg={12} md={12} className="text-right">
                                <Link
                                    to={{
                                        pathname: "/student/exams/custom-exam",

                                    }}

                                    className="btn btn-outline-primary px-5">Back</Link>
                                {/* <Button variant="outline-danger" className="px-4" onClick={this.props.pcancelFunction} style={{ borderRadius: 25 }}><i className="fal fa-times mr-2" /> Close</Button> */}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default CustomsubmitBack
