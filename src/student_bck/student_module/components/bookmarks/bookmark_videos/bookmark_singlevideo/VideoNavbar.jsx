import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Container, Nav, Image, Navbar, NavDropdown } from 'react-bootstrap'

class VideoNavbar extends Component {
    render() {
        return (
            <Navbar className="navbar navbar-expand-md navbar-dark bg-dark">
                <Container>
                    <Link to="/student/bookmark/videos" className="my-0 font-weight-normal text-light"><i className="fal fa-arrow-left" /></Link>
                    <div className="my-2 my-md-0 mr-md-3 mx-auto">
                        <Link to="/student/home">
                            <Image src={require('../../../../../images/logo.svg')} width="100" alt="logo" />
                        </Link>
                    </div>
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
                                            <Image src={require('../../../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                            <div className="notification-contnet">
                                                <h5>Luanch Admin</h5>
                                                <p className="mail-desc">Just see the my new admin!</p>
                                                <span className="time">9:30 AM</span>
                                            </div>
                                        </a>
                                        <a href="/#" className="d-flex align-items-center">
                                            <Image src={require('../../../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                            <div className="notification-contnet">
                                                <h5>Lorem ipsum dolor sit amet</h5>
                                                <p className="mail-desc">Just a reminder that you have event</p>
                                                <span className="time">9:10 AM</span>
                                            </div>
                                        </a>
                                        <a href="/#" className="d-flex align-items-center">
                                            <Image src={require('../../../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
                                            <div className="notification-contnet">
                                                <h5>Lorem ipsum dolor sit</h5>
                                                <p className="mail-desc">You can customize this template as you want</p>
                                                <span className="time">9:08 AM</span>
                                            </div>
                                        </a>
                                        <a href="/#" className="d-flex align-items-center">
                                            <Image src={require('../../../../../images/businessman.png')} alt="avatar-img" width="50" height="50" roundedCircle />
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
                            <NavDropdown.Item className="font-weight-bold">swami@entrolabs.com</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#/">My Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#/">Status</NavDropdown.Item>
                            <NavDropdown.Item href="#/">Change Password</NavDropdown.Item>
                            <NavDropdown.Item href="#/">Feedback</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#/">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default VideoNavbar
