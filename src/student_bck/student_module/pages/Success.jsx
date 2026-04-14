import React, { Component } from 'react'
import { Row, Col, Card, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import NavbarTop from '../components/login_register/NavbarTop';
import Footer from '../components/login_register/Footer';
import StudentOrganizationNavbar from '../components/student_organization_profile/StudentOrganizationNavbar';

const LOGIN_USER = gql`
  mutation($username: String!, $token: String) {
    studentLogin(username: $username, token: $token) {
        token
        refreshToken
        user{
            name
            email
            mobile
            valid
            class_id
            exam_id
            current_plan_id
            mobile_verified
            target_year
            videos
            branch_name
            profile_pic
            userlevel
            
            
        }
    }
  }
`;
class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: 0
        }
    }
    loggedhandleFormSubmit = e => {
        console.log("packageplan", localStorage.getItem("packageplan"));
        if (localStorage.getItem("packageplan") == "home" || localStorage.getItem("packageplan") == "null") {
            this.props.history.push("/student/home");
        }
        if (localStorage.getItem("packageplan") == "mocktest") {
            this.props.history.push("/student/exams/test-series");
        }
        else {
            this.props.history.push("/student/package");
        }

    };

    handleFormSubmit = e => {
        e.preventDefault();
        this.setState({
            loader: 1
        });
        console.log("Form submitted");
        console.log(this.state);
        console.log("autologin", this.props.match.params.mobile, this.props.match.params.token);
        if (this.props.match.params.mobile && this.props.match.params.token) {
            this.login(this.props.match.params.mobile, this.props.match.params.token).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message), loader: 0
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError: "Please fill all the values to proceed", loader: 0 });
        }
    };
    login = async (username, token) => {
        await this.props.login({
            variables: {
                username,
                token
            },
            update: (store, { data }) => {
                console.log("data.studentLogin.user.branch_name", data.studentLogin.user);
                Cookies.set("studenttoken", data.studentLogin.token);
                Cookies.set("studentrefreshtoken", data.studentLogin.refreshToken);
                Cookies.set("studentusername", data.studentLogin.user.name);
                Cookies.set("studentemail", data.studentLogin.user.email);

                Cookies.set("mobile", data.studentLogin.user.mobile);
                Cookies.set("classid", data.studentLogin.user.class_id);
                Cookies.set("examid", data.studentLogin.user.exam_id);
                Cookies.set("mobileverified", data.studentLogin.user.mobile_verified);
                Cookies.set("targetyear", data.studentLogin.user.target_year);
                Cookies.set("videos", data.studentLogin.user.videos);
                Cookies.set("branch_name", data.studentLogin.user.branch_name);
                Cookies.set("role", "student");
                Cookies.set("profile_pic", data.studentLogin.user.profile_pic);
                Cookies.set("student_userlevel", data.studentLogin.user.userlevel);
                localStorage.removeItem("packageplan");
                localStorage.setItem("profile_pic", data.studentLogin.user.profile_pic);


                if (data.studentLogin) {

                    this.setState({ loader: 0 });
                    this.props.history.push("/student/loading");
                    //this.props.history.push("/student/home");

                }
            }
        });
    };
    render() {
        console.log("Cookies.getstudenttoken", Cookies.get("studenttoken"));
        if (Cookies.get("studenttoken") == undefined) {
            if (this.state.loader == "1") {
                return (
                    <div className="student_register">
                        <section className="student_block">
                            <NavbarTop />
                        </section>
                        <div className="register-form bg-light">
                            <section className="register-form-block">
                                <Container>
                                    <div className="step-wizard">


                                        <div className="step-indicator mb-5">
                                            <Row>
                                                <Col xl={3} lg={3} md={6} sm={6} className="active">
                                                    <div className="d-flex">
                                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                        <div className="caption w-100 text-left">
                                                            <span>Personal Information</span>

                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xl={3} lg={3} md={6} sm={6} className="active">
                                                    <div className="d-flex">
                                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                        <div className="caption w-100 text-left">
                                                            <span>Select Plan</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xl={3} lg={3} md={6} sm={6} className="active">
                                                    <div className="d-flex">
                                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                        <div className="caption w-100 text-left">
                                                            <span>Order Summary</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xl={3} lg={3} md={6} sm={6} className="active"
                                                >
                                                    <div className="d-flex">
                                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                        <div className="caption w-100 text-left">
                                                            <span>Payment Summary</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Row className="stepFour mt-5">
                                            <Col xl={12} lg={12} md={12} sm={12}>
                                                <Card as={Card.Body} className="border-0 text-center p-5">
                                                    <h1 className="text-success">Logging into ELAPP</h1>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <div class="spinner-border text-primary"></div>
                                                    </div>

                                                </Card>
                                            </Col>
                                        </Row>

                                    </div>
                                </Container>
                            </section>
                        </div>
                    </div>
                )
            }
            return (
                <div className="student_register">
                    <section className="student_block">
                        <NavbarTop />
                    </section>
                    <div className="register-form bg-light">
                        <section className="register-form-block">
                            <Container>
                                <div className="step-wizard">
                                    <div className="step-indicator mb-5">
                                        <Row>
                                            <Col xl={3} lg={3} md={6} sm={6} className="active">
                                                <div className="d-flex">
                                                    <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                    <div className="caption w-100 text-left">
                                                        <span>Personal Information</span>

                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xl={3} lg={3} md={6} sm={6} className="active">
                                                <div className="d-flex">
                                                    <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                    <div className="caption w-100 text-left">
                                                        <span>Select Plan</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xl={3} lg={3} md={6} sm={6} className="active">
                                                <div className="d-flex">
                                                    <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                    <div className="caption w-100 text-left">
                                                        <span>Order Summary</span>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xl={3} lg={3} md={6} sm={6} className="active"
                                            >
                                                <div className="d-flex">
                                                    <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                    <div className="caption w-100 text-left">
                                                        <span>Payment Summary</span>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row className="stepFour mt-5">
                                        <Col xl={12} lg={12} md={12} sm={12}>
                                            <Card as={Card.Body} className="border-0 text-center p-5">
                                                <div className="d-md-flex align-items-center justify-content-center mb-5">
                                                    <Image src={require('../../images/register-succes.png')} className="my-2" alt="img" width="200" />
                                                    <div className="content my-2 ml-5">

                                                        <h2 className="text-success mb-4">Successful Payment</h2>

                                                        <Link
                                                            onClick={this.handleFormSubmit}
                                                            variant="link text-primary">&nbsp;Login to ELAPP</Link>
                                                        <p className="text-muted">Order Number: {this.props.match.params.id}</p>



                                                    </div>
                                                </div>
                                                <h1>Thank You</h1>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                            <div className="bg-white mt-5">
                                <Container>
                                    <Row>
                                        <Col xl={12} lg={12} md={12} sm={12}>
                                            <div className="d-flex align-items-center justify-content-between py-4">
                                                {/* <div className="float-left">{this.previousButton()}</div>
                                        
                                        <div className="float-right">{this.nextButton()}</div> */}
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </section>
                    </div>
                    <Footer />
                </div>
            )
        }
        else {
            return (
                <div >
                    <StudentOrganizationNavbar name={Cookies.get("studentusername")} />
                    <div className="register-form">
                        <section className="register-form-block">
                            <Container>
                                <div className="step-wizard mb-5">
                                    <Row className="stepFour mt-5">
                                        <Col xl={12} lg={12} md={12} sm={12}>
                                            <Card as={Card.Body} className="border-0 text-center p-5">
                                                <div className="d-md-flex align-items-center justify-content-center mb-5">
                                                    <Image src={require('../../images/register-succes.png')} className="my-2" alt="img" width="200" />
                                                    <div className="content my-2 ml-5">
                                                        <h2 className="text-success mb-4">Successful Payment</h2>

                                                        <Link
                                                            onClick={this.loggedhandleFormSubmit}
                                                            variant="link text-primary">&nbsp;Login to ELAPP</Link>
                                                        <p className="text-muted">Order Number: {this.props.match.params.id.split(":")[1]}</p>
                                                    </div>
                                                </div>
                                                <h1>Thank You</h1>
                                            </Card>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </section>
                    </div>
                    <Footer />
                </div>
            )

        }

    }
}
export default withRouter(compose(
    graphql(LOGIN_USER, {
        name: "login"
    })
)(Success)
);
