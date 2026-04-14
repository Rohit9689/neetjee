import React, { Component } from 'react'
import { Container, Row, Col, Nav, Navbar, NavDropdown, Badge, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ChangePwdModal from '../Profile/ChangePwdModal'
import './_scrolltopnavbar.scss'

class ScrollTopNavbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false
        }
    }
    render() {
        return (
            <div className="scroll-header">
                <Navbar className="header-top">
                    <Container>
                        <Button variant="light" className="px-2 py-1 mr-2" onClick={() => this.props.onClick()}>
                            <i className="fal fa-bars" />
                        </Button>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <NavDropdown id="basic-nav-dropdown1" className="student-notification no-arrow" alignRight title={
                                    <span className="position-relative">
                                        <i className="fal fa-bell" />
                                        <Badge className="position-absolute rounded-circle text-white" style={{ top: -14, right: -10, backgroundColor: '#f81201' }}>2</Badge>
                                    </span>
                                }>
                                    <ul>
                                        <li>
                                            <div className="drop-title">Your Notifications</div>
                                        </li>
                                        <li>
                                            <div className="notification-center">
                                                <Link to="/notifications/notification" className="d-flex align-items-start">
                                                    <div className="notification-icon pt-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                            <g id="Layer">
                                                                <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="notification-contnet">
                                                        <h5>Luanch Admin</h5>
                                                        <p className="mail-desc">Just see the my new admin!</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <span className="date">17-Jun-2020</span>
                                                            <span className="time">9:30 AM</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to="/notifications/notification" className="d-flex align-items-start">
                                                    <div className="notification-icon pt-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                            <g id="Layer">
                                                                <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="notification-contnet">
                                                        <h5>Lorem ipsum dolor sit amet</h5>
                                                        <p className="mail-desc">Just a reminder that you have event</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <span className="date">17-Jun-2020</span>
                                                            <span className="time">9:30 AM</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to="/notifications/notification" className="d-flex align-items-start">
                                                    <div className="notification-icon pt-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                            <g id="Layer">
                                                                <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="notification-contnet">
                                                        <h5>Lorem ipsum dolor sit</h5>
                                                        <p className="mail-desc">You can customize this template as you want</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <span className="date">17-Jun-2020</span>
                                                            <span className="time">9:30 AM</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <Link to="/notifications/notification" className="d-flex align-items-start">
                                                    <div className="notification-icon pt-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
                                                            <g id="Layer">
                                                                <path fill="none" stroke="#dedfe1" d="M20 39.32C9.32 39.32 0.68 30.68 0.68 20C0.68 9.32 9.32 0.68 20 0.68C30.68 0.68 39.32 9.32 39.32 20C39.32 30.68 30.68 39.32 20 39.32Z" />
                                                                <path fill="#2a346c" d="M7.09 28.31L14.79 15.07L11.47 15.07L14.19 10.48L20.48 10.48L30.25 28.31L25.11 28.31L18.67 17.38L12.42 28.31L7.09 28.31Z" />
                                                                <path fill="#f9c52d" d="M21.72 10.48L32.35 10.48L27.03 19.77L21.72 10.48Z" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div className="notification-contnet">
                                                        <h5>Lorem ipsum dolor sit amet admin</h5>
                                                        <p className="mail-desc">Just see the my admin!</p>
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <span className="date">17-Jun-2020</span>
                                                            <span className="time">9:30 AM</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </li>
                                        <li>
                                            <Link className="pt-2 nav-link text-dark text-center" to="/notifications"> All
                                            notifications</Link>
                                        </li>
                                    </ul>
                                </NavDropdown>
                                <NavDropdown id="basic-nav-dropdown2" className="no-arrow" alignRight title={
                                    <div className="profile-img d-flex align-items-center">
                                        <Image src={require('../../../images/businessman.png')} roundedCircle alt="profile-img" />
                                        <div className="text mx-2 mt-2">
                                            <div className="profile-name">Mr.E Swamy</div>
                                            <small>IP, MPC, Class - XII</small>
                                        </div>
                                    </div>
                                }>
                                    <NavDropdown.Item className="font-weight-bold">swami@entrolabs.com</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/student/profile"><i className="far fa-user mr-2" /> My Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="#"><i className="far fa-user-chart mr-2" /> Status</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => this.setState({ modalShow: true })}><i className="far fa-key mr-2" /> Change Password</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="#"><i className="far fa-comment-alt-lines mr-2" /> Feedback</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="#"><i className="far fa-sign-out mr-2" /> Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                    <ChangePwdModal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />
                </Navbar>
                <div className="header-bottom py-2">
                    <Container>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <Image src={this.props.headerBottom.Img} alt="Image" width={this.props.headerBottom.width} />
                                <h5 className="mt-4 title">{this.props.headerBottom.Title}</h5>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default ScrollTopNavbar
