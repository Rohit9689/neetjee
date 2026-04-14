import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import * as Cookies from "es-cookie";
import { withRouter } from "react-router-dom";
import parse, { domToReact } from 'html-react-parser';
import Notification from '../navbars/Notification';
import '../navbars/_navbars.scss';

import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from '../../pages/GoogleAnalytics';


class Instructions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalShow: false,
            checked: true,
            submitError: ""
        }
    }
    handleOnChange = (e) => {
        if (this.state.checked == true) {
            this.setState({
                checked: false,
                submitError: "Please read the instructions and accept the conditions"
            });
        }
        else {
            this.setState({
                checked: true,
                submitError: "",
            });
        }

    }
    submitFun = () => {

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
        }
    };
    newTabFunction = () => {
        localStorage.setItem("subjectid", this.props.history.location.state.subjectid);
        localStorage.setItem("type", "practice");
        localStorage.setItem("ocid", this.props.history.location.state.ocid);
        localStorage.setItem("otid", this.props.history.location.state.otid);
        localStorage.setItem("hchaptername", this.props.history.location.state.hchaptername);


        window.open("http://localhost:3000/student/subject/practice-test", "_blank") //to open new page
    }
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
        let instructions = "";
        let title = "";
        if (this.props.type == "practice") {
            instructions = this.props.examInstructions.find((a) => a.is_exam == "0");
            if (this.props.typeofpractice == "practice") {
                title = GoogleAnalyticsArray[0].Practice_Instructions;
                ReactGA.pageview('/student/subject/practice-test', title);
            }
            else if (this.props.typeofpractice == "error") {
                title = GoogleAnalyticsArray[0].Error_practice_Instructions;
                ReactGA.pageview('/student/subject/practice-errortest', title);
            }

        }
        else {
            instructions = this.props.examInstructions
            title = GoogleAnalyticsArray[0].Exam_Instructions;
            ReactGA.pageview('/student/subject/exam', title);
        }



        console.log("instructions.instructions", instructions);

        return (
            <div className="Instructions">
                <Navbar className="header-top navbar navbar-expand-md navbar-white bg-white shadow-sm">
                    <Container>
                        <Link to="/student/home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="159.501" height="37.139" className="logo" viewBox="0 0 159.501 37.139"><g transform="translate(-384.741 -406.553)"><g transform="translate(445.845 406.553)"><path fill="#2a346c" d="M841.627,431.867l-4.882-7.052h-5.388v7.052H825.5V406.553h10.958a14.07,14.07,0,0,1,5.84,1.121,8.683,8.683,0,0,1,3.815,3.182,8.772,8.772,0,0,1,1.338,4.882,8.247,8.247,0,0,1-5.208,7.992l5.678,8.137Zm-1.483-19.4a6.155,6.155,0,0,0-4.014-1.139h-4.774v8.824h4.774a6.085,6.085,0,0,0,4.014-1.157,4.563,4.563,0,0,0,0-6.528Z" transform="translate(-825.498 -406.553)"></path><path fill="#2a346c" d="M1010.373,411.941a3.063,3.063,0,0,1,0-4.484,3.58,3.58,0,0,1,2.531-.9,3.668,3.668,0,0,1,2.531.868,2.783,2.783,0,0,1,.976,2.17,3.071,3.071,0,0,1-.976,2.332,3.537,3.537,0,0,1-2.531.922A3.577,3.577,0,0,1,1010.373,411.941Zm-.289,3.048h5.641v16.878h-5.641Z" transform="translate(-983.902 -406.553)"></path><path fill="#2a346c" d="M1100.574,463.929v4.34h-17.358v-3.4l9.909-11.717h-9.656v-4.34h16.78v3.4l-9.909,11.717Z" transform="translate(-1047.488 -442.954)"></path><path fill="#2a346c" d="M1242.651,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.529,6.529,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.694,12.694,0,0,1-5.822-1.284,9.406,9.406,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1242.76,456.924,1242.651,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.758,4.758,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1229.451,452.078Z" transform="translate(-1167.251 -441.157)"></path><path fill="#2a346c" d="M1407.25,458.334h-14.719a4.58,4.58,0,0,0,1.881,2.857,6.225,6.225,0,0,0,3.689,1.049,7.459,7.459,0,0,0,2.694-.452,6.53,6.53,0,0,0,2.188-1.428l3,3.255q-2.749,3.146-8.028,3.146a12.693,12.693,0,0,1-5.822-1.284,9.4,9.4,0,0,1-3.906-3.562,9.809,9.809,0,0,1-1.374-5.171,9.943,9.943,0,0,1,1.356-5.153,9.5,9.5,0,0,1,3.725-3.58,11.533,11.533,0,0,1,10.469-.054,8.983,8.983,0,0,1,3.634,3.526,10.518,10.518,0,0,1,1.32,5.334Q1407.359,456.924,1407.25,458.334Zm-13.2-6.256a4.618,4.618,0,0,0-1.591,2.965h9.583a4.667,4.667,0,0,0-1.591-2.947,4.759,4.759,0,0,0-3.182-1.1A4.858,4.858,0,0,0,1394.051,452.078Z" transform="translate(-1309.031 -441.157)"></path></g><g transform="translate(445.797 439.343)"><path fill="#2a346c" d="M826.554,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z" transform="translate(-825.153 -643.45)"></path><path fill="#2a346c" d="M874.312,643.51v4.228h-.785v-1.812H871.34v1.812h-.785V643.51h.785v1.746h2.187V643.51Z" transform="translate(-864.261 -643.45)"></path><path fill="#2a346c" d="M924.272,647.08v.658H921.1V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-907.798 -643.45)"></path><path fill="#2a346c" d="M995.518,643.691a1.394,1.394,0,0,1,.625.52,1.587,1.587,0,0,1,0,1.6,1.386,1.386,0,0,1-.625.522,2.338,2.338,0,0,1-.957.181h-.955v1.22h-.785V643.51h1.74A2.343,2.343,0,0,1,995.518,643.691Zm-.214,1.945a.861.861,0,0,0,0-1.245,1.206,1.206,0,0,0-.779-.218h-.918v1.679h.918A1.208,1.208,0,0,0,995.3,645.636Z" transform="translate(-969.577 -643.45)"></path><path fill="#2a346c" d="M1042.442,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-1009.586 -643.45)"></path><path fill="#2a346c" d="M1086.481,647.738l-.864-1.238q-.055.006-.163.006h-.954v1.232h-.785V643.51h1.74a2.345,2.345,0,0,1,.957.181,1.393,1.393,0,0,1,.625.52,1.452,1.452,0,0,1,.218.8,1.434,1.434,0,0,1-.233.822,1.386,1.386,0,0,1-.667.513l.973,1.389Zm-.284-3.346a1.206,1.206,0,0,0-.779-.218h-.918v1.686h.918a1.2,1.2,0,0,0,.779-.221.767.767,0,0,0,.266-.625A.758.758,0,0,0,1086.2,644.392Z" transform="translate(-1047.869 -643.45)"></path><path fill="#2a346c" d="M1131.6,644.169v1.286h2.042v.665H1131.6v1.619h-.785V643.51h3.087v.659Z" transform="translate(-1088.442 -643.45)"></path><path fill="#2a346c" d="M1176.994,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-1125.485 -643.45)"></path><path fill="#2a346c" d="M1217.059,647.142a2.071,2.071,0,0,1-.809-.776,2.266,2.266,0,0,1,0-2.235,2.092,2.092,0,0,1,.812-.776,2.381,2.381,0,0,1,1.157-.281,2.418,2.418,0,0,1,.949.181,1.94,1.94,0,0,1,.725.526l-.507.477a1.481,1.481,0,0,0-1.13-.5,1.584,1.584,0,0,0-.779.19,1.372,1.372,0,0,0-.538.528,1.62,1.62,0,0,0,0,1.535,1.371,1.371,0,0,0,.538.528,1.584,1.584,0,0,0,.779.19,1.472,1.472,0,0,0,1.13-.5l.507.483a1.927,1.927,0,0,1-.728.525,2.432,2.432,0,0,1-.951.181A2.382,2.382,0,0,1,1217.059,647.142Z" transform="translate(-1161.778 -643.074)"></path><path fill="#2a346c" d="M1262.2,644.174h-1.4v-.664h3.588v.664h-1.4v3.564h-.785Z" transform="translate(-1200.4 -643.45)"></path><path fill="#2a346c" d="M1334.483,645.2h.743v1.685a2.362,2.362,0,0,1-.761.4,2.927,2.927,0,0,1-.894.139,2.411,2.411,0,0,1-1.166-.281,2.085,2.085,0,0,1-.815-.776,2.257,2.257,0,0,1,0-2.235,2.08,2.08,0,0,1,.818-.776,2.441,2.441,0,0,1,1.175-.281,2.568,2.568,0,0,1,.967.175,1.9,1.9,0,0,1,.731.513l-.5.483a1.589,1.589,0,0,0-1.166-.483,1.647,1.647,0,0,0-.794.187,1.362,1.362,0,0,0-.543.525,1.511,1.511,0,0,0-.2.773,1.487,1.487,0,0,0,.2.761,1.4,1.4,0,0,0,.543.532,1.594,1.594,0,0,0,.788.193,1.7,1.7,0,0,0,.87-.218Z" transform="translate(-1261.126 -643.074)"></path><path fill="#2a346c" d="M1382.59,647.306a1.915,1.915,0,0,1-.489-1.411V643.51h.785v2.356q0,1.245,1.075,1.245t1.069-1.245V643.51h.773V645.9a1.923,1.923,0,0,1-.486,1.411,2.134,2.134,0,0,1-2.727,0Z" transform="translate(-1304.889 -643.45)"></path><path fill="#2a346c" d="M1431.991,643.51h.785v4.228h-.785Z" transform="translate(-1347.863 -643.45)"></path><path fill="#2a346c" d="M1461.141,643.51h1.848a2.652,2.652,0,0,1,1.2.263,1.946,1.946,0,0,1,.816.743,2.265,2.265,0,0,1,0,2.217,1.945,1.945,0,0,1-.816.743,2.652,2.652,0,0,1-1.2.263h-1.848Zm1.812,3.564a1.8,1.8,0,0,0,.818-.178,1.276,1.276,0,0,0,.544-.508,1.63,1.63,0,0,0,0-1.528,1.277,1.277,0,0,0-.544-.508,1.794,1.794,0,0,0-.818-.178h-1.027v2.9Z" transform="translate(-1372.971 -643.45)"></path><path fill="#2a346c" d="M1515.553,647.08v.658h-3.172V643.51h3.087v.659h-2.3v1.1h2.042v.646h-2.042v1.166Z" transform="translate(-1417.109 -643.45)"></path></g><g transform="translate(384.741 406.948)"><path fill="#2a346c" d="M384.741,446.083,400.6,418.829h-6.84l5.6-9.431h12.954l20.105,36.684H421.843L408.578,423.6l-12.851,22.486Z" transform="translate(-384.741 -409.399)"></path><path fill="#f9c52d" d="M601.982,409.4h21.872l-10.936,19.118Z" transform="translate(-571.865 -409.399)"></path></g></g></svg>
                        </Link>

                        <Nav className="ml-auto">
                            {/* <Notification /> */}
                            <NavDropdown id="basic-nav-dropdown2" className="no-arrow" align="end" title={
                                <div className="profile-img d-flex align-items-center">
                                    {Cookies.get("profile_pic") != "" ? (

                                        <Image src={`https://admin.rizee.in/files/${Cookies.get("profile_pic")}`} roundedCircle alt="profile-img" />
                                    ) : (
                                        <Image src={require('../../../images/businessman.png')} roundedCircle alt="profile-img" />
                                    )}

                                    <div className="text mx-2 mt-2">
                                        <div className="profile-name">{Cookies.get("studentusername")}</div>
                                        <small>Exam- {Cookies.get("exam_name")}, Class - {Cookies.get("classid") == "1" ? ("XI") : ("XII")}</small>
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
                    </Container>
                </Navbar>
                <div className="bg-success py-3">
                    <Container fluid className="d-flex justify-content-center align-items-center">
                        <div className="my-2 my-md-0 text-center">
                            <h6 className="title mb-0 mr-4 text-white">{this.props.type == "exam" ? ("Exam") : ("Practise")} Instructions</h6>
                        </div>
                        <div>&nbsp;</div>
                    </Container>
                </div>
                <div className="content-box pt-2" style={{ paddingBottom: '4rem' }}>
                    <Container>
                        <Row>
                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} sm={12}>
                                <h6 className="mb-2"><u>Please read the following instructions carefully.</u></h6>
                                {instructions != undefined ? (parse(instructions.instructions)) : ("")}
                            </Col>
                        </Row>
                        {this.props.mains2021 == "1" ? (<Row className="mt-4">
                            <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} sm={12}>
                                <div class="form-check-inline">
                                    <label class="form-check-label">
                                        <input type="checkbox"
                                            onChange={this.handleOnChange}
                                            className="form-check-input" value="" checked={this.state.checked} />I have red all the instructions and accepted.
                                    </label>
                                </div>
                            </Col>
                        </Row>) : ("")}
                        {this.state.submitError != "" ? (
                            <Row className="mt-1">
                                <Col xl={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} md={{ span: 10, offset: 1 }} sm={12}>
                                    <h6 className="text-danger">{this.state.submitError}</h6>
                                </Col>
                            </Row>
                        ) : ("")}
                    </Container>
                </div>

                <div className="bg-white shadow-sm fixed-bottom">
                    <Container>
                        <Row>
                            {this.state.checked == true ? (
                                <Col xl={12} lg={12} md={12} className="py-3 text-right">
                                    <a
                                        onClick={this.props.startPracticeFun}

                                        className="btn btn-outline-primary px-5">
                                        {this.props.type == "exam" ? ("Start Exam") : ("Start Practise")}

                                    </a>
                                </Col>
                            ) : (
                                <Col xl={12} lg={12} md={12} className="py-3 text-right">
                                    <a
                                        onClick={this.submitFun}

                                        className="btn btn-outline-primary px-5">
                                        {this.props.type == "exam" ? ("Start Exam") : ("Start Practise")}

                                    </a>
                                </Col>
                            )}


                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}


export default withRouter(Instructions);
