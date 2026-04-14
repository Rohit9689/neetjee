import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, NavDropdown, Image, Button, Card, Form } from 'react-bootstrap'
import ChangePwdModaldModal from '../../Profile/ChangePwdModal'
import '../../../components/navbars/_navbars.scss'
import DateTime from 'react-datetime'
import ChangePassword from '../../../components/navbars/ChangePassword';
import * as Cookies from "es-cookie";

class TopNavbar extends Component {
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
        return (
            <div className="practice-exam-analysis-nav">
                <Navbar className="header-top">
                    <Container>
                        <Button variant="light" className="px-2 py-1 mr-2" onClick={() => this.props.onClick()}>
                            <i className="fal fa-bars" />
                        </Button>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
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
                                                {/* <Link to="#" className="d-flex align-items-center">
                                                    <Image src={require('../../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                                    <div className="notification-contnet">
                                                        <h5>Luanch Admin</h5>
                                                        <p className="mail-desc">Just see the my new admin!</p>
                                                        <span className="time">9:30 AM</span>
                                                    </div>
                                                </Link>
                                                <Link to="#" className="d-flex align-items-center">
                                                    <Image src={require('../../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                                    <div className="notification-contnet">
                                                        <h5>Lorem ipsum dolor sit amet</h5>
                                                        <p className="mail-desc">Just a reminder that you have event</p>
                                                        <span className="time">9:10 AM</span>
                                                    </div>
                                                </Link>
                                                <Link to="#" className="d-flex align-items-center">
                                                    <Image src={require('../../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                                    <div className="notification-contnet">
                                                        <h5>Lorem ipsum dolor sit</h5>
                                                        <p className="mail-desc">You can customize this template as you want</p>
                                                        <span className="time">9:08 AM</span>
                                                    </div>
                                                </Link>
                                                <Link to="#" className="d-flex align-items-center">
                                                    <Image src={require('../../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                                    <div className="notification-contnet">
                                                        <h5>Lorem ipsum dolor sit amet admin</h5>
                                                        <p className="mail-desc">Just see the my admin!</p>
                                                        <span className="time">9:02 AM</span>
                                                    </div>
                                                </Link> */}
                                            </div>
                                        </li>
                                        <li>
                                            <Link className="pt-2 nav-link text-dark text-center" to="#"> All notifications</Link>
                                        </li>
                                    </ul>
                                </NavDropdown>
                                <NavDropdown id="basic-nav-dropdown2" className="no-arrow" alignRight title={
                                    <div className="profile-img d-flex align-items-center">
                                        <Image src={require('../../../../images/businessman.png')} roundedCircle alt="profile-img" />
                                        <div className="text mx-2 mt-2">
                                            <div className="profile-name">{Cookies.get("studentusername")}</div>
                                            <small>Branch- {Cookies.get("branch_name")}, Class - {Cookies.get("class_id") == "1" ? ("XI") : ("XII")}</small>
                                        </div>
                                    </div>
                                }>
                                    <NavDropdown.Item className="font-weight-bold">{Cookies.get("studentemail")}</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/student/profile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="#">Status</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => this.setState({ modalShow: true })}>Change Password</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="#">Feedback</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                    <ChangePassword show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />
                </Navbar>

                <Container className="header-bottom">
                    <Row className="align-items-end pb-4">
                        <Col xl={3} lg={3} md={6} sm={12} xs={12}>
                            <div className="mb-3">
                                <ul className="list-inline mb-2">
                                    <li className="list-inline-item">
                                        <Image src={require('../../../../images/student-01.png')} alt="img" width="30" />
                                        <p className="text-white">Learn</p>
                                    </li>
                                    <li className="list-inline-item">
                                        <Image src={require('../../../../images/student-02.png')} alt="img" width="40" />
                                        <p className="text-white">Practice</p>
                                    </li>
                                    <li className="list-inline-item">
                                        <Image src={require('../../../../images/student-03.png')} alt="img" width="45" />
                                        <p className="text-white">Exam</p>
                                    </li>
                                </ul>

                                <h6 className="text-white mb-0">Practice &amp; Exams</h6>
                                <p className="text-light">Analysis all the your Strenths and weakness</p>
                            </div>
                        </Col>
                        <Col xl={5} lg={6} md={6} sm={12} xs={12}>
                            <Card as={Card.Body} className="mx-lg-2 my-3">
                                <Image src={require('../../../../images/bulb.png')} width="45" alt="img" />
                                <p className="text-white">Dear Student you have a over confidence you making lots of errors by spending less time on reading questions Spend some appropriate time to read the Question and answer it.</p>
                            </Card>
                        </Col>
                        <Col xl={{ span: 3, offset: 1 }} lg={3} md={6} sm={12} xs={12}>
                            {/* <Form.Group as={Row} className="my-3">
                                <Form.Label column sm="3" className="text-white">Date:</Form.Label>
                                <Col sm="9" className="datePicker">
                                    <i className="calendar far fa-calendar-day" />
                                    <DateTime dateFormat="DD-MM-YYYY" inputProps={{ placeholder: 'Custom Date' }} timeFormat={false} />
                                </Col>
                            </Form.Group> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(TopNavbar)
