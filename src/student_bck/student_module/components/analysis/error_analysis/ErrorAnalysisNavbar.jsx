import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, NavDropdown, Image, Button, Card, Form } from 'react-bootstrap'
import ChangePwdModaldModal from '../../Profile/ChangePwdModal'
import '../../../components/navbars/_navbars.scss'
import DateTime from 'react-datetime'

class ErrorAnalysisNavbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false
        }
    }

    render() {
        return (
            <div className="erroranalysis-nav">
                <Navbar className="header-top">
                    {/* <Container> */}
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
                                                <Link to="#" className="d-flex align-items-center">
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
                                                </Link>
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
                                            <div className="profile-name">Mr.E Swamy</div>
                                            <small>IP, MPC, Class - XII</small>
                                        </div>
                                    </div>
                                }>
                                    <NavDropdown.Item className="font-weight-bold">swami@entrolabs.com</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/student/profile">My Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="#">Status</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => this.setState({ modalShow: true })}>Change Password</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="#">Feedback</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="#">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    {/* </Container> */}

                    <ChangePwdModaldModal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />
                </Navbar>

                <div className="header-bottom px-3">
                    <Row className="align-items-end pb-4">
                        <Col xl={6} lg={6} md={4} sm={12} xs={12}>
                            <div className="my-3">
                                <div className="top-img mb-3">
                                    <Image src={require('../../../../images/error-analysis-icon.png')} width="120" alt="img" />
                                </div>
                                <h6 className="title mb-0">Error Analysis</h6>
                                <p className="subtitle">Analysis all the your strengths and weakness</p>
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={8} sm={12} xs={12}>
                            <Card as={Card.Body} className="mx-lg-2 my-3">
                                <Image src={require('../../../../images/bulb.png')} width="45" alt="img" />
                                <p className="text-white">Dear Student you have a over confidence you making lots of errors by spending less time on reading questions Spend some appropriate time to read the Question and answer it.</p>
                            </Card>
                        </Col>
                        {/* <Col xl={{ span: 3, offset: 1 }} lg={3} md={6} sm={12} xs={12}>
                            <Form.Group as={Row} className="my-3">
                                <Form.Label column sm="3" className="text-white">Date:</Form.Label>
                                <Col sm="9" className="datePicker">
                                    <i className="calendar far fa-calendar-day" />
                                    <DateTime dateFormat="DD-MM-YYYY" inputProps={{ placeholder: 'Custom Date' }} timeFormat={false} />
                                </Col>
                            </Form.Group>
                        </Col> */}
                    </Row>
                </div>
            </div>
        )
    }
}

export default withRouter(ErrorAnalysisNavbar)
