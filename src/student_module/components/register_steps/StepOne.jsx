import React, { Component } from "react";
import { components } from "react-select";
import { Row, Col, Card, Form, Nav, Button } from "react-bootstrap";
import SelectDropDown from "../../../neetjee_guru/components/selectdropdown/SelectDropDown";
import { withRouter, Link } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import SyllabusComponent from "./SyllabusComponent";

// Exams
export const Exams = [
  { value: 1, label: "NEET" },
  { value: 2, label: "JEE" },
];

// Classes
export const Classes = [
  { value: 1, label: "XI" },
  { value: 2, label: "XII" },
];

// target Year
export const targetYear = [
  { value: 1, label: "2015" },
  { value: 2, label: "2016" },
  { value: 3, label: "2017" },
  { value: 4, label: "2018" },
  { value: 5, label: "2019" },
];

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className="css-6q0nyr-Svg"
        >
          <path
            fill="currentColor"
            d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
          ></path>
        </svg>
      </components.DropdownIndicator>
    )
  );
};

class StepOne extends Component {
  minutesTimer = (data) => {
    var date = new Date(data * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }
    //var t = hh + ":" + mm + ":" + ss;
    var t = mm + ":" + ss;
    return t;
  };

  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    return (
      <Row className="stepOne">
        <Col xl={8} lg={8} md={12} sm={12} className="mt-2">
          {this.props.stateData.verifytype == 0 ? (
            <Card as={Card.Body} className="stepFormOne border-0 px-4">
              <div className="title border-bottom pb-3 mb-5">
                <Form.Text
                  className="form-text text-danger"
                  style={{ "font-size": "15px" }}
                >
                  {this.props.stateData.stepstatus1 == "1" ? (
                    "you have submitted personal information successfully"
                  ) : this.props.stateData.submitError ==
                    "A User account with mobile " +
                    this.props.stateData.mobile +
                    " already exists! " ||
                    this.props.stateData.submitError ==
                    "A User account with email " +
                    this.props.stateData.email +
                    " already exists! " ? (
                    <React.Fragment>
                      {this.props.stateData.submitError}
                      <Link to="/student/login" variant="link text-primary">
                        &nbsp;Login to ELAPP
                      </Link>
                    </React.Fragment>
                  ) : (
                    this.props.stateData.submitError
                  )}
                </Form.Text>
                <h5>Personal Information</h5>
                {/* <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> */}
              </div>
              <Form>
                <Form.Group as={Row} controlId="formFullName">
                  <Form.Label column sm="5" className="text-muted">
                    Full Name
                  </Form.Label>
                  <Col sm="7" className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      name="fullname"
                      value={this.props.stateData.fullname}
                      onChange={this.props.handleInputChange}
                      autoComplete="off"
                    />
                    {this.props.stateData.fullnameValid == true ? (
                      <i className="active ml-2 fas fa-check-circle" />
                    ) : (
                      <i className="ml-2 fas fa-check-circle" />
                    )}
                  </Col>
                  <Col sm={{ offset: 5, span: 7 }}>
                    <Form.Text className="form-text text-danger">
                      {this.props.stateData.formErrors.fullname}
                    </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formMobile">
                  <Form.Label column sm="5" className="text-muted">
                    Mobile
                  </Form.Label>
                  <Col sm="7" className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      placeholder="Mobile"
                      name="mobile"
                      value={this.props.stateData.mobile}
                      onChange={this.props.handleInputChange}
                      autoComplete="off"
                    />
                    {this.props.stateData.mobileValid == true ? (
                      <i className="active ml-2 fas fa-check-circle" />
                    ) : (
                      <i className="ml-2 fas fa-check-circle" />
                    )}
                  </Col>
                  <Col sm={{ offset: 5, span: 7 }}>
                    <Form.Text className="form-text text-danger">
                      {this.props.stateData.formErrors.mobile}
                    </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formEmail">
                  <Form.Label column sm="5" className="text-muted">
                    Email
                  </Form.Label>
                  <Col sm="7" className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={this.props.stateData.email}
                      onChange={this.props.handleInputChange}
                      autoComplete="off"
                    />

                    {this.props.stateData.emailValid == true ? (
                      <i className="active ml-2 fas fa-check-circle" />
                    ) : (
                      <i className="ml-2 fas fa-check-circle" />
                    )}
                  </Col>
                  <Col sm={{ offset: 5, span: 7 }}>
                    <Form.Text className="form-text text-danger">
                      {this.props.stateData.formErrors.email}
                    </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPassword">
                  <Form.Label column sm="5" className="text-muted">
                    Password
                  </Form.Label>
                  <Col sm="7" className="d-flex align-items-center">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.props.stateData.password}
                      onChange={this.props.handleInputChange}
                      autoComplete="off"
                    />
                    {this.props.stateData.passwordValid == true ? (
                      <i className="active ml-2 fas fa-check-circle" />
                    ) : (
                      <i className="ml-2 fas fa-check-circle" />
                    )}
                  </Col>
                  <Col sm={{ offset: 5, span: 7 }}>
                    <Form.Text className="form-text text-danger">
                      {this.props.stateData.formErrors.password}
                    </Form.Text>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formRePassword">
                  <Form.Label column sm="5" className="text-muted">
                    Re-Enter Password
                  </Form.Label>
                  <Col sm="7" className="d-flex align-items-center">
                    <Form.Control
                      type="password"
                      placeholder="Re-Enter Password"
                      name="repassword"
                      value={this.props.stateData.repassword}
                      onChange={this.props.handleInputChange}
                      autoComplete="off"
                    />

                    {this.props.stateData.repasswordValid == true ? (
                      <i className="active ml-2 fas fa-check-circle" />
                    ) : (
                      <i className="ml-2 fas fa-check-circle" />
                    )}
                  </Col>
                  <Col sm={{ offset: 5, span: 7 }}>
                    <Form.Text className="form-text text-danger">
                      {this.props.stateData.formErrors.repassword}
                    </Form.Text>
                  </Col>
                </Form.Group>
                {this.props.stateData.personalInformationStatus == "0" ? (
                  <Form.Group as={Row} controlId="formRePassword">
                    <Col sm="7" className="d-flex align-items-center">
                      {this.props.stateData.loader == 1 ? (
                        //     <Button className="btn btn-green" type="submit" className="w-100" disabled style={{ width: "" }}>
                        //         <span className="spinner-border spinner-border-sm"></span>
                        //         Loading..
                        //   </Button>
                        <Button variant="primary px-3">
                          <div className="d-flex align-items-center">
                            <span className="spinner-border spinner-border-sm"></span>
                            logging..
                          </div>
                        </Button>
                      ) : (
                        <Button
                          variant="primary px-3"
                          onClick={this.props.personalDetailshandleFormSubmit}
                        >
                          <div className="d-flex align-items-center">
                            <span>Send OTP</span>
                          </div>
                        </Button>
                      )}
                    </Col>
                  </Form.Group>
                ) : (
                  ""
                )}
              </Form>
            </Card>
          ) : (
            ""
          )}
          {this.props.stateData.verifytype == 0 ||
            this.props.stateData.verifytype == 1 ? (
            <React.Fragment>
              {this.props.stateData.personalInformationStatus == "1" ? (
                <Card as={Card.Body} className="stepFormTwo border-0 px-4">
                  <div className="title border-bottom pb-3 mb-5">
                    <Form.Text
                      className="form-text text-danger"
                      style={{ "font-size": "15px" }}
                    >
                      {this.props.stateData.stepstatus2 == "1"
                        ? "OTP has been verified successfully"
                        : this.props.stateData.submitError2}
                    </Form.Text>
                    <h5>OTP Verification</h5>
                    <p className="text-muted">
                      OTP sent to your Mobile No. +91{" "}
                      {this.props.stateData.mobile} and your Email-ID{" "}
                      {this.props.stateData.email}
                    </p>
                  </div>
                  <Form>
                    <Form.Group as={Row} controlId="formOTP">
                      <Form.Label column sm="5" className="text-muted">
                        OTP
                      </Form.Label>
                      <Col sm="7" className="d-flex align-items-center">
                        <Form.Control
                          type="phone"
                          placeholder="OTP Code"
                          name="verifymobemail"
                          onChange={this.props.handleInputChange}
                          autoComplete="off"
                        />
                        {this.props.stateData.verifymobemailValid == true ? (
                          <i className="active ml-2 fas fa-check-circle" />
                        ) : (
                          <i className="ml-2 fas fa-check-circle" />
                        )}
                      </Col>
                      <Col sm={{ offset: 5, span: 7 }}>
                        <Form.Text className="form-text text-danger">
                          {this.props.stateData.formErrors.verifymobemail}
                        </Form.Text>
                      </Col>
                      {this.props.stateData.otpverificationStatus == "0" ? (
                        <Col sm="12" className="text-right">
                          <Form.Text className="text-muted mr-4">
                            Resend OTP in{" "}
                            {this.minutesTimer(this.props.stateData.timer)} Sec
                          </Form.Text>
                          {this.props.stateData.timerStatus == true ? (
                            <Button
                              variant="success"
                              className="float-right"
                              onClick={this.props.resendOtphandleFormSubmit}
                            >
                              {" "}
                              Resend OTP{" "}
                            </Button>
                          ) : (
                            ""
                          )}
                        </Col>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                    {this.props.stateData.otpverificationStatus == "0" ? (
                      <Form.Group as={Row} controlId="formRePassword">
                        <Col sm="7" className="d-flex align-items-center">
                          <Button
                            variant="primary px-3"
                            onClick={this.props.otpverificationhandleFormSubmit}
                          >
                            <div className="d-flex align-items-center">
                              <span>OTP submission</span>
                            </div>
                          </Button>
                        </Col>
                      </Form.Group>
                    ) : (
                      ""
                    )}
                  </Form>
                </Card>
              ) : (
                ""
              )}
            </React.Fragment>
          ) : (
            ""
          )}
          {this.props.stateData.verifytype == 2 ||
            this.props.stateData.verifytype == 0 ? (
            <React.Fragment>
              {this.props.stateData.otpverificationStatus == "1" ? (
                <SyllabusComponent
                  syllabusDetailshandleFormSubmit={
                    this.props.syllabusDetailshandleFormSubmit
                  }
                  handleSelectChange={this.props.handleSelectChange}
                  currentStep={this.props.currentStep}
                  stateData={this.props.stateData}
                />
              ) : (
                ""
              )}
            </React.Fragment>
          ) : (
            ""
          )}
        </Col>
        <Col xl={4} lg={4} md={12} sm={12} className="my-2">
          <Nav className="flex-column aside-status">
            <Nav.Item>
              <Nav.Link
                className={
                  this.props.stateData.personalInformationStatus == "1"
                    ? "active"
                    : ""
                }
                to="#"
              >
                <i className="mr-3 fas fa-check-circle" />
                Personal Information
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={
                  this.props.stateData.otpverificationStatus == "1"
                    ? "active"
                    : ""
                }
                to="#"
              >
                <i className="mr-3 fas fa-check-circle" />
                OTP Verification
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={
                  this.props.stateData.selectSyllabusStatus == "1"
                    ? "active"
                    : ""
                }
                to="#"
              >
                <i className="mr-3 fas fa-check-circle" />
                Select Syllabus
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    );
  }
}

export default StepOne;
