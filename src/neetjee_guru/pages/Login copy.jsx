import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Form, Tab, Nav, Image,
  Button
} from "react-bootstrap";

import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as Cookies from "es-cookie";

import "../../_login.scss";

const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      refreshToken
      user {
        username
        userlevel
        email
        mobile
        valid
        name
        institution_id
        institute_name
      }
    }
  }
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      formValid: false
    };
  }
  handleFormSubmit = e => {
    e.preventDefault();
    console.log("Form submitted");
    console.log(this.state);

    if (this.state.formValid) {
      this.login(this.state.username, this.state.password).catch(error => {
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
    } else {
      this.setState({ submitError: "Please fill all the values to proceed" });
    }
  };
  login = async (username, password) => {
    await this.props.login({
      variables: {
        username,
        password
      },
      update: (store, { data }) => {
        Cookies.set("token", data.login.token);
        Cookies.set("refreshtoken", data.login.refreshToken);
        Cookies.set("username", data.login.user.username);
        Cookies.set("name", data.login.user.name);
        Cookies.set("email", data.login.user.email);
        Cookies.set("id", data.login.user.id);
        Cookies.set("institutionid", data.login.user.institution_id);
        Cookies.set("role", "institution");
        Cookies.set("institutename", data.login.user.institute_name);
        // Cookies.set(
        //     "fullname",
        //     data.login.user.firstname + " " + data.login.user.lastname
        // );
        Cookies.set("userlevel", data.login.user.userlevel);
        if (data.login) {
          this.props.history.push("/questions/create-question-paper");
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
      case "username":
        var pattern = new RegExp(
          /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );

        if (value.length < 4) {
          usernameValid = false;
          fieldValidationErrors.username =
            "Username cannot be less than 5 chars";
        }
        // else if (!pattern.test(value)) {
        //   usernameValid = false;
        //   fieldValidationErrors.username = "Invalid Username";
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
      formValid: this.state.passwordValid || this.state.usernameValid
    });
    if (this.state.formValid) {
      this.setState({ submitError: "" }, () => { });
    }
  }

  render() {
    if (
      Cookies.get("token") != undefined &&
      Cookies.get("institutionid") != undefined
    ) {
      this.props.history.push("/");
    }

    return (
      <section className="login-section">
        <Container>
          <Card className="form-signin border-light shadow-sm">
            <Card.Body className="p-0 bg-theme">
              <Row className="w-100 h-100 g-0 align-items-center">
                <Col xl={7} lg={7} md={12} sm={12}>
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="img-fluid"
                        src={require("../../images/login-bg.png")}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="img-fluid"
                        src={require("../../images/login-bg.png")}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="img-fluid"
                        src={require("../../images/login-bg.png")}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  <Carousel.Caption>
                    <p>&copy; 2019 NeetJeeGuru. All rights reserved.</p>
                  </Carousel.Caption>
                </Col>
                <Col xl={5} lg={5} md={12} sm={12} className="split-right w-100 h-100 ml-auto px-xl-3 align-items-center bg-white">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first" className="text-uppercase">Login</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second" className="text-uppercase">Register</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Form className="login-form-block py-3 px-5 my-5">
                          <div className="login-content">
                            <h1 className="h3 title">Welcome Back :)</h1>
                            {this.state.currentStep == 5 ? (
                              <Form.Text className="form-text text-danger">
                                You are successfully loggedIn
                        </Form.Text>
                            ) : (
                                <Form.Text className="form-text text-danger">
                                  {this.state.submitError}
                                </Form.Text>
                              )}
                            <p>
                              To keep connected with us please login with your
                              personal information by email address and password
                      </p>
                          </div>
                          <Form.Group controlId="formBasicEmail">
                            <i className="far fa-envelope" />
                            <Form.Control
                              type="text"
                              placeholder="Enter username / email"
                              name="username"
                              onChange={this.handleInputChange}
                              autoComplete="off"
                            />
                            <Form.Label>Username / Email</Form.Label>
                            <Form.Text className="form-text text-danger">
                              {this.state.formErrors.username}
                            </Form.Text>
                          </Form.Group>

                          <Form.Group controlId="formBasicPassword">
                            <i className="fas fa-lock" />
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              name="password"
                              onChange={this.handleInputChange}
                              autoComplete="off"
                            />
                            <Form.Label>Password</Form.Label>
                            <Form.Text className="form-text text-danger">
                              {this.state.formErrors.password}
                            </Form.Text>
                          </Form.Group>
                          <Row className="mb-3">
                            {/* <Col>
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check
                            type="checkbox"
                            className="checkbox-green"
                            label="Remember Me"
                            custom
                          />
                        </Form.Group>
                      </Col>
                      <Col className="text-right">
                        <a href="http://">Forget Password?</a>
                      </Col> */}
                          </Row>
                          <Button
                            onClick={this.handleFormSubmit}
                            variant="primary"
                            type="submit"
                            block
                          >
                            Login Now
                    </Button>
                        </Form>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Form className="register-form-block py-3 px-5 my-5">
                          <div className="login-content mb-4">
                            <div className="text-center mb-4">
                              <Image src={require('../../images/logo-black.png')} width="120" alt="logo" />
                            </div>
                          </div>
                          <Form.Group controlId="inputClgName">
                            <Form.Label>College Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" />
                          </Form.Group>
                          <Form.Group controlId="inputEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                          </Form.Group>
                          <Form.Group controlId="inputMobile">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="text" placeholder="Mobile No" />
                            <Form.Text className="text-muted text-right">
                              Resend OTP in 0:52 Sec
                            </Form.Text>
                          </Form.Group>
                          <Form.Group controlId="inputOTP">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control type="text" placeholder="OTP" />
                          </Form.Group>
                          <Button variant="primary" className="mt-5 w-100" type="submit" >
                            Register
                          </Button>
                        </Form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </section>
    );
  }
}
export default withRouter(
  graphql(LOGIN_USER, {
    name: "login"
  })(Login)
);
