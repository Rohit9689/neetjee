import React, { Component } from 'react'
import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import unmountComponentAtNode from 'react-dom'
import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';
import NavbarTop from '../components/login_register/NavbarTop';
import Footer from '../components/login_register/Footer';
import "../components/login_register/_studentlogin.scss";
import loginImage from '../../images/login-block-img.svg';
// import Somescripturl from "https://rizee.in/";
import ReactGA from 'react-ga';
import { GoogleAnalyticsArray } from './GoogleAnalytics';

const LOGIN_USER = gql`
  mutation($username: String!, $password: String) {
    studentLogin(username: $username, password: $password) {
        token
        refreshToken
        user{
            name
            email
            mobile
            valid
            class_id
            exam_id
            exam_name
            current_plan_id
            mobile_verified
            target_year
            videos
            branch_name
            profile_pic
            userlevel
            forum
            institution_id
            institute_name
            institute_logo
            
         }
    }
  }
`;

class StudentLogin extends Component {
    constructor(props) {
        super(props);
        var today = new Date();
        var dd = today.getDate();
        var mmm = today.getMonth();
        var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var yyyy = today.getFullYear();



        var date = new Date();
        var hh = date.getHours();
        var mm = date.getMinutes();
        hh = hh < 10 ? '0' + hh : hh;
        mm = mm < 10 ? '0' + mm : mm;

        let curr_time = hh + ':' + mm;
        today = dd + ' ' + month[mmm] + ' ' + yyyy + ' ' + curr_time;
        this.state = {
            date: today,
            currentStep: 1,
            username: "",
            password: "",
            submitError: "",
            formErrors: {
                username: "",
                password: ""
            },
            usernameValid: false,
            passwordValid: false,
            formValid: false,
            loader: 0
        };
    }

    componentDidMount = () => {
        const scriptTag = document.createElement("script");
        scriptTag.src = "//js.hs-scripts.com/8456667.js";
        scriptTag.async = true;
        document.getElementById("scriptid").appendChild(scriptTag)
        const title = GoogleAnalyticsArray[0].Login;
        ReactGA.pageview('/student/login', ["ELAPP"], title);

    }
    // unmountComponentAtNode = () => {
    //     document.getElementById("scriptid").removeChild("script")
    // }
    datefunction() {

        console.log("date");
    }
    handleFormSubmit = e => {
        e.preventDefault();
        this.setState({
            loader: 1
        });
        console.log("Form submitted");
        console.log(this.state);

        if (this.state.formValid) {
            this.login(this.state.username, this.state.password).catch(error => {
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
    login = async (username, password) => {
        await this.props.login({
            variables: {
                username,
                password
            },
            update: (store, { data }) => {
                console.log("data.studentLogin.user.branch_name", data.studentLogin.token, data.studentLogin.user);
                //localStorage.clear();
                Cookies.set("studenttoken", data.studentLogin.token);
                Cookies.set("studentrefreshtoken", data.studentLogin.refreshToken);
                Cookies.set("studentusername", data.studentLogin.user.name);
                Cookies.set("studentemail", data.studentLogin.user.email);
                Cookies.set("institute_name", data.studentLogin.user.institute_name);
                Cookies.set("institute_logo", data.studentLogin.user.institute_logo);

                Cookies.set("mobile", data.studentLogin.user.mobile);
                Cookies.set("classid", data.studentLogin.user.class_id);
                Cookies.set("examid", data.studentLogin.user.exam_id);
                Cookies.set("exam_name", data.studentLogin.user.exam_name);
                Cookies.set("mobileverified", data.studentLogin.user.mobile_verified);
                Cookies.set("targetyear", data.studentLogin.user.target_year);
                Cookies.set("videos", data.studentLogin.user.videos);
                Cookies.set("branch_name", data.studentLogin.user.branch_name);
                Cookies.set("role", "student");
                Cookies.set("profile_pic", data.studentLogin.user.profile_pic);
                Cookies.set("student_userlevel", data.studentLogin.user.userlevel);
                Cookies.set("stulogintype", "normal");
                Cookies.set("forumlink", data.studentLogin.user.forum);
                Cookies.set("institution_id", data.studentLogin.user.institution_id);
                localStorage.removeItem('profile_pic');
                localStorage.removeItem("packageplan");
                localStorage.setItem("packageplan", null);
                localStorage.setItem("profile_pic", data.studentLogin.user.profile_pic);
                localStorage.removeItem("homemodal");
                localStorage.setItem("homemodal", true);
                Cookies.set("toggle", "wrapper sidebar-enable");


                if (data.studentLogin) {
                    if (data.studentLogin.user.valid == "0") {
                        if (data.studentLogin.user.mobile_verified == "0") {
                            this.props.history.push({
                                pathname: "/student/register",
                                state: {
                                    type: "mobileverify",
                                    fullname: data.studentLogin.user.name,
                                    mobile: data.studentLogin.user.mobile,
                                    email: data.studentLogin.user.email

                                }
                            });
                        }
                        else if (data.studentLogin.user.class_id == "0" ||
                            data.studentLogin.user.exam_id == "0") {
                            this.props.history.push({
                                pathname: "/student/register",
                                state: {
                                    type: "syllabusverify",
                                    fullname: data.studentLogin.user.name,
                                    mobile: data.studentLogin.user.mobile,
                                    email: data.studentLogin.user.email

                                }
                            });
                        }
                        else if (data.studentLogin.user.current_plan_id == "0") {
                            this.props.history.push({
                                pathname: "/student/register",
                                state: {
                                    type: "planverify",
                                    fullname: data.studentLogin.user.name,
                                    mobile: data.studentLogin.user.mobile,
                                    email: data.studentLogin.user.email,
                                    class_id: data.studentLogin.user.class_id,
                                    exam_id: data.studentLogin.user.exam_id,
                                    target_year: data.studentLogin.user.target_year
                                }
                            });
                        }

                        this.setState({ loader: 0 });

                    }
                    else {
                        //this.props.history.push("/student/home");

                        this.props.history.push("/student/loading");
                        window.location.reload();
                    }
                }
            }
        });
    };
    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            // case "username":
            //     var pattern = new RegExp(
            //         /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            //     );

            //     if (value.length < 4) {
            //         usernameValid = false;
            //         fieldValidationErrors.username =
            //             "Username cannot be less than 5 chars";
            //     } else if (!pattern.test(value)) {
            //         usernameValid = false;
            //         fieldValidationErrors.username = "Invalid Username";
            //     } else {
            //         usernameValid = true;
            //         fieldValidationErrors.username = "";
            //     }

            //     break;

            case "username":
                var pattern = new RegExp("^[7-9][0-9]{9}$");

                if (value.length == "") {
                    usernameValid = false;
                    fieldValidationErrors.username = "username Cannot Be Empty";
                }
                // else if (!pattern.test(value)) {
                //     usernameValid = false;
                //     fieldValidationErrors.username = "Invalid username";
                // } 
                else {
                    usernameValid = true;
                    fieldValidationErrors.username = "";
                }

                break;
            case "password":
                if (value.length == "") {
                    passwordValid = false;
                    fieldValidationErrors.password = "Password cannot be Empty";
                } else {
                    passwordValid = true;
                    fieldValidationErrors.password = "";
                }

                break;

            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                usernameValid: usernameValid,
                passwordValid: passwordValid
            },
            this.validateForm
        );
    }

    validateForm() {
        this.setState({
            formValid: this.state.passwordValid && this.state.usernameValid
        });
        if (this.state.formValid) {
            this.setState({ submitError: "" }, () => { });
        }
    }

    render() {

        // if (Cookies.get("studenttoken") != undefined)
        //     this.props.history.push("/student/home");

        // if (loading2 || loading3) {
        //     return (<div className="d-flex justify-content-center align-items-center">
        //         <div class="spinner-border text-primary"></div>
        //     </div>);

        // }
        return (
            <section className="student_login" id="scriptid">
                {/* <iframe src="http://107.178.223.50/some-scripturl.html"></iframe> */}
                <div className="student_block">
                    <NavbarTop />
                    <main role="main">
                        <Container>
                            <Row>
                                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }} md={12}>
                                    <Card as={Card.Body} className="form_card border-0">
                                        <Row>
                                            <Col xl={5} lg={5} md={5} sm={12} xs={12}>
                                                <h5 className="title text-blue mb-3">Login <small className="text-muted">to your account</small></h5>
                                                <Form>
                                                    {this.state.currentStep == 5 ? (
                                                        <Form.Text className="form-text text-danger">
                                                            logged In successfully
                                                        </Form.Text>
                                                    ) : (

                                                        <Form.Text className="form-text text-danger">
                                                            {this.state.submitError}
                                                        </Form.Text>
                                                    )}
                                                    <Form.Group controlId="formBasicEmail">
                                                        {/* <Form.Control
                                                            type="email"
                                                            placeholder="Enter email"
                                                            name="username"
                                                            onChange={this.handleInputChange}
                                                            autoComplete="off"
                                                        /> */}
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter Mobile or Email-id"
                                                            name="username"
                                                            onChange={this.handleInputChange}
                                                            autoComplete="off"
                                                        />
                                                        <Form.Text className="form-text text-danger">
                                                            {this.state.formErrors.username}
                                                        </Form.Text>
                                                    </Form.Group>
                                                    <Form.Group controlId="formBasicPassword">
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                            name="password"
                                                            onChange={this.handleInputChange}
                                                            autoComplete="off"
                                                        />
                                                        <Form.Text className="form-text text-danger">
                                                            {this.state.formErrors.password}
                                                        </Form.Text>
                                                    </Form.Group>
                                                    {this.state.loader == 1 ? (
                                                        <Button className="btn btn-green w-100" type="submit" disabled style={{ width: "" }}>
                                                            <span className="spinner-border spinner-border-sm"></span>
                                                            logging..
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={this.handleFormSubmit} variant="primary" type="submit" className="w-100">
                                                            Login
                                                        </Button>
                                                    )}

                                                    <Form.Group className="mt-3 text-center">
                                                        <u><Link className="forgotlink text-dark" to="/student/ForgotPassword">forgot your password</Link></u>
                                                    </Form.Group>
                                                </Form>
                                                <div className="form_footer pt-2">
                                                    {/* <h6><u><Link to="/student/register" className="text-blue">Register </Link></u><small className="text-muted">if you don't have an account</small></h6> */}
                                                    <h6><u><a
                                                    //  href="https://rizee.in/Registration/?src=website" 
                                                    className="text-blue">Register </a></u><small className="text-muted">if you don't have an account</small></h6>
                                                </div>
                                            </Col>
                                            <Col xl={7} lg={7} md={7} sm={12} xs={12}>
                                               <Image src={loginImage} alt="img" fluid />
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>

                    </main>



                    <Footer />
                </div>
            </section>
        )
    }
}

export default withRouter(compose(
    graphql(LOGIN_USER, {
        name: "login"
    })
)(StudentLogin)
);
