import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, NavDropdown, Image, Button, Card, Form } from 'react-bootstrap'
import ChangePwdModaldModal from '../../Profile/ChangePwdModal'
import '../../../components/navbars/_navbars.scss'
import DateTime from 'react-datetime'
import ChangePassword from '../../../components/navbars/ChangePassword';
import * as Cookies from "es-cookie";

class ComplexityAnalysisNavbar extends Component {
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
            <div className="complexity-nav">
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
                            <div className="my-3">
                                <div className="top-img mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="161.719" height="67.501" viewBox="0 0 161.719 67.501"><g transform="translate(-147.761 -416.288)"><path fill="#fff" d="M174.926,476.178a3.791,3.791,0,1,1,7.582-.08,4,4,0,0,1-3.788,3.977A3.824,3.824,0,0,1,174.926,476.178Z" transform="translate(-13.389 -27.626)" /><g transform="translate(147.761 416.288)"><path fill="#fff" opacity="0.7" d="M166.923,492.934a21.976,21.976,0,0,1-2.856-2.965c-.959-1.429-2.207-2.481-3.735-1.808a5.439,5.439,0,0,0-2.589,3.009c-1.058,3.195-1.8,6.5-2.534,9.793a8.239,8.239,0,0,0,.053,2.976c.372,2.409-.08,4.469-2.122,6.006a53.119,53.119,0,0,0-4.783,3.743,2.561,2.561,0,0,0-.466,2.385c.276.525,1.859,1.03,2.217.741,3.361-2.715,8.074-4.172,8.881-9.383.125-.807,1.179-1.47,1.8-2.2.821.914,2.163,1.731,2.355,2.763.413,2.215.077,4.562.38,6.81.108.8,1.183,1.468,1.816,2.2.6-.757,1.64-1.469,1.724-2.279.225-2.171-.155-4.405.068-6.577.294-2.855-.709-4.653-3.36-5.743-.717-.295-1.72-1.252-1.665-1.815a42.637,42.637,0,0,1,1.375-5.83c2.192,3.064,4.323,3.4,7.044.259l.065-6.769C170.4,490.563,169.3,491.934,166.923,492.934Z" transform="translate(-147.761 -451.61)" /><path fill="#fff" d="M328.573,472.393q-11.532-4.906-23.06-9.817-14.552-6.2-29.1-12.409c-2.9-1.232-3.6-.919-4.846,1.965-.457,1.059-.909,2.122-1.429,3.336-1.017-.4-1.8-.682-2.556-1.006-10.79-4.592-21.592-9.158-32.355-13.814-2.2-.95-3.5-.467-4.366,1.727-.822,2.085-1.77,4.121-2.8,6.486-5.594-6.539-10.961-12.817-16.333-19.092-2.729-3.188-2.918-3.2-6.263-.51a9.625,9.625,0,0,1-1.4.709c0-2.449.021-4.532,0-6.614-.087-7.239,1.07-7.119-7.16-7.049-3.864.033-4.241.371-4.245,4.171-.01,10.477-.147,20.956.068,31.428.005.236,0,.461-.01.682l0-.041-.064,7.986h0c0,1.242,0,1.983,0,2.716,0,4.648-.013,9.3.014,13.943.018,3.045.54,3.569,3.5,3.649,1.351.036,2.7.039,4.056.029,3.283-.023,3.83-.556,3.833-3.826q.014-17.365,0-34.73v-2.9a98.921,98.921,0,0,1,8.592,9.175q13.51,15.789,27.017,31.579c1.965,2.292,2.715,2.326,5.014.4,1.035-.867,2.03-1.78,3.049-2.666,2.644-2.3,2.693-2.858.4-5.546q-7.9-9.25-15.807-18.491c-.548-.641-1.042-1.328-1.561-1.993,7.274,2.524,14.158,5.452,21.039,8.387q15.945,6.8,31.89,13.6c2.729,1.16,3.415.848,4.671-1.921.481-1.061.946-2.128,1.508-3.394,1.005.376,1.867.661,2.7,1.016,10.711,4.568,21.434,9.107,32.112,13.752,2.189.952,3.532.526,4.4-1.653.531-1.332,1.113-2.643,1.666-3.966C332.172,474.3,331.978,473.841,328.573,472.393Z" transform="translate(-169.866 -416.288)" /><path fill="#fff" d="M192.791,488.016l0,.186c.009-.111.014-.227.019-.342Z" transform="translate(-169.954 -451.565)" /><path fill="#fff" opacity="0.88" d="M192.653,501.856l-.008.834h.032v-.861Z" transform="translate(-169.884 -458.45)" /></g></g></svg>
                                </div>
                                <h6 className="title mb-0">Complexity Analysis</h6>
                                <p className="subtitle">Analysis all the your strengths and weakness</p>
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

export default withRouter(ComplexityAnalysisNavbar)
