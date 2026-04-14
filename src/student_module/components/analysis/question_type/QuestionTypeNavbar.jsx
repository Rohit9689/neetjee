import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom";
import { Container, Row, Col, Nav, Navbar, NavDropdown, Image, Button, Card, Form } from 'react-bootstrap'
import ChangePwdModaldModal from '../../Profile/ChangePwdModal'
import '../../../components/navbars/_navbars.scss'
import DateTime from 'react-datetime';
import ChangePassword from '../../../components/navbars/ChangePassword';
import * as Cookies from "es-cookie";
import Notification from '../../navbars/Notification';

import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
const USERLOGOUT = gql`
  mutation(
    $mobile: String!,
    $device_id: String) {
    userLogout(mobile: $mobile,device_id: $device_id)
  }
`;
class QuestionTypeNavbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false,
            loader: 0
        }
    }
    logout = e => {
        e.preventDefault();
        this.setState({
            loader: 1
        })
        this.userLogout(Cookies.get("mobile"), "").catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message)
            });
            console.error(
                "ERR =>",
                error.graphQLErrors.map(x => x.message)
            );
        });

    };
    userLogout = async (mobile,
        device_id) => {
        await this.props.userLogout({
            variables: {
                mobile,
                device_id
            },
            update: (store, { data }) => {
                console.log("data.userLogout", data.userLogout);
                if (data.userLogout) {
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
                    
                    Cookies.remove("toggle");
                    this.setState({
                        loader: 0
                    })
                    this.props.history.push("/student/login");



                }
            }
        });
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
            <div className="questiontypeNavbar-nav">
                <Navbar className="header-top">
                    {/* <Container> */}
                        <Button variant="light" className="px-2 py-1 mr-2" onClick={() => this.props.onClick()}>
                            <i className="fal fa-bars" />
                        </Button>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Notification />
                                <NavDropdown id="basic-nav-dropdown2" className="no-arrow" alignRight title={
                                    <div className="profile-img d-flex align-items-center">
                                        {localStorage.getItem("profile_pic") != "" ? (

                                            <Image src={`https://admin.rizee.in/files/${localStorage.getItem("profile_pic")}`} roundedCircle alt="profile-img" />
                                        ) : (
                                                <Image src={require('../../../../images/businessman.png')} roundedCircle alt="profile-img" />
                                            )}
                                        <div className="text mx-2 mt-2">
                                        {this.state.loader == 0 ? (
                                            <React.Fragment>
                                                <div className="profile-name">{Cookies.get("studentusername")}</div>
                                                <small>Exam- {Cookies.get("exam_name")}, Class - {Cookies.get("classid") == "1" ? ("XI") : ("XII")}</small>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <div className="profile-name">{Cookies.get("studentusername")}</div>
                                                <small>Logging Out...</small>

                                            </React.Fragment>
                                        )}

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
                                    <NavDropdown.Item as={Link} onClick={this.logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    {/* </Container> */}

                    <ChangePassword show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })} />
                </Navbar>

                <div className="header-bottom px-3">
                    <Row className="align-items-end pb-4">
                        <Col xl={6} lg={6} md={4} sm={12} xs={12}>
                            <div className="my-3">
                                <div className="top-img mb-3">
                                    <Image src={require('../../../../images/questionType-img.png')} width="50" alt="img" />
                                </div>
                                <h6 className="title mb-0">Question Type</h6>
                                {/* <p className="subtitle">Analysis all the your strengths and weakness</p> */}
                            </div>
                        </Col>
                        <Col xl={6} lg={6} md={8} sm={12} xs={12}>
                            <Card as={Card.Body} className="mx-lg-2 my-3">
                                <Image src={require('../../../../images/bulb.png')} width="45" alt="img" />
                                <p className="text-white">Dear Student, get insights on your weakness and strength in subjects.</p>
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

export default withRouter(
    graphql(USERLOGOUT, {
        name: "userLogout"
    })
(QuestionTypeNavbar));