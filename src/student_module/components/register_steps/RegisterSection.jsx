import React, { Component } from 'react'
import { Row, Col, Button, Container } from 'react-bootstrap';
import './_registerStepwizard.scss'
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

import { withRouter } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import * as compose from 'lodash.flowright';
import * as Cookies from "es-cookie";
import PreloaderTwo from '../preloader/PreloaderTwo';
const FREETRAIL_PLAN = gql`
  mutation($mobile: String,$plan_id: String,$referral_id: String) {
    setFreeTrailPackage(mobile: $mobile,plan_id: $plan_id,referral_id: $referral_id) 
  }
`;
const COUPN_VALIDATION = gql`
  mutation($mobile: String,
$plan_id: Int,
$referral_code: String) {
    validateReferralCode(mobile: $mobile, plan_id: $plan_id, referral_code: $referral_code){
        referral_id
        applied_amount
        status
        desc
        type
        value
    } 
  }
`;
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
            exam_name
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
const STUDENT_SIGNUP = gql`
  mutation($params: StudentUserInput,$source: Int) {
    studentSignUp(params: $params,source: $source) 
  }
`;

const ACADEMIC_INFORMATION = gql`
  mutation($params: UpdateStudentUser) {
    updateStudentUser(params: $params) 
  }
`;

const STUDENT_VERIFYMOBEMAIL = gql`
  mutation(
    $mobile: String!,
    $otp: String!
    ) {
        verifyMobile(
    mobile: $mobile,
    otp: $otp
    ) 
  }
`;

const RESEND_OTP = gql`
  mutation(
    $email: String!
    ) {
        resendEmailotp(
    email: $email
   ) 
  }
`;
class RegisterSection extends Component {

    constructor(props) {
        super(props)
        let getStudentPlans = props.getStudentPlans.find((a) => a.id == "5");
        let planData = { ...getStudentPlans, active: "active" };

        let currentStep = 1;
        let mobile = "";
        let selectSyllabusStatus = 0;
        let verifytype = 0;
        let fullname = "";
        let email = "";
        let classid = "";
        let exam = "";
        let targetyear = "";
        let personalInformationStatus = 0;
        let otpverificationStatus = 0;
        let timer = 120;
        let formValid = false;
        let timerStatus = false;
        let vtype = "";

        console.log("props.locationData", props.getStudentPlans, props.locationData.planid);
        if (props.locationData != "") {
            if (props.locationData.type == "paymentverify") {
                currentStep = 3
                selectSyllabusStatus = 1
                let getStudentPlans = props.getStudentPlans.find((a) => a.id == props.locationData.planid);
                planData = { ...getStudentPlans, active: "active" };
                mobile = props.locationData.mobile;


            }
            else if (props.locationData.type == "mobileverify") {
                verifytype = 1;
                personalInformationStatus = 1;
                fullname = props.locationData.fullname;
                mobile = props.locationData.mobile;
                email = props.locationData.email;
                vtype = "mobileverify";
                // timer = 1000;
                // timerStatus = true;
                formValid = true;
                this.timerFunction();
            }
            else if (props.locationData.type == "syllabusverify") {

                verifytype = 2;
                personalInformationStatus = 1;
                otpverificationStatus = 1;
                fullname = props.locationData.fullname;
                mobile = props.locationData.mobile;
                email = props.locationData.email;
            }
            else if (props.locationData.type == "planverify") {
                //verifytype = 3;
                currentStep = 2;
                personalInformationStatus = 1;
                otpverificationStatus = 1;
                selectSyllabusStatus = 1;
                fullname = props.locationData.fullname;
                mobile = props.locationData.mobile;
                email = props.locationData.email;
                classid = props.locationData.class_id;
                exam = props.locationData.exam_id;
                targetyear = props.locationData.target_year;

            }

        }

        this.state = {
            vtype: vtype,
            verifytype: verifytype,
            personalInformationStatus: personalInformationStatus,
            otpverificationStatus: otpverificationStatus,
            selectSyllabusStatus: selectSyllabusStatus,
            stepstatus1: 0,
            stepstatus2: 0,
            stepstatus3: 0,
            currentStep: currentStep,
            fullname: fullname,

            mobile: mobile,
            email: email,
            password: "",
            repassword: "",
            submitError: "",
            submitError2: "",
            submitError3: "",
            submitError4: "",
            verifymobemail: "",
            timer: timer,
            class: classid,
            exam: exam,
            targetyear: targetyear,
            selectDataClass: "",
            selectDataexam: "",
            formErrors: {
                fullname: "",
                mobile: "",
                email: "",
                password: "",
                repassword: "",
                verifymobemail: "",
                class: "",
                exam: "",
                targetyear: "",

            },
            timerStatus: timerStatus,
            fullnameValid: false,
            mobileValid: false,
            emailValid: false,
            passwordValid: false,
            repasswordValid: false,
            verifymobemailValid: false,
            targetyearValid: false,
            classValid: false,
            examValid: false,
            formValid: formValid,
            formValid2: false,
            formValid3: false,
            formValid4: false,
            planData: planData,
            coupnid: "",
            couponob: "",
            response: "",
            loader: 0,
            paymenttype: "paytm"


        }
    }
    _next = (type) => {

        if (type == "startELAPP") {
            if (this.state.planData.id == "5") {
                this.setState({
                    currentStep: 4,
                },
                    () => {
                        this.freeTrailhandleFun();
                    }
                );
            }
        }
        else {
            let currentStep = this.state.currentStep
            currentStep = currentStep >= 4 ? 4 : currentStep + 1
            this.setState({
                currentStep: currentStep
            })
            if (currentStep == 3) {
                if (this.state.planData.id == "5") {
                    this.setState({
                        currentStep: 4,
                    },
                        () => {
                            this.freeTrailhandleFun();
                        }
                    );
                }
            }
        }




    }

    _prev = () => {
        let currentStep = this.state.currentStep
        currentStep = currentStep <= 1 ? 1 : currentStep - 1
        this.setState({
            currentStep: currentStep
        })
    }

    /*
    * the functions for our button
    */
    previousButton() {
        let currentStep = this.state.currentStep;
        if (currentStep !== 1 && currentStep !== 4) {

            return (
                <React.Fragment>
                    {this.state.currentStep != "2" ? (
                        <Button variant="outline-primary px-3" onClick={this._prev}>
                            <div className="d-flex align-items-center">
                                <i className="mr-4 fas fa-long-arrow-alt-left" />
                                <span>Previous Step</span>
                            </div>
                        </Button>
                    ) : ("")}

                </React.Fragment>

            )
        }
        return null;
    }
    paymentGatewayFunction = () => {
        console.log("PaymentGatewayFunction", this.state);
        //e.preventDefault();
        let amount = "0";
        if (this.state.couponob != "") {
            let damount = parseInt(this.state.planData.amount) - parseInt(this.state.couponob.applied_amount);
            if (isNaN(damount)) {
                amount = "0";
            }
            else {
                amount = damount;
            }
        }
        else {
            amount = parseInt(this.state.planData.amount);
        }
        let referral_id = "0";
        if (this.state.couponob != "") {
            referral_id = this.state.couponob.referral_id;
        }
        console.log("gateway", parseInt(this.state.mobile), parseInt(amount), parseInt(this.state.planData.id), parseInt(referral_id));
        console.log("path", `http://admin.mylearningplus.in/payment.php?mobile=${parseInt(this.state.mobile)}&amount=${parseInt(amount)}&plan_id=${parseInt(this.state.planData.id)}&referral_id=${parseInt(referral_id)}&source=0`);

        if (this.state.paymenttype == "atom") {
            return (`https://mylearningplus.in/payment.php?mobile=${parseInt(this.state.mobile)}&amount=${parseInt(amount)}&plan_id=${parseInt(this.state.planData.id)}&referral_id=${parseInt(referral_id)}&source=0`);
        } else {
            return (`https://mylearningplus.in/paymentpaytm.php?mobile=${parseInt(this.state.mobile)}&amount=${parseInt(amount)}&plan_id=${parseInt(this.state.planData.id)}&referral_id=${parseInt(referral_id)}&source=0`);
        }
    }

    nextButton() {
        let currentStep = this.state.currentStep;
        console.log("this.state.currentStep", this.state.currentStep);
        // if (currentStep === 3) {
        //     return (
        //         <Button variant="primary px-3" onClick={this._next}>
        //             <div className="d-flex align-items-center">
        //                 <span>Next Step</span>
        //                 <i className="ml-4 fas fa-long-arrow-alt-right" />
        //             </div>
        //         </Button>
        //     )
        // }
        if (currentStep < 4) {
            if (currentStep == 2) {
                if (this.state.planData != "") {
                    return (


                        <Button variant="primary px-3 ml-3" onClick={() => this._next("normal")}>
                            <div className="d-flex align-items-center">
                                <span>Next Step</span>
                                <i className="ml-4 fas fa-long-arrow-alt-right" />
                            </div>
                        </Button>


                    )
                }

            }
            else if (currentStep == 3) {


                return (
                    // <Button variant="primary px-3" onClick={this.paymentGatewayFunction}>
                    //     <div className="d-flex align-items-center">
                    //         <span>Payment</span>
                    //         <i className="ml-4 fas fa-long-arrow-alt-right" />
                    //     </div>
                    // </Button>

                    <a
                        className="btn btn-blue px-5 text-decoration-none"
                        //herf="javascript:paymentGatewayFunction()"
                        href={this.paymentGatewayFunction()}
                    //variant="primary px-3" 
                    //onClick={this.paymentGatewayFunction}
                    >
                        <div className="d-flex align-items-center">
                            <span>Payment</span>
                            <i className="ml-4 fas fa-long-arrow-alt-right" />
                        </div>
                    </a>
                )


            }
            else {
                //console.log("sreefgd")
                return (
                    <React.Fragment>
                        <Button variant="primary px-3" onClick={() => this._next("startELAPP")}>
                            <div className="d-flex align-items-center">
                                <span>Start using ELAPP</span>
                            </div>
                        </Button>
                        {/* <Button variant="outline-primary px-3 ml-3" onClick={()=>this._next("normal")}>
                            <div className="d-flex align-items-center">
                                <span>View Plans</span>
                                <i className="ml-4 fas fa-long-arrow-alt-right" />
                            </div>
                        </Button> */}
                    </React.Fragment>

                )
            }

        }

        return null;
    }
    studentPlansFun = (planData) => {
        console.log("studentPlansFun", planData);

        this.setState({
            planData: planData
        });

    }
    syllabusDetailshandleFormSubmit = e => {
        e.preventDefault();
        const paramsObject1 = {
            class_id: parseInt(this.state.class),
            exam_id: parseInt(this.state.exam),
            target_year: this.state.targetyear,
            mobile: this.state.mobile
        }
        console.log("paramsObject1", paramsObject1);
        if (this.state.formValid3) {
            this.updateStudentUser(
                paramsObject1
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
    };
    updateStudentUser = async (params) => {
        await this.props.updateStudentUser({
            variables: {
                params
            },
            update: (store, { data }) => {
                console.log("data.updateStudentUser", data.updateStudentUser);
                if (data.updateStudentUser) {
                    //this.props.history.push("/student/login");
                    this.setState({
                        selectSyllabusStatus: "1",
                        stepstatus3: 1
                    });

                }
                setTimeout(() => { this.SetpageLoad3() }, 1500);
            }
        });
    };
    SetpageLoad3 = () => {
        this.setState({ stepstatus3: 0 });
    }
    otpverificationhandleFormSubmit = e => {
        e.preventDefault();
        if (this.state.formValid2) {
            this.verifymobileotp(
                this.state.mobile,
                this.state.verifymobemail
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError2: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError2: "Please Enter OTP to proceed" });
        }
    };
    verifymobileotp = async (mobile, otp) => {
        console.log("mobile, otp", mobile, otp);
        await this.props.verifymobileotp({
            variables: {
                mobile,
                otp
            },
            update: (store, { data }) => {
                if (data.verifyMobile) {
                    console.log("data.verifyMobile", data.verifyMobile);
                    if (this.state.vtype == "mobileverify") {
                        this.setState({
                            otpverificationStatus: "1",
                            stepstatus2: 1,
                            verifytype: 2,
                        });
                    } else {
                        this.setState({
                            otpverificationStatus: "1",
                            stepstatus2: 1,

                        });
                    }

                    setTimeout(() => { this.SetpageLoad2() }, 1500);

                }
            }
        });
    };
    SetpageLoad2 = () => {
        this.setState({ stepstatus2: 0 });
        //this.clearIntervalFun();
    }
    freeTrailhandleFun = () => {
        //e.preventDefault();
        console.log("freeTrailhandleFun", this.state.mobile,
            this.state.planData);
        this.freetrail(
            this.state.mobile,
            //"7288877946",
            this.state.planData.id,
            "0"
        ).catch(error => {
            console.log("catch if error");
            console.log(error);
            this.setState({
                submitError5: error.graphQLErrors.map(x => x.message)
            });
            console.error("ERR =>", error.graphQLErrors.map(x => x.message));
        });



    }
    freetrail = async (mobile, plan_id, referral_id) => {
        await this.props.freetrail({
            variables: {
                mobile, plan_id, referral_id
            },
            update: (store, { data }) => {
                console.log("data.setFreeTrailPackage", data.setFreeTrailPackage);
                if (data.setFreeTrailPackage) {

                    this.setState(() => {
                        this.autoLoginhandleFormSubmit();
                    });

                    //this.props.history.push("/login");

                }
            }
        });
    };
    autoLoginhandleFormSubmit = () => {
        this.setState({
            loader: 1
        });
        console.log("stulogintype", Cookies.get("stulogintype"));
        console.log("successtoken", Cookies.get("successtoken"));
        console.log("studenttoken", Cookies.get("studenttoken"));

        let token = "";
        if (Cookies.get("stulogintype") == "auto") {
            token = Cookies.get("successtoken");
        }
        else if (Cookies.get("stulogintype") == "normal") {
            token = Cookies.get("studenttoken");
        }
        console.log("tokensdata", this.state.mobile, token);
        if (this.state.mobile && token) {
            this.login(this.state.mobile, token).catch(error => {
                console.log("catch if error", error.graphQLErrors.map(x => x.message));
                console.log(error);
                this.setState({
                    submitError6: error.graphQLErrors.map(x => x.message), loader: 0
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });
        } else {
            this.setState({ submitError6: "Please fill all the values to proceed", loader: 0 });
        }
        //console.log("submitError6", this.state.submitError6);
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
                Cookies.set("exam_name", data.studentLogin.user.exam_name);
                Cookies.set("mobileverified", data.studentLogin.user.mobile_verified);
                Cookies.set("targetyear", data.studentLogin.user.target_year);
                Cookies.set("videos", data.studentLogin.user.videos);
                Cookies.set("branch_name", data.studentLogin.user.branch_name);
                Cookies.set("role", "student");
                Cookies.set("profile_pic", data.studentLogin.user.profile_pic);
                Cookies.set("student_userlevel", data.studentLogin.user.userlevel);

                localStorage.setItem("profile_pic", data.studentLogin.user.profile_pic);
                localStorage.setItem("studentglobals", JSON.stringify(data.studentLogin.user.studentGlobals));
                localStorage.setItem("globalsubjects", JSON.stringify(data.studentLogin.user.subjects));

                if (data.studentLogin) {
                    console.log("logggg", data.studentLogin, data.studentLogin.user.valid);
                    Cookies.remove("successtoken");
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
                    }



                }
            }
        });
    };
    personalDetailshandleFormSubmit = e => {
        e.preventDefault();
        console.log("Form submitted");
        const paramsObject = {
            name: this.state.fullname,
            email: this.state.email,
            mobile: this.state.mobile,
            password: this.state.password
        }
        if (this.state.formValid) {
            this.register(
                paramsObject,
                0
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                let autologin = error.graphQLErrors.map(x => x.message);
                let autologintoken = error.graphQLErrors.map(x => x.extensions.code);
                this.setState({
                    submitError: error.graphQLErrors.map(x => x.message)
                });

                //console.log("autologinreg", autologin, `A User account with mobile ${this.state.mobile} already exists!`, `A User account with mobile ${this.state.email} already exists!`, autologintoken);

                // if (autologin == "A User account with mobile " + this.state.mobile + " already exists! " || autologin == "A User account with email " + this.state.email + " already exists! ") {
                //     this.setState(() => {
                //         this.autoLoginhandleFormSubmit("reglogin", autologintoken);
                //     });
                // }

                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });

        } else {
            this.setState({ submitError: "Please fill all the values to proceed" });
        }
    };
    register = async (params, source) => {
        await this.props.register({
            variables: {
                params, source
            },
            update: (store, { data }) => {
                console.log("registerdata", data.studentSignUp);
                Cookies.set("successtoken", data.studentSignUp);
                Cookies.set("stulogintype", "auto");
                if (data.studentSignUp) {
                    Cookies.set("registermob", params.mobile);

                    console.log("data.studentSignUp", data.studentSignUp);


                    this.setState({
                        personalInformationStatus: "1",
                        stepstatus1: 1
                    });
                    setTimeout(() => { this.SetpageLoad1(params) }, 1500);

                }

            }
        });
    };
    SetpageLoad1 = (params) => {
        this.setState({ stepstatus1: 0 });
        this.props.handleInputChange(params.name);
        this.timerFunction();


    }
    timerFunction = () => {
        if (this.state != undefined) {
            //if (this.state.timerStatus == false) {
            //if (this.state.timer > 0) {
            let totalExamCount = parseInt(this.state.timer) - 1;
            this.setState({ timer: totalExamCount });
            if (totalExamCount == 0) {
                this.setState({ timer: 120, timerStatus: true });
            }
            //}


            //}

        }

    }

    componentDidMount = () => {
        // if (this.state.timer == 0) {
        //     this.setState({ timer: 180 });
        //     //this.props.ParenthandleFormSubmit();
        // }

        //if (this.state.timerStatus == false) {
        this.timer = setInterval(() => {
            this.timerFunction();

        }, 1000)
        //}

    }
    // timerFunction = () => {
    //     this.timer = setInterval(() => {
    //         this.setState({
    //             timer: this.state.timer - 1
    //         });
    //     }, 2000);

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
    // }
    resendOtphandleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log(this.state);
        console.log("resendOtphandleFormSubmit", this.state.email);
        if (this.state.formValid) {
            this.resendotp(
                this.state.email
            ).catch(error => {
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
    };
    resendotp = async (email) => {
        await this.props.resendotp({
            variables: {
                email
            },
            update: (store, { data }) => {
                if (data.resendEmailotp) {
                    console.log("resendEmailotp", data.resendEmailotp);
                    this.setState({
                        otpstatus: 1,

                    });
                }


                setTimeout(() => { this.SetpageLoad() }, 1500);
            }
        });
    };
    SetpageLoad = () => {
        this.setState({ otpstatus: 0 });
        //this.clearIntervalFun();
    }
    handleInputChange = e => {
        console.log("handleInputChange", e);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });
    };
    handleSelectChange = (name, value, selected) => {
        console.log("asername", selected, name, value);
        const selectData = selected;
        delete selectData.id
        if (name == "class") {
            this.setState({ selectDataClass: selectData });
        }
        else if (name == "exam") {
            this.setState({ selectDataexam: selectData });
        }
        this.setState({ [name]: value }, () => {
            this.validateField(name, value);
        });

    }
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fullnameValid = this.state.fullnameValid;
        let mobileValid = this.state.mobileValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let repasswordValid = this.state.repasswordValid;
        let verifymobemailValid = this.state.verifymobemailValid;
        let classValid = this.state.classValid;
        let examValid = this.state.examValid;
        let targetyearValid = this.state.targetyearValid;


        switch (fieldName) {



            case "fullname":

                if (value.length == "") {
                    fullnameValid = false;
                    fieldValidationErrors.fullname = "full name cannot be Empty";
                }
                else if (value.length < 3) {
                    fullnameValid = false;
                    fieldValidationErrors.fullname =
                        "full name cannot be less than 4 chars";
                }
                else {
                    fullnameValid = true;
                    fieldValidationErrors.fullname = "";
                }

                break;

            case "mobile":
                var pattern = new RegExp("^[6-9][0-9]{9}$");

                if (value.length == "") {
                    mobileValid = false;
                    fieldValidationErrors.mobile =
                        "Mobile No. Cannot Be Empty";
                } else if (!pattern.test(value)) {
                    mobileValid = false;
                    fieldValidationErrors.mobile = "Invalid mobile";
                } else {
                    mobileValid = true;
                    fieldValidationErrors.mobile = "";
                }

                break;

            case "email":
                var pattern = new RegExp(
                    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
                );

                if (value.length < 4) {
                    emailValid = false;
                    fieldValidationErrors.email =
                        "Email cannot be less than 5 chars";
                } else if (!pattern.test(value)) {
                    emailValid = false;
                    fieldValidationErrors.email = "Invalid Email";
                } else {
                    emailValid = true;
                    fieldValidationErrors.email = "";
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

            case "repassword":
                if (value.length == "") {
                    repasswordValid = false;
                    fieldValidationErrors.repassword = "Re-Enter Password cannot be Empty";
                }
                else if (this.state.password !== this.state.repassword) {
                    repasswordValid = false;
                    fieldValidationErrors.repassword = "Re-Enter Password should be match";
                }
                else {
                    repasswordValid = true;
                    fieldValidationErrors.repassword = "";
                }

                break;

            case "verifymobemail":
                if (value.length == "") {
                    verifymobemailValid = false;
                    fieldValidationErrors.verifymobemail = "OTP cannot be Empty";
                } else {
                    verifymobemailValid = true;
                    fieldValidationErrors.verifymobemail = "";
                }

                break;
            case "class":
                if (value.length == "") {
                    classValid = false;
                    fieldValidationErrors.class = "class cannot be Empty";
                } else {
                    classValid = true;
                    fieldValidationErrors.class = "";
                }

                break;

            case "exam":
                if (value.length == "") {
                    examValid = false;
                    fieldValidationErrors.exam = "exam cannot be Empty";
                } else {
                    examValid = true;
                    fieldValidationErrors.exam = "";
                }

                break;
            case "targetyear":
                if (value.length == "") {
                    targetyearValid = false;
                    fieldValidationErrors.targetyear = "target year cannot be Empty";
                } else {
                    targetyearValid = true;
                    fieldValidationErrors.targetyear = "";
                }

                break;
            default:
                break;
        }
        this.setState(
            {
                formErrors: fieldValidationErrors,
                fullnameValid: fullnameValid,
                mobileValid: mobileValid,
                emailValid: emailValid,
                passwordValid: passwordValid,
                repasswordValid: repasswordValid,
                verifymobemailValid: verifymobemailValid,
                classValid: classValid,
                examValid: examValid,
                targetyearValid: targetyearValid,

            },
            this.validateForm
        );
    }

    validateForm() {
        this.setState({
            formValid: this.state.fullnameValid &&
                this.state.mobileValid &&
                this.state.emailValid &&
                this.state.passwordValid &&
                this.state.repasswordValid,
            formValid2: this.state.verifymobemailValid,
            formValid3: this.state.classValid &&
                this.state.examValid &&
                this.state.targetyearValid,

        });
        if (this.state.formValid) {
            this.setState({ submitError: "" });
        }
        if (this.state.formValid2) {
            this.setState({ submitError2: "" });
        }
        if (this.state.formValid3) {
            this.setState({ submitError3: "" });
        }

    }
    coupnValidation = (e, data) => {
        e.preventDefault();
        if (data != "") {

            this.coupnval(
                this.state.mobile,
                parseInt(this.state.planData.id),
                data
            ).catch(error => {
                console.log("catch if error");
                console.log(error);
                this.setState({
                    submitError4: error.graphQLErrors.map(x => x.message)
                });
                console.error("ERR =>", error.graphQLErrors.map(x => x.message));
            });

        } else {
            this.setState({ submitError4: "Please fill COUPON ID" });
        }


    }
    coupnval = async (mobile,
        plan_id,
        referral_code) => {
        await this.props.coupnval({
            variables: {
                mobile,
                plan_id,
                referral_code
            },
            update: (store, { data }) => {
                console.log("coupnvaldata", data);
                if (data.validateReferralCode) {
                    Cookies.set("coupnvalmob", data.validateReferralCode);
                    this.setState({
                        couponob: data.validateReferralCode,
                        submitError4: ""
                    });

                }
            }
        });
    };
    render() {
        console.log("thisstate", this.state);
        // const getStudentPlans = this.props.getStudentPlans;
        // const loading1 = getStudentPlans.loading;
        // const error1 = getStudentPlans.error;

        // if (loading1) return <PreloaderTwo />;
        // if (error1 !== undefined) {
        //     alert("Server Error. " + error1.message);
        //     return null;
        // }
        // console.log("getStudentPlans", getStudentPlans.getStudentPlans);
        return (
            <section className="register-form-block">
                <Container>
                    <div className="step-wizard">
                        <div className="step-indicator mb-5">
                            <Row>
                                <Col xl={3} lg={3} md={6} sm={6} className={this.state.currentStep === 1 ? "active" : "complete"}>
                                    <div className="d-flex">
                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                        <div className="caption w-100 text-left">
                                            <span>Personal Information</span>

                                        </div>
                                    </div>
                                </Col>

                                {/* <Col xl={3} lg={3} md={6} sm={6} className={this.state.currentStep === 2 ? "active" :
                                    this.state.currentStep > 2 ? "complete" : ""
                                }>
                                    <div className="d-flex">
                                        <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                        <div className="caption w-100 text-left">
                                            <span>Select Plan</span>
                                        </div>
                                    </div>
                                </Col> */}
                                {this.state.planData.id != "5" ? (
                                    <React.Fragment>
                                        <Col xl={3} lg={3} md={6} sm={6} className={this.state.currentStep === 3 ? "active" :
                                            this.state.currentStep > 3 ? "complete" : ""
                                        }>
                                            <div className="d-flex">
                                                <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                <div className="caption w-100 text-left">
                                                    <span>Order Summary</span>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xl={3} lg={3} md={6} sm={6} className={this.state.currentStep === 4 ? "active" :
                                            this.state.currentStep > 4 ? "done" : ""
                                        }>
                                            <div className="d-flex">
                                                <div className="step mr-3"><i className="fas fa-2x fa-check-circle" /></div>
                                                <div className="caption w-100 text-left">
                                                    <span>Payment Summary</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </React.Fragment>
                                ) : ("")}

                            </Row>
                        </div>
                        <StepOne
                            syllabusDetailshandleFormSubmit={this.syllabusDetailshandleFormSubmit}
                            handleSelectChange={this.handleSelectChange}
                            otpverificationhandleFormSubmit={this.otpverificationhandleFormSubmit}
                            personalDetailshandleFormSubmit={this.personalDetailshandleFormSubmit}
                            handleInputChange={this.handleInputChange}
                            currentStep={this.state.currentStep}
                            stateData={this.state}
                            resendOtphandleFormSubmit={this.resendOtphandleFormSubmit} />
                        <StepTwo
                            locationData={this.props.locationData}
                            studentPlansFun={this.studentPlansFun}
                            getStudentPlans={this.props.getStudentPlans}
                            handleInputChange={this.handleInputChange}
                            currentStep={this.state.currentStep}
                            stateData={this.state} />
                        <StepThree
                            coupnValidation={this.coupnValidation}
                            handleInputChange={this.handleInputChange}
                            currentStep={this.state.currentStep}
                            stateData={this.state} />
                        <StepFour
                            handleInputChange={this.handleInputChange}
                            currentStep={this.state.currentStep}
                            stateData={this.state} />
                    </div>
                </Container>
                <div className="bg-white mt-5">
                    <Container>
                        <Row>
                            <Col xl={12} lg={12} md={12} sm={12}>
                                <div className="d-flex align-items-center justify-content-between py-4">
                                    <div className="float-left">{this.previousButton()}</div>
                                    {this.state.selectSyllabusStatus == "1" ? (
                                        <div className="float-right">{this.nextButton()}</div>
                                    ) : ("")}
                                    {/* <div className="float-right">{this.nextButton()}</div> */}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        )
    }
}


export default withRouter(compose(
    graphql(COUPN_VALIDATION, {
        name: "coupnval"
    }),
    graphql(STUDENT_SIGNUP, {
        name: "register"
    }),
    graphql(RESEND_OTP, {
        name: "resendotp"
    }),
    graphql(STUDENT_VERIFYMOBEMAIL, {
        name: "verifymobileotp"
    }),
    graphql(ACADEMIC_INFORMATION, {
        name: "updateStudentUser"
    }),
    graphql(LOGIN_USER, {
        name: "login"
    }),
    graphql(FREETRAIL_PLAN, {
        name: "freetrail"
    })
    // graphql(gql` 
    //     query{
    //         getStudentPlans{
    //             id
    //             plan_name
    //             plan_title
    //             amount
    //             original_amount
    //             image
    //             additional_text
    //     }
    //     }
    //     `,
    //     {
    //         options: props => ({

    //             fetchPolicy: 'cache-and-network'
    //         }), name: "getStudentPlans"
    //     })
)(RegisterSection)
);
