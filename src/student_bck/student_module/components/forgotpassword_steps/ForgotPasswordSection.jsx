import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Card, Image, Button, Form } from 'react-bootstrap';
// import RegisterOne from './RegisterOne';
import RegisterTwo from './RegisterTwo';
// import RegisterThree from './RegisterThree';

import ForgotPass from './ForgotPass';
import ChangePassword from './ChangePassword';



import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as Cookies from "es-cookie";
import * as compose from 'lodash.flowright';

const FORGOT_PASSWORD = gql`
  mutation($email: String!) {
    forgotPassword(email: $email){
        otp
        mobile
    } 
  }
`;
const RESEND_OTP = gql`
  mutation(
    $email: String!
    ) {
        resendEmailotp(email: $email) 
  }
`;

const CHANGE_PASSWORD = gql`
  mutation(
    $email: String!,
    $password: String!
    ) {
        changePassword(
    email: $email,
    password: $password
    ) 
  }
`;



class ForgotPasswordSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentStep: 1,
            username: "",
            submitError: "",
            submitError2: "",
            submitError3: "",
            mobile: "",
            verifymobemail: "",
            otp: "",
            //timer: 0,
            timer: 120,

            otpstatus: 0,
            password: "",
            cpassword: "",
            formErrors: {
                username: "",
                verifymobemail: "",
                password: "",
                cpassword: ""
            },
            passwordValid: false,
            cpasswordValid: false,
            timerStatus: false,
            usernameValid: false,
            formValid: false,
            verifymobemailValid: false,
            formValid2: false,
            formValid3: false
        };
    }
    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }
    nextButton() {
        // let currentStep = this.state.currentStep;
        // if (currentStep === 3) {
        //     return (
        //         <Button as={Link} onClick={this.changePasswordFormSubmit} variant="primary" className="float-right px-5"> Submit </Button>
        //     )
        // }
        // if (currentStep < 3) {
        //     return (

        //         <Button variant="primary" className="float-right" type="submit" onClick={this.handleFormSubmit}> Submit &amp; Next </Button>
        //     )
        // }

        return null;
    }
    timerFunction = () => {
        if (this.state != undefined) {
            let totalExamCount = parseInt(this.state.timer) - 1;
            this.setState({ timer: totalExamCount });
            console.log("totalExamCount", totalExamCount);
            if (totalExamCount == 0) {
                this.setState({ timer: 120, timerStatus: true });
            }
        }
    }
    componentDidMount = () => {
        this.timer = setInterval(() => {

            this.timerFunction();
        }, 1000)
    }

    // timerFunction = () => {
    //     this.timer = setInterval(() => {
    //         this.setState({
    //             timer: this.state.timer + 1
    //         });
    //     }, 1000);

    //     this.timer = setInterval(() => {
    //         this.setState({
    //             timer: 0,
    //             timerStatus: true
    //         });
    //     }, 60000)
    // }
    // clearIntervalFun = () => {
    //     this.setState({
    //         timer: 0,
    //         timerStatus: false
    //     });

    //     this.timerFunction();
    // }
    changePasswordFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.formValid3) {
            this.changepassword(
                this.state.username,
                this.state.password

            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError3: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError3: "Please fill all the values to proceed" });
        }
        this.props.PstepStatusFun(3);
    };
    changepassword = async (email, password
    ) => {
        await this.props.changepassword({
            variables: {
                email, password
            },
            update: (store, { data }) => {
                if (data.changePassword) {
                    this.setState({
                        username: "",
                        submitError: "",
                        submitError2: "",
                        submitError3: "",
                        mobile: "",
                        verifymobemail: "",
                        otp: "",
                        timer: 120,
                        otpstatus: 0,
                        password: "",
                        formErrors: {
                            username: "",
                            verifymobemail: "",
                            password: ""
                        },
                        passwordValid: false,
                        //timerStatus: false,
                        usernameValid: false,
                        formValid: false,
                        verifymobemailValid: false,
                        formValid2: false,
                        formValid3: false
                    })
                    this.props.history.push("/student/login");

                }
            }
        });
    };
    resendOtphandleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log(this.state);
        // if (this.state.formValid) {
        this.resendotp(
            this.state.username
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });

        // } else {
        //     this.setState({ submitError: "Please fill all the values to proceed" });
        // }
        this.props.PstepStatusFun(2);
    };
    resendotp = async (email) => {
        await this.props.resendotp({
            variables: {
                email
            },
            update: (store, { data }) => {
                console.log("data.resendEmailotp", data.resendEmailotp);
                if (data.resendEmailotp) {
                    this.setState({
                        otpstatus: 1,
                        submitError: "",
                        submitError2: "",
                        submitError3: "",
                        mobile: "",
                        verifymobemail: "",
                        otp: data.resendEmailotp,
                        timer: 120,
                        otpstatus: 0,
                        password: "",
                        formErrors: {
                            verifymobemail: "",
                            password: ""
                        },
                        passwordValid: false,
                        //timerStatus: false,
                        formValid: false,
                        verifymobemailValid: false,
                        formValid2: false,
                        formValid3: false
                    });
                }


                setTimeout(() => { this.SetpageLoad() }, 1500);
            }
        });
    };
    SetpageLoad = () => {
        this.setState({ otpstatus: 0 });
        // this.clearIntervalFun();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted", this.state);
        if (this.state.currentStep == 1) {
            if (this.state.formValid) {
                this.forgotpassword(this.state.username).catch(error => {
                    console.log("catch if error");
                    console.log(error);
                    this.setState({
                        submitError: error.graphQLErrors.map(x => x.message)
                    });
                    console.error("ERR =>", error.graphQLErrors.map(x => x.message));
                });
            } else {
                this.setState({ submitError: "Please fill all the values to proceed" });
            }
        }
        if (this.state.currentStep == 2) {
            console.log("formValid2", this.state);
            if (this.state.formValid2) {
                // this.verifymobileotp(
                //     this.state.mobile,
                //     this.state.verifymobemail
                // ).catch(error => {
                //     console.log("catch if error");
                //     console.log(error);
                //     this.setState({
                //         submitError2: error.graphQLErrors.map(x => x.message)
                //     });
                //     console.error("ERR =>", error.graphQLErrors.map(x => x.message));
                // });
                let currentStep = this.state.currentStep
                currentStep = currentStep >= 2 ? 3 : currentStep + 1
                this.setState({
                    currentStep: currentStep,
                    submitError: "",
                    submitError2: "",
                    submitError3: "",
                    mobile: "",
                    verifymobemail: "",
                    timer: 120,
                    otpstatus: 0,
                    password: "",
                    formErrors: {
                        verifymobemail: "",
                        password: ""
                    },
                    passwordValid: false,
                    //timerStatus: false,
                    formValid: false,
                    verifymobemailValid: false,
                    formValid2: false,
                    formValid3: false

                });
            } else {
                this.setState({ submitError2: "Please Enter OTP to proceed" });
            }
            this.props.PstepStatusFun(2);

        }
    };
    forgotpassword = async (email) => {
        await this.props.forgotpassword({
            variables: {
                email
            },
            update: (store, { data }) => {
                console.log("data.forgotPassword", data);
                if (data.forgotPassword) {

                    let currentStep = this.state.currentStep
                    currentStep = currentStep >= 2 ? 3 : currentStep + 1
                    this.setState({
                        currentStep: currentStep,
                        mobile: data.forgotPassword.mobile,
                        otp: data.forgotPassword.otp,
                        submitError: "",
                        submitError2: "",
                        submitError3: "",
                        verifymobemail: "",
                        timer: 120,
                        otpstatus: 0,
                        password: "",
                        formErrors: {
                            verifymobemail: "",
                            password: ""
                        },
                        passwordValid: false,
                        //timerStatus: false,
                        formValid: false,
                        verifymobemailValid: false,
                        formValid2: false,
                        formValid3: false
                    });
                    this.timerFunction();
                    //this.props.history.push("/student/learn-practice");
                }
            }
        });
    };
    // verifymobileotp = async (mobile, otp) => {
    //     await this.props.verifymobileotp({
    //         variables: {
    //             mobile,
    //             otp
    //         },
    //         update: (store, { data }) => {
    //             if (data.verifyMobile) {
    //                 let currentStep = this.state.currentStep
    //                 currentStep = currentStep >= 2 ? 3 : currentStep + 1
    //                 this.setState({
    //                     currentStep: currentStep
    //                 });
    //             }
    //         }
    //     });
    // };
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
        let verifymobemailValid = this.state.verifymobemailValid;
        let passwordValid = this.state.passwordValid;
        let cpasswordValid = this.state.cpasswordValid;


        switch (fieldName) {
            //case "username":
                // var pattern = new RegExp(
                //     /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                // );

                // if (value.length < 4) {
                //     usernameValid = false;
                //     fieldValidationErrors.username =
                //         "Username cannot be less than 5 chars";
                // } else if (!pattern.test(value)) {
                //     usernameValid = false;
                //     fieldValidationErrors.username = "Invalid Username";
                // } else {
                //     usernameValid = true;
                //     fieldValidationErrors.username = "";
                // }
                // break;
                case "username":
                var pattern = new RegExp("^[7-9][0-9]{9}$");

                if (value.length == "") {
                    usernameValid = false;
                    fieldValidationErrors.username = "username Cannot Be Empty";
                }
               else {
                    usernameValid = true;
                    fieldValidationErrors.username = "";
                }

                break;

            case "verifymobemail":
                if (value.length == "") {
                    verifymobemailValid = false;
                    fieldValidationErrors.verifymobemail = "OTP cannot be Empty";
                } else if (this.state.verifymobemail != this.state.otp) {
                    verifymobemailValid = false;
                    fieldValidationErrors.verifymobemail = "Invalid OTP";
                }
                else {
                    verifymobemailValid = true;
                    fieldValidationErrors.verifymobemail = "";
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

            case "cpassword":
                if (value.length == "") {
                    cpasswordValid = false;
                    fieldValidationErrors.cpassword = "Password cannot be Empty";
                } else if (this.state.cpassword != this.state.password) {
                    cpasswordValid = false;
                    fieldValidationErrors.cpassword = "conform password not matched";
                } else {
                    cpasswordValid = true;
                    fieldValidationErrors.cpassword = "";
                }

                break;




            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                usernameValid: usernameValid,
                verifymobemailValid: verifymobemailValid,
                passwordValid: passwordValid,
                cpasswordValid: cpasswordValid
            },
            this.validateForm
        );
    }

    validateForm() {
        this.setState({
            formValid: this.state.usernameValid,
            formValid2: this.state.verifymobemailValid,
            formValid3: this.state.passwordValid && this.state.cpasswordValid
        });
        if (this.state.formValid) {
            this.setState({ submitError: "" }, () => { });
        }
        if (this.state.formValid2) {
            this.setState({ submitError2: "" }, () => { });
        }
        if (this.state.formValid3) {
            this.setState({ submitError3: "" }, () => { });
        }
    }

    render() {
        console.log("CurrentStaterender", this.state);
        return (
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 8, offset: 2 }} md={12} sm={12} xs={12}>
                <Card as={Card.Body} className="form_card border-0">
                    <Row>
                        {/* <Form> */}
                        <Col xl={5} lg={5} md={5} sm={12} xs={12}>

                            <Form.Text className="form-text text-danger">
                                {this.state.submitError}
                                {this.state.submitError2}
                                {this.state.submitError3}
                            </Form.Text>
                            <ForgotPass
                                stateData={this.state}
                                currentStep={this.state.currentStep}
                                ParenthandleInputChange={this.handleInputChange}
                                ParenthandleFormSubmit={this.handleFormSubmit}
                            />
                            <RegisterTwo
                                stateData={this.state}
                                currentStep={this.state.currentStep}
                                ParenthandleInputChange={this.handleInputChange}
                                PresendOtphandleFormSubmit={this.resendOtphandleFormSubmit}
                                ParenthandleFormSubmit={this.handleFormSubmit}
                            />
                            <ChangePassword
                                stateData={this.state}
                                currentStep={this.state.currentStep}
                                ParenthandleInputChange={this.handleInputChange}
                                changePasswordFormSubmit={this.changePasswordFormSubmit}
                            />
                            <div className="form_footer pt-2">
                                {this.nextButton()}
                                {/* {this.previousButton()} */}
                            </div>
                        </Col>
                        <Col xl={7} lg={7} md={7} sm={12} xs={12}>
                            <Image src={require('../../../images/login-bg.png')} alt="img" fluid />
                        </Col>
                        {/* </Form> */}

                    </Row>
                </Card>
            </Col>
        )
    }
}

export default withRouter(compose(
    graphql(FORGOT_PASSWORD, {
        name: "forgotpassword"
    }), graphql(RESEND_OTP, {
        name: "resendotp"
    }),
    graphql(CHANGE_PASSWORD, {
        name: "changepassword"
    }))(ForgotPasswordSection)
);


